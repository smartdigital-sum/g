// ============================================================
//  GyanPlay — Cloud Functions (Triggering redeployment)
//  GyanPlay — Cloud Functions
//  1. aiTeacherChat  — AI Teacher proxy (Groq key stays server-side)
//  2. grantAccess    — Writes a purchase doc after payment is verified.
//                      Currently auto-approves (no Razorpay yet).
//                      When Razorpay is ready, add signature verification here.
//
//  Before deploying:
//    1. Install deps        →  cd functions && npm install
//    2. Store the Groq key  →  firebase functions:secrets:set GROQ_API_KEY
//    3. Deploy              →  firebase deploy --only functions
//
//  Local dev:
//    firebase emulators:start --only functions,firestore,auth
// ============================================================

const { onRequest } = require("firebase-functions/v2/https");
const { setGlobalOptions } = require("firebase-functions/v2");
const { defineSecret } = require("firebase-functions/params");
const { initializeApp } = require("firebase-admin/app");
const { getAuth } = require("firebase-admin/auth");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
setGlobalOptions({ region: "asia-south1", maxInstances: 10 });

const GROQ_API_KEY = defineSecret("GROQ_API_KEY");

const ALLOWED_ORIGINS = [
  "https://smartdigital-sum.github.io",
  "https://gyanplay-prod.web.app",
  "https://gyanplay-prod.firebaseapp.com",
  "http://localhost:5000",
  "http://localhost:3000",
  "http://127.0.0.1:5500"
];

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 100;
const MAX_TOTAL_CHARS = 8000;

function applyCors(req, res) {
  const origin = req.headers.origin || "";
  if (ALLOWED_ORIGINS.includes(origin)) {
    res.set("Access-Control-Allow-Origin", origin);
    res.set("Vary", "Origin");
  }
  res.set("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.set("Access-Control-Allow-Headers", "Authorization, Content-Type");
  res.set("Access-Control-Max-Age", "3600");
}

async function verifyCaller(req) {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return { error: { status: 401, message: "Sign in required" } };
  try {
    const decoded = await getAuth().verifyIdToken(token);
    return { uid: decoded.uid };
  } catch {
    return { error: { status: 401, message: "Invalid or expired token" } };
  }
}

async function assertAccess(uid, classId) {
  if (classId === "pre-nursery") return null;

  const db = getFirestore();
  const snap = await db.doc(`users/${uid}/purchases/${classId}`).get();
  if (!snap.exists) return { status: 403, message: "No active purchase for this class" };

  const expiresOn = snap.data().expiresOn;
  const expiryMs = expiresOn && typeof expiresOn.toMillis === "function" ? expiresOn.toMillis() : 0;
  if (expiryMs && expiryMs < Date.now()) return { status: 403, message: "Purchase expired" };

  return null;
}

function validatePayload(body) {
  if (!body || typeof body !== "object") return "Missing body";
  const { classId, systemPrompt, messages } = body;

  if (!classId || typeof classId !== "string") return "classId is required";
  if (!systemPrompt || typeof systemPrompt !== "string") return "systemPrompt is required";
  if (systemPrompt.length > 4000) return "systemPrompt too long";
  if (!Array.isArray(messages) || messages.length === 0) return "messages must be a non-empty array";
  if (messages.length > MAX_MESSAGES) return `messages must be <= ${MAX_MESSAGES}`;

  let total = 0;
  for (const m of messages) {
    if (!m || (m.role !== "user" && m.role !== "assistant")) return "each message needs role user|assistant";
    if (typeof m.content !== "string" || !m.content) return "each message needs non-empty content";
    total += m.content.length;
  }
  if (total > MAX_TOTAL_CHARS) return `messages exceed ${MAX_TOTAL_CHARS} chars`;
  return null;
}

exports.aiTeacherChat = onRequest(
  { secrets: [GROQ_API_KEY], cors: false },
  async (req, res) => {
    applyCors(req, res);
    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    const caller = await verifyCaller(req);
    if (caller.error) return res.status(caller.error.status).json({ error: caller.error.message });

    const validationError = validatePayload(req.body);
    if (validationError) return res.status(400).json({ error: validationError });

    const { classId, systemPrompt, messages } = req.body;

    const denial = await assertAccess(caller.uid, classId);
    if (denial) return res.status(denial.status).json({ error: denial.message });

    try {
      const groqRes = await fetch(GROQ_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY.value()}`
        },
        body: JSON.stringify({
          model: GROQ_MODEL,
          messages: [{ role: "system", content: systemPrompt }, ...messages],
          max_tokens: 600,
          temperature: 0.7
        })
      });

      if (!groqRes.ok) {
        const err = await groqRes.json().catch(() => ({}));
        console.error("[aiTeacherChat] groq error", groqRes.status, err);
        return res.status(502).json({ error: err.error?.message || `Groq HTTP ${groqRes.status}` });
      }

      const data = await groqRes.json();
      const reply = data.choices?.[0]?.message?.content?.trim();
      if (!reply) return res.status(502).json({ error: "Empty response from AI" });

      return res.json({ reply });
    } catch (err) {
      console.error("[aiTeacherChat] proxy error", err);
      return res.status(500).json({ error: "Internal error" });
    }
  }
);

// ============================================================
//  grantAccess — Called by payment.html after the user clicks Pay.
//
//  Current mode: AUTO-APPROVE (no Razorpay yet).
//  The function verifies the Firebase ID token, then writes the
//  purchase document to Firestore.  Because Firestore rules now
//  block client-side writes to /purchases, this is the ONLY way
//  a purchase can be created.
//
//  When you get your Razorpay account:
//    1. Create a server-side order in this function (before returning
//       the order_id to the client).
//    2. After payment, call this function with razorpay_payment_id,
//       razorpay_order_id, razorpay_signature.
//    3. Verify the signature with crypto.createHmac before writing.
// ============================================================

// Valid class IDs and their prices (must match games.json)
const CLASS_PRICES = {
  "pre-nursery": 0,
  "nursery": 350,
  "class-1": 400,
  "class-2": 450,
  "class-3": 500,
  "class-4": 600,
  "class-5": 700,
  "class-6": 900,
  "class-7": 1000,
  "class-8": 1100,
  "class-9": 1400,
  "class-10": 1600,
  "bundle-all": 4999,
  "bundle-family": 6999,
};

const CLASS_NAMES = {
  "pre-nursery": "Pre-Nursery",
  "nursery": "Nursery",
  "class-1": "Class 1",
  "class-2": "Class 2",
  "class-3": "Class 3",
  "class-4": "Class 4",
  "class-5": "Class 5",
  "class-6": "Class 6",
  "class-7": "Class 7",
  "class-8": "Class 8",
  "class-9": "Class 9",
  "class-10": "Class 10",
  "bundle-all": "All Classes Bundle",
  "bundle-family": "Family Bundle",
};

exports.grantAccess = onRequest(
  { cors: false },
  async (req, res) => {
    applyCors(req, res);
    if (req.method === "OPTIONS") return res.status(204).send("");
    if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

    // 1. Verify the caller is a signed-in user
    const caller = await verifyCaller(req);
    if (caller.error) return res.status(caller.error.status).json({ error: caller.error.message });

    // 2. Validate classId
    const { classId } = req.body || {};
    if (!classId || !CLASS_PRICES.hasOwnProperty(classId)) {
      return res.status(400).json({ error: "Invalid classId" });
    }

    // 3. Write the purchase document (server-side, so Firestore rules allow it)
    const db = getFirestore();
    const { Timestamp } = require("firebase-admin/firestore");

    const now = new Date();
    const expiry = new Date(now);
    expiry.setFullYear(expiry.getFullYear() + 1); // 1-year access

    try {
      await db.doc(`users/${caller.uid}/purchases/${classId}`).set({
        classId,
        className: CLASS_NAMES[classId] || classId,
        amountPaid: CLASS_PRICES[classId],
        razorpayPaymentId: "AUTO_APPROVED",   // replace with real ID after Razorpay
        paidOn: Timestamp.fromDate(now),
        expiresOn: Timestamp.fromDate(expiry),
        active: true,
      }, { merge: false });

      console.log(`[grantAccess] uid=${caller.uid} classId=${classId} granted until ${expiry.toISOString()}`);
      return res.json({ success: true, expiresOn: expiry.toISOString() });
    } catch (err) {
      console.error("[grantAccess] Firestore write failed:", err);
      return res.status(500).json({ error: "Failed to save purchase" });
    }
  }
);
