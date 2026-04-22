// ============================================================
//  GyanPlay — Payment Logic (payment.js)
//  Handles: Razorpay order creation, payment verification,
//           saving purchase to Firestore with 1-year expiry
// ============================================================

import { db } from "./firebase.js";
import {
  doc,
  setDoc,
  Timestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// ── CLASS PRICES in ₹ — must match games.json pricing exactly ──
export const CLASS_INFO = {
  "pre-nursery": { name: "Pre-Nursery", emoji: "🌱", price: 0,    free: true  },
  "nursery":     { name: "Nursery",     emoji: "🌼", price: 350  },
  "class-1":     { name: "Class 1",     emoji: "🎒", price: 400  },
  "class-2":     { name: "Class 2",     emoji: "✏️", price: 450  },
  "class-3":     { name: "Class 3",     emoji: "📐", price: 500  },
  "class-4":     { name: "Class 4",     emoji: "🔬", price: 600  },
  "class-5":     { name: "Class 5",     emoji: "🌍", price: 700  },
  "class-6":     { name: "Class 6",     emoji: "📖", price: 900  },
  "class-7":     { name: "Class 7",     emoji: "🧪", price: 1000 },
  "class-8":     { name: "Class 8",     emoji: "📊", price: 1100 },
  "class-9":     { name: "Class 9",     emoji: "⚡", price: 1400 },
  "class-10":    { name: "Class 10",    emoji: "🏆", price: 1600 },
  "bundle-all":    { name: "All Classes Bundle", emoji: "🎓", price: 4999 },
  "bundle-family": { name: "Family Bundle",      emoji: "👨‍👩‍👧‍👦", price: 6999 },
};

// ────────────────────────────────────────────────────
//  OPEN RAZORPAY CHECKOUT
//  Called when parent clicks "Pay Now"
// ────────────────────────────────────────────────────
export function openRazorpay({ classId, user, onSuccess, onFailure }) {
  const cls = CLASS_INFO[classId];
  if (!cls) { onFailure("Invalid class."); return; }
  if (cls.free) { onFailure("This class is free — no payment needed."); return; }

  const options = {
    // 🔴 REPLACE with your Razorpay Key ID
    // Get it from: Razorpay Dashboard → Settings → API Keys
    key: "YOUR_RAZORPAY_KEY_ID",

    amount:   cls.price * 100,          // Convert ₹ to paise
    currency: "INR",
    name:     "GyanPlay",
    description: `Access to ${cls.name} — 1 Year`,
    image:    "/assets/logo.png",       // optional: your logo

    prefill: {
      name:  user.displayName || "",
      email: user.email       || "",
    },

    theme: { color: "#FF6B00" },        // saffron brand colour

    // ── SUCCESS HANDLER ──
    handler: async function (response) {
      // response contains:
      //   razorpay_payment_id
      //   razorpay_order_id   (if you create server-side orders)
      //   razorpay_signature  (for server-side verification)

      try {
        await savePurchase({
          uid:       user.uid,
          classId,
          className: cls.name,
          amount:    cls.price,
          razorpayPaymentId: response.razorpay_payment_id,
        });
        onSuccess(response);
      } catch (err) {
        console.error("Error saving purchase:", err);
        onFailure("Payment received but failed to save. Please contact support.");
      }
    },

    // ── MODAL DISMISS ──
    modal: {
      ondismiss: () => {
        onFailure(null); // null = user cancelled, not an error
      }
    }
  };

  const rzp = new window.Razorpay(options);

  // Payment failure inside Razorpay modal
  rzp.on("payment.failed", (response) => {
    onFailure(response.error.description || "Payment failed. Please try again.");
  });

  rzp.open();
}

// ────────────────────────────────────────────────────
//  SAVE PURCHASE TO FIRESTORE
//  Path: users/{uid}/purchases/{classId}
//  Expiry = today + 365 days
// ────────────────────────────────────────────────────
async function savePurchase({ uid, classId, className, amount, razorpayPaymentId }) {
  const now    = new Date();
  const expiry = new Date(now);
  expiry.setFullYear(expiry.getFullYear() + 1); // +1 year

  await setDoc(
    doc(db, "users", uid, "purchases", classId),
    {
      classId,
      className,
      amountPaid:        amount,
      razorpayPaymentId,
      paidOn:            Timestamp.fromDate(now),
      expiresOn:         Timestamp.fromDate(expiry),
      active:            true,
    },
    { merge: false } // always overwrite (handles renewals too)
  );
}

// ────────────────────────────────────────────────────
//  SAVE FREE CLASS (Pre-Nursery)
//  Called automatically on first dashboard load
//  if pre-nursery not already in purchases
// ────────────────────────────────────────────────────
export async function activateFreeClass(uid) {
  const now    = new Date();
  const expiry = new Date("2099-12-31"); // effectively never expires

  await setDoc(
    doc(db, "users", uid, "purchases", "pre-nursery"),
    {
      classId:           "pre-nursery",
      className:         "Pre-Nursery",
      amountPaid:        0,
      razorpayPaymentId: "FREE",
      paidOn:            Timestamp.fromDate(now),
      expiresOn:         Timestamp.fromDate(expiry),
      active:            true,
    },
    { merge: true }
  );
}
