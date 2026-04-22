/* ============================================
   GyanPlay Nursery — Shared Game Engine
   game-engine.js
   ============================================ */

// ── LANGUAGE ─────────────────────────────────
const LANGS = ['en', 'as', 'hi'];

function setLang(lang) {
  LANGS.forEach((l, i) => {
    document.querySelectorAll('.lang-toggle button')[i]
      ?.classList.toggle('active', l === lang);
  });
  document.querySelectorAll('[data-lang]').forEach(el => {
    el.style.display = el.getAttribute('data-lang') === lang ? 'inline' : 'none';
  });
  localStorage.setItem('gyanplay_lang', lang);
  // Update parent tip if function exists
  if (typeof refreshParentTip === 'function') refreshParentTip(lang);
}

function getLang() {
  return localStorage.getItem('gyanplay_lang') || 'en';
}

// ── STARS (3-star system) ─────────────────────
let _stars = 0;
function initStars() { _stars = 0; renderStars(); }

function awardStar() {
  if (_stars >= 3) return;
  _stars++;
  renderStars();
}

function renderStars() {
  document.querySelectorAll('.star').forEach((el, i) => {
    const wasLit = el.classList.contains('lit');
    const shouldBeLit = i < _stars;
    el.classList.toggle('lit', shouldBeLit);
    if (shouldBeLit && !wasLit) el.classList.add('pop');
    else el.classList.remove('pop');
  });
}

// ── PROGRESS BAR ─────────────────────────────
function updateProgress(current, total) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0;
  const fill = document.getElementById('progressFill');
  if (fill) fill.style.width = pct + '%';
}

// ── CONFETTI ─────────────────────────────────
const CONFETTI_COLOURS = ['#FF6B00','#FFB800','#00AEEF','#00C853','#FF4081','#7C3AED'];

function launchConfetti(count) {
  count = count || 28;
  for (let i = 0; i < count; i++) {
    const el = document.createElement('div');
    el.className = 'confetti-piece';
    el.style.cssText = `
      left: ${Math.random() * 100}vw;
      top: -10px;
      background: ${CONFETTI_COLOURS[Math.floor(Math.random() * CONFETTI_COLOURS.length)]};
      --dur: ${1.4 + Math.random() * 1.4}s;
      --dx: ${(Math.random() - 0.5) * 180}px;
      transform-origin: center;
      border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
    `;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ── CELEBRATION OVERLAY ───────────────────────
function showCelebration(opts) {
  opts = opts || {};
  const overlay = document.getElementById('celebrationOverlay');
  if (!overlay) return;

  document.getElementById('celEmoji').textContent  = opts.emoji  || '🎉';
  document.getElementById('celTitle').textContent  = opts.title  || 'Well done!';
  document.getElementById('celSub').textContent    = opts.sub    || 'You did it!';
  document.getElementById('celFact').textContent   = opts.fact   || '';

  overlay.classList.add('show');
  launchConfetti(32);
}

function hideCelebration() {
  document.getElementById('celebrationOverlay')?.classList.remove('show');
}

// ── CORRECT TAP FEEDBACK ──────────────────────
function correctFeedback(el) {
  el.classList.add('correct');
  setTimeout(() => el.classList.remove('correct'), 600);
}

// ── WRONG TAP FEEDBACK (no penalty) ──────────
function wrongFeedback(el) {
  el.classList.add('wrong');
  setTimeout(() => el.classList.remove('wrong'), 550);
}

// ── HINT PULSE ────────────────────────────────
function showHint(el) {
  el.classList.add('hint');
  setTimeout(() => el.classList.remove('hint'), 2500);
}

// ── SHOW / HIDE SCREENS ───────────────────────
function showScreen(id) {
  document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
  const el = document.getElementById(id);
  if (el) el.classList.remove('hidden');
}

// ── NEXT BUTTON ───────────────────────────────
function showNextBtn() {
  const btn = document.getElementById('nextBtn');
  if (btn) btn.classList.add('visible');
}
function hideNextBtn() {
  const btn = document.getElementById('nextBtn');
  if (btn) btn.classList.remove('visible');
}

// ── SHUFFLE ───────────────────────────────────
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// ── PROGRESS SAVE (visit only, no score) ──────
function markVisited(gameId) {
  try {
    const data = JSON.parse(localStorage.getItem('gyanplay_nursery') || '{}');
    data[gameId] = { visited: true, date: new Date().toISOString().split('T')[0] };
    localStorage.setItem('gyanplay_nursery', JSON.stringify(data));
  } catch(e) {}
}

function isVisited(gameId) {
  try {
    const data = JSON.parse(localStorage.getItem('gyanplay_nursery') || '{}');
    return !!(data[gameId] && data[gameId].visited);
  } catch(e) { return false; }
}

// ── INIT ON DOM READY ─────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  setLang(getLang());
});
