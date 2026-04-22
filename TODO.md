# GyanPlay — Pre-Launch TODO List

## 1. Security — Do First

- [x] **Rotate the Groq API key** (done — old key revoked in Groq console)
- [x] **Move Groq key server-side** — proxy lives at `functions/index.js` (`aiTeacherChat`)
  - Store the new key via `firebase functions:secrets:set GROQ_API_KEY`
  - Client (`classroom.html`) calls the Cloud Function with a Firebase ID token; no key reaches the browser

- [ ] **Lock purchase writes to server only in Firestore rules**
  - File: `firestore.rules` line 23–26
  - Currently any logged-in user can write their own purchase document (bypasses payment)
  - Change the purchases rule to: `allow write: if false;` (only your Cloud Function should write purchases)
  - Keep `allow read` for the user so they can still see their own purchases

- [ ] **Delete `test-purchases.html`** before deploying
  - This file lets anyone toggle free access to all classes via browser — must not go live

---

## 2. Razorpay Integration (needs current bank account first)

- [ ] Open a current bank account
- [ ] Sign up at https://razorpay.com with business details
- [ ] Go to Razorpay Dashboard → Settings → API Keys → Generate Test Key
- [ ] In `src/payment.js` line 46, replace `"YOUR_RAZORPAY_KEY_ID"` with your `rzp_test_...` key
- [ ] In `payment.html`, replace the fake `handlePay` stub (lines 583–613) with a real call to `openRazorpay()` from `src/payment.js`
- [ ] Write a Firebase Cloud Function that:
  - Receives payment success from Razorpay
  - Verifies the Razorpay signature (prevents fake payment claims)
  - Writes the purchase document to Firestore (so users cannot write it themselves)
- [ ] Test end-to-end with Razorpay test mode before going live
- [ ] Switch to Live Key (`rzp_live_...`) when ready to accept real payments

---

## 3. Dashboard — Fix Purchase Display

- [ ] In `dashboard.html` (around line 580), replace the localStorage stub with real Firestore reads
  - Currently the dashboard checks `localStorage` for owned classes — breaks on other devices/browsers
  - `classroom.html` already does it correctly with Firestore — copy that pattern into dashboard
  - Functions to rewrite: `getPurchases()`, `isAccessible()`, `formatExpiry()`, `isExpiringSoon()`

---

## 4. Netlify Deployment (account opens ~20th April 2026)

- [ ] Account suspended until ~20 April 2026 — wait for it to reopen
- [ ] After it reopens, delete `test-purchases.html` before pushing
- [x] Confirm Groq key is NOT in any committed file (grep for `gsk_` returns nothing)
- [ ] Make sure Razorpay live key is set (not the placeholder)
- [ ] Set up environment variables in Netlify for any secrets (if you move to a backend)
- [ ] Test all pages after deploy: index → login → dashboard → payment → classroom → admin

---

## 5. Nice to Have (after launch)

- [ ] Fix admin stats: replace the N+1 Firestore loop in `admin.html:626` with a counter document — it will be very slow with many users
- [x] Merge `class.html` and `classroom.html` into one file — they overlap
- [x] Pick one canonical ID for Pre-Nursery (`prenursery` vs `pre-nursery`) and use it everywhere
  - Canonical ID is now `pre-nursery` in games.json, payment.js, and classroom.html
- [ ] Add Gmail-only login check in `src/auth.js` (README says it's enforced but the code does not check)
- [ ] Fix admin page redirects: change `"/login.html"` → `"login.html"` (relative path, line 583 of admin.html)
- [ ] Enable Firebase App Check to prevent API abuse

---

## Notes

- Firebase API key in `firebase.js` is safe to be public — Firebase security comes from Firestore rules, not the key
- Pre-Nursery free access auto-activates on first dashboard load — no manual action needed
- Admin access: add your UID to the `admins` Firestore collection (see README step 6)
