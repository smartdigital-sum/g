# GyanPlay — Pre-Launch TODO List

## 1. Security — ✅ Done

- [x] **Rotate the Groq API key** (done — old key revoked in Groq console)
- [x] **Move Groq key server-side** — proxy lives at `functions/index.js` (`aiTeacherChat`)
  - Store the new key via `firebase functions:secrets:set GROQ_API_KEY`
  - Client (`classroom.html`) calls the Cloud Function with a Firebase ID token; no key reaches the browser

- [x] **Lock purchase writes to server only in Firestore rules**
  - `firestore.rules` — purchases subcollection now has `allow write: if false`
  - Only the `grantAccess` Cloud Function can write purchase docs

- [x] **Delete `test-purchases.html`** — done

---

## 2. Payments — Auto-Approve Mode (Razorpay pending bank account)

- [ ] Open a current bank account (Central Bank of India)
- [ ] Sign up at https://razorpay.com with business details
- [ ] Go to Razorpay Dashboard → Settings → API Keys → Generate Test Key
- [ ] In `src/payment.js` line 46, replace `"YOUR_RAZORPAY_KEY_ID"` with your `rzp_test_...` key
- [ ] In `payment.html`, replace the `handlePay` function with a real Razorpay call to `openRazorpay()` from `src/payment.js`
- [ ] In `functions/index.js` → `grantAccess`: add Razorpay signature verification before writing the purchase doc
- [ ] Test end-to-end with Razorpay test mode before going live
- [ ] Switch to Live Key (`rzp_live_...`) when ready to accept real payments

**Current state:** `payment.html` calls the `grantAccess` Cloud Function which auto-approves and writes the purchase to Firestore. No money is collected yet — this is intentional until Razorpay is set up.

---

## 3. Dashboard — ✅ Fixed

- [x] Dashboard now reads purchases from Firestore (not localStorage)
  - Rewrote `isAccessible()`, `formatExpiry()`, `isExpiringSoon()` to use Firestore data
  - Auth module now loads all purchase docs and passes them to `initDashboard()`

---

## 4. Firebase Hosting Deployment

- [x] Fixed `firebase.json` — `"public": "."` (was pointing to non-existent `public/` folder)
- [x] `test-purchases.html` excluded from hosting via `ignore` list in `firebase.json`

### Steps to deploy:

```bash
# 1. Deploy Firestore rules
firebase deploy --only firestore:rules

# 2. Deploy Cloud Functions (first time: set the Groq key)
cd functions
npm install
firebase functions:secrets:set GROQ_API_KEY   # paste your Groq key once
cd ..
firebase deploy --only functions

# 3. Deploy the website
firebase deploy --only hosting

# 4. Your site will be live at:
#    https://gyanplay-prod.web.app
#    https://gyanplay-prod.firebaseapp.com
```

### Firebase Console steps (one-time setup):

1. Go to https://console.firebase.google.com → gyanplay-prod
2. **Firestore** → Rules → paste contents of `firestore.rules` → Publish
3. **Authentication** → Sign-in method → Enable Google
4. **Firestore** → Data → Create collection `admins` → Add document with your UID as the document ID (no fields needed)
5. **Hosting** → Get started (if not already done) → follow the steps

---

## 5. Nice to Have (after launch)

- [ ] Fix admin stats: replace the N+1 Firestore loop in `admin.html:626` with a counter document
- [ ] Add Gmail-only login check in `src/auth.js`
- [ ] Enable Firebase App Check to prevent API abuse
- [ ] Rate limiting on AI Teacher (per-user/minute)
- [ ] Progress reports for parents (weekly email digest)
- [ ] Offline mode for rural users (service worker + cached games)

---

## Notes

- Firebase API key in `firebase.js` is safe to be public — Firebase security comes from Firestore rules, not the key
- Pre-Nursery free access is handled client-side (price === 0 check) — no Firestore doc needed
- Admin access: add your UID to the `admins` Firestore collection (see step 4 above)
- The `grantAccess` Cloud Function URL: `https://asia-south1-gyanplay-prod.cloudfunctions.net/grantAccess`
