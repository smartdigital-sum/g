// ============================================================
//  GyanPlay — Cloud Functions
//  AI Teacher proxy: keeps the Groq API key server-side so it
//  never reaches the browser.
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
  "https://gyanplay.netlify.app",
  "https://gyanplay-prod.web.app",
  "https://gyanplay-prod.firebaseapp.com",
  "http://localhost:5000",
  "http://localhost:3000",
  "http://127.0.0.1:5500"
];

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const MAX_MESSAGES = 12;
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

  const expiresAt = snap.data().expiresAt;
  const expiryMs = expiresAt && typeof expiresAt.toMillis === "function" ? expiresAt.toMillis() : 0;
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
