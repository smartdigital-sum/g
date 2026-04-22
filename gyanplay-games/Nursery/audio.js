/* ============================================
   GyanPlay Nursery — Audio Engine
   audio.js  ·  Web Audio API only (no files)
   ============================================ */

let _audioCtx = null;
let _muted = false;

function getAudioCtx() {
  if (!_audioCtx) {
    try {
      _audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    } catch(e) {}
  }
  return _audioCtx;
}

function resumeCtx() {
  const ctx = getAudioCtx();
  if (ctx && ctx.state === 'suspended') ctx.resume();
  return ctx;
}

function isMuted() { return _muted; }
function setMuted(v) {
  _muted = v;
  const btn = document.getElementById('soundToggle');
  if (btn) btn.classList.toggle('muted', v);
  localStorage.setItem('gyanplay_muted', v ? '1' : '0');
}
function toggleMute() { setMuted(!_muted); }

// ── PRIMITIVE SOUND BUILDERS ──────────────────
function playTone(freq, type, dur, gain, delay) {
  if (_muted) return;
  const ctx = resumeCtx();
  if (!ctx) return;
  delay = delay || 0;
  const osc  = ctx.createOscillator();
  const envG = ctx.createGain();
  osc.type = type || 'sine';
  osc.frequency.setValueAtTime(freq, ctx.currentTime + delay);
  envG.gain.setValueAtTime(0, ctx.currentTime + delay);
  envG.gain.linearRampToValueAtTime(gain || 0.25, ctx.currentTime + delay + 0.01);
  envG.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
  osc.connect(envG);
  envG.connect(ctx.destination);
  osc.start(ctx.currentTime + delay);
  osc.stop(ctx.currentTime + delay + dur + 0.05);
}

function playNoise(dur, gain, delay) {
  if (_muted) return;
  const ctx = resumeCtx();
  if (!ctx) return;
  delay = delay || 0;
  const bufSize = ctx.sampleRate * dur;
  const buf = ctx.createBuffer(1, bufSize, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
  const source = ctx.createBufferSource();
  source.buffer = buf;
  const envG = ctx.createGain();
  envG.gain.setValueAtTime(gain || 0.12, ctx.currentTime + delay);
  envG.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + delay + dur);
  source.connect(envG);
  envG.connect(ctx.destination);
  source.start(ctx.currentTime + delay);
  source.stop(ctx.currentTime + delay + dur + 0.05);
}

// ── GAME SOUNDS ───────────────────────────────

/** Cheerful ding — correct answer */
function soundCorrect() {
  playTone(660, 'sine', 0.18, 0.28);
  playTone(880, 'sine', 0.22, 0.22, 0.08);
  playTone(1100,'sine', 0.25, 0.18, 0.18);
}

/** Gentle pop — any tap */
function soundTap() {
  playTone(440, 'triangle', 0.08, 0.18);
  playNoise(0.04, 0.06);
}

/** Friendly wobble — wrong tap (no buzzer!) */
function soundWrong() {
  playTone(320, 'sine', 0.15, 0.15);
  playTone(280, 'sine', 0.18, 0.12, 0.1);
}

/** Star earned */
function soundStar() {
  playTone(784, 'sine', 0.12, 0.22);
  playTone(988, 'sine', 0.15, 0.2, 0.1);
  playTone(1318,'sine', 0.2, 0.18, 0.22);
}

/** Game complete fanfare */
function soundComplete() {
  // C5 E5 G5 C6
  playTone(523, 'sine', 0.18, 0.25);
  playTone(659, 'sine', 0.18, 0.22, 0.18);
  playTone(784, 'sine', 0.18, 0.20, 0.36);
  playTone(1047,'sine', 0.4,  0.25, 0.54);
}

/** Hello screen chime */
function soundHello() {
  playTone(440, 'sine', 0.15, 0.2);
  playTone(554, 'sine', 0.15, 0.18, 0.15);
  playTone(659, 'sine', 0.25, 0.2, 0.32);
}

/** Match locked */
function soundMatch() {
  playTone(523, 'sine', 0.14, 0.22);
  playTone(659, 'sine', 0.18, 0.2, 0.12);
}

// ── INIT ─────────────────────────────────────
document.addEventListener('DOMContentLoaded', () => {
  const saved = localStorage.getItem('gyanplay_muted');
  _muted = saved === '1';
  const btn = document.getElementById('soundToggle');
  if (btn) {
    btn.classList.toggle('muted', _muted);
    btn.addEventListener('click', () => {
      toggleMute();
      // resume audio context on first user interaction
      resumeCtx();
    });
  }
  // Resume audio on first tap anywhere
  document.addEventListener('touchstart', resumeCtx, { once: true, passive: true });
  document.addEventListener('mousedown', resumeCtx, { once: true });
});
