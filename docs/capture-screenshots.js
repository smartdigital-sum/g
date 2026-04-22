
const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

const BASE = 'http://localhost:5500';
const OUT  = path.resolve(__dirname, 'screenshots');

// ── Mock auth.js that bypasses Firebase completely ──────────────────────────
const MOCK_AUTH_JS = `
export async function registerUser() { return { success: false }; }
export async function loginWithGoogle() { return { success: false }; }
export async function loginWithEmail() { return { success: false }; }
export async function loginWithPhone() { return { success: false }; }
export async function sendPasswordReset() { return { success: false }; }
export async function logOut() {}
export function requireAuth(cb) {
  cb({ uid: 'demo-uid', displayName: 'Priya Sharma', email: 'priya@demo.com' });
}
export async function getUserProfile() {
  return { studentName: 'Priya Sharma', name: 'Priya Sharma' };
}
export async function saveLangPreference() {}
`;

// ── Mock firebase.js that exports dummy objects ─────────────────────────────
const MOCK_FIREBASE_JS = `
export const auth = {};
export const db   = {};
`;

// ── localStorage mock state ──────────────────────────────────────────────────
const MOCK_STORAGE = {
  gyanplay_lang: 'en',
  gyanplay_user_name: 'Priya Sharma',
  'gyanplay_access_class-1': 'true',
  'gyanplay_access_class-3': 'true',
  'gyanplay_expiry_class-1': '2027-03-31',
  'gyanplay_expiry_class-3': '2026-09-30',
  gyanplay_lastClass: 'class-3',
};

async function setupRoutes(page) {
  await page.route('**/src/auth.js', route =>
    route.fulfill({ contentType: 'application/javascript', body: MOCK_AUTH_JS })
  );
  await page.route('**/src/firebase.js', route =>
    route.fulfill({ contentType: 'application/javascript', body: MOCK_FIREBASE_JS })
  );
  // Block Firestore calls so page doesn't hang waiting for them
  await page.route('**/firestore.googleapis.com/**', route => route.abort());
  await page.route('**/firebase.google.com/**', route => route.abort());
  await page.route('**/identitytoolkit.googleapis.com/**', route => route.abort());
}

async function injectStorage(page) {
  await page.evaluate((items) => {
    Object.entries(items).forEach(([k, v]) => localStorage.setItem(k, v));
  }, MOCK_STORAGE);
}

// ── Screenshot definitions ───────────────────────────────────────────────────
const shots = [

  // 1 · LANDING ──────────────────────────────────────────────────────────────
  {
    name:  'landing.png',
    label: 'Landing page (hero + features)',
    url:   `${BASE}/index.html`,
    after: async (page) => {
      await page.waitForTimeout(3000);
      await page.evaluate(() => window.scrollTo({ top: 300, behavior: 'instant' }));
      await page.waitForTimeout(500);
    },
  },

  // 2 · DASHBOARD ────────────────────────────────────────────────────────────
  {
    name:  'dashboard.png',
    label: 'Dashboard (class grid, owned + locked)',
    url:   `${BASE}/dashboard.html`,
    after: async (page) => {
      await injectStorage(page);
      // initDashboard exists on the page and renders the grid
      await page.evaluate(async () => {
        if (typeof window.initDashboard === 'function') {
          await window.initDashboard('Priya Sharma', false);
        }
      });
      await page.waitForTimeout(1800);
    },
  },

  // 3 · CLASSROOM ────────────────────────────────────────────────────────────
  {
    name:  'classroom.png',
    label: 'Classroom – Class 3 game grid',
    url:   `${BASE}/classroom.html?class=class-3`,
    after: async (page) => {
      await injectStorage(page);
      await page.waitForTimeout(3000);
      // scroll to show the game tiles
      await page.evaluate(() => window.scrollTo({ top: 120, behavior: 'instant' }));
      await page.waitForTimeout(400);
    },
  },

  // 4 · AI TEACHER ───────────────────────────────────────────────────────────
  {
    name:  'ai-teacher.png',
    label: 'AI Teacher chat panel open',
    url:   `${BASE}/classroom.html?class=class-3`,
    after: async (page) => {
      await injectStorage(page);
      await page.waitForTimeout(3000);
      // Try every plausible AI chat toggle button
      const selectors = [
        '#aiChatToggle','#chatToggle','#aiToggle',
        '.ai-chat-btn','.ai-toggle','.chat-fab','.fab',
        'button[title*="AI"]','button[title*="Chat"]',
        '[class*="ai-teacher"]','[id*="ai-chat"]','[id*="aichat"]',
      ];
      for (const sel of selectors) {
        try {
          const el = await page.$(sel);
          if (el) {
            await el.click();
            console.log(`  ✅  AI chat opened via: ${sel}`);
            break;
          }
        } catch {}
      }
      await page.waitForTimeout(1200);
    },
  },

  // 5 · FRACTION GAME ────────────────────────────────────────────────────────
  {
    name:  'game-fractions.png',
    label: 'Fraction Street game (mid-play)',
    url:   `${BASE}/gyanplay-games/class 3/first/game3-fraction-street.html`,
    after: async (page) => {
      await page.waitForTimeout(2000);
      // Try to click start/play button
      const starters = [
        '#startBtn','.start-btn','#playBtn','.play-btn',
        'button[id*="start"]','button[class*="start"]',
        '.btn-start','#btnStart',
      ];
      for (const sel of starters) {
        try {
          const el = await page.$(sel);
          if (el) { await el.click(); console.log(`  ✅  Game started via: ${sel}`); break; }
        } catch {}
      }
      await page.waitForTimeout(2000);
    },
  },

  // 6 · ADMIN ────────────────────────────────────────────────────────────────
  {
    name:  'admin.png',
    label: 'Admin panel (games management view)',
    url:   `${BASE}/admin.html`,
    after: async (page) => {
      await injectStorage(page);
      await page.waitForTimeout(3000);
    },
  },
];

// ── Main ─────────────────────────────────────────────────────────────────────
(async () => {
  fs.mkdirSync(OUT, { recursive: true });

  const browser = await chromium.launch({ headless: false });

  for (const shot of shots) {
    console.log(`\n📸  Capturing: ${shot.label}`);

    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();

    // Suppress JS errors from pages
    page.on('pageerror', () => {});
    page.on('console', msg => {
      if (msg.type() === 'error') return; // suppress console.errors too
    });

    await setupRoutes(page);

    try {
      await page.goto(shot.url, { waitUntil: 'domcontentloaded', timeout: 15000 });
    } catch {
      console.log('  ⚠  Navigation timed out — continuing');
    }

    if (shot.after) {
      try { await shot.after(page); }
      catch (e) { console.log(`  ⚠  Post-load step: ${e.message}`); }
    }

    const outPath = path.join(OUT, shot.name);
    await page.screenshot({ path: outPath, fullPage: true });
    console.log(`  ✅  Saved → ${outPath}`);

    await context.close();
  }

  await browser.close();
  console.log('\n🎉  All 6 screenshots done!');
  console.log(`📁  ${OUT}`);
})();
