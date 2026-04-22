/**
 * rongmon-audio.js — Rongmon's World Web Audio sound engine
 * Synthesizes all sounds via Web Audio API — no external files needed.
 * Include after rongmon-data.js in each game page.
 */

const RongmonAudio = (() => {
  let ctx = null;
  let muted = false;

  function getCtx() {
    if (!ctx) {
      try { ctx = new (window.AudioContext || window.webkitAudioContext)(); } catch(e) { return null; }
    }
    // Resume if suspended (browser autoplay policy)
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  }

  function isMuted() {
    // Check localStorage via RongmonData if available
    if (typeof RongmonData !== 'undefined') {
      muted = RongmonData.getSetting('muted') || false;
    }
    return muted;
  }

  // ── Low-level tone helpers ──────────────────────────────────

  function playTone(freq, duration, type = 'sine', gain = 0.4, delayMs = 0) {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    setTimeout(() => {
      try {
        const osc = c.createOscillator();
        const vol = c.createGain();
        osc.connect(vol);
        vol.connect(c.destination);
        osc.type = type;
        osc.frequency.setValueAtTime(freq, c.currentTime);
        vol.gain.setValueAtTime(gain, c.currentTime);
        vol.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
        osc.start(c.currentTime);
        osc.stop(c.currentTime + duration);
      } catch(e) {}
    }, delayMs);
  }

  function playNoise(duration, gain = 0.15, delayMs = 0) {
    if (isMuted()) return;
    const c = getCtx();
    if (!c) return;
    setTimeout(() => {
      try {
        const bufSize = c.sampleRate * duration;
        const buf = c.createBuffer(1, bufSize, c.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < bufSize; i++) data[i] = Math.random() * 2 - 1;
        const src = c.createBufferSource();
        src.buffer = buf;
        const vol = c.createGain();
        src.connect(vol);
        vol.connect(c.destination);
        vol.gain.setValueAtTime(gain, c.currentTime);
        vol.gain.exponentialRampToValueAtTime(0.001, c.currentTime + duration);
        src.start(c.currentTime);
      } catch(e) {}
    }, delayMs);
  }

  // ── Public sound functions ──────────────────────────────────

  /** Correct answer — happy ascending ding */
  function playCorrect() {
    playTone(523, 0.15, 'triangle', 0.5);       // C
    playTone(659, 0.15, 'triangle', 0.5, 100);   // E
    playTone(784, 0.25, 'triangle', 0.5, 200);   // G
  }

  /** Wrong answer — low thud */
  function playWrong() {
    playTone(180, 0.18, 'square', 0.3);
    playNoise(0.15, 0.1, 50);
  }

  /** Level up — triumphant chord */
  function playLevelUp() {
    playTone(523, 0.2, 'triangle', 0.4);         // C
    playTone(659, 0.2, 'triangle', 0.4, 150);    // E
    playTone(784, 0.2, 'triangle', 0.4, 300);    // G
    playTone(1047, 0.4, 'triangle', 0.5, 450);   // C octave
  }

  /** Victory fanfare */
  function playVictory() {
    const melody = [523,587,659,698,784,880,988,1047];
    melody.forEach((f, i) => playTone(f, 0.18, 'triangle', 0.45, i * 120));
    playTone(1047, 0.6, 'sine', 0.3, melody.length * 120);
  }

  /** Click / tap feedback */
  function playClick() {
    playTone(800, 0.06, 'sine', 0.25);
  }

  /** Countdown tick */
  function playTick() {
    playTone(1100, 0.05, 'square', 0.2);
  }

  /** Coin / star collect */
  function playStar() {
    playTone(1047, 0.1, 'triangle', 0.4);
    playTone(1319, 0.15, 'triangle', 0.4, 80);
  }

  /** Dhol (Drum) - Deep percussive thud */
  function playDhol() {
    playTone(120, 0.2, 'square', 0.5);
    playNoise(0.1, 0.2);
  }

  /** Pepa (Horn) - Reedy, bright */
  function playPepa(freq = 600) {
    playTone(freq, 0.3, 'sawtooth', 0.3);
    playTone(freq + 5, 0.3, 'sawtooth', 0.2);
  }

  /** Taal (Cymbals) - High metallic clash */
  function playTaal() {
    playTone(2000, 0.4, 'sine', 0.1);
    playTone(2500, 0.4, 'triangle', 0.1);
    playTone(3000, 0.4, 'sine', 0.1);
    playNoise(0.3, 0.05);
  }

  /** Gogona (Jaw harp) - Twangy */
  function playGogona(freq = 200) {
    if (isMuted() || !getCtx()) return;
    const c = getCtx();
    const osc = c.createOscillator();
    const vol = c.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, c.currentTime);
    osc.frequency.exponentialRampToValueAtTime(freq * 2, c.currentTime + 0.3);
    vol.gain.setValueAtTime(0.4, c.currentTime);
    vol.gain.exponentialRampToValueAtTime(0.001, c.currentTime + 0.3);
    osc.connect(vol);
    vol.connect(c.destination);
    osc.start(c.currentTime);
    osc.stop(c.currentTime + 0.3);
  }

  /** Toggle mute on/off */
  function toggleMute() {
    muted = !muted;
    if (typeof RongmonData !== 'undefined') RongmonData.setSetting('muted', muted);
    return muted;
  }

  function setMuted(val) {
    muted = val;
    if (typeof RongmonData !== 'undefined') RongmonData.setSetting('muted', val);
  }

  // Unlock audio context on first user interaction (browser policy)
  document.addEventListener('click', () => { getCtx(); }, { once: true });
  document.addEventListener('touchstart', () => { getCtx(); }, { once: true });

  return { playCorrect, playWrong, playLevelUp, playVictory, playClick, playTick, playStar, playDhol, playPepa, playTaal, playGogona, toggleMute, setMuted, isMuted };
})();
