/**
 * rongmon-data.js — Rongmon's World shared progress system
 * Uses localStorage to persist scores, streaks, and progress.
 * Include this script in every game and dashboard page.
 */

const RongmonData = (() => {
  const KEY = 'rongmon_save';

  // ── DEFAULT STATE ──────────────────────────────────────────
  const defaultState = () => ({
    version: 2,
    totalStars: 0,
    streak: 0,
    lastPlayedDate: null,
    games: {
      'jungle-rescue':    { stars: 0, highScore: 0, played: false, unlocked: [] },
      'flood-mission':    { stars: 0, highScore: 0, played: false, difficulty: 'medium' },
      'bihu-cookoff':     { stars: 0, highScore: 0, played: false },
      'animal-detective': { stars: 0, highScore: 0, played: false },
      'map-warrior':      { stars: 0, highScore: 0, played: false, districts: [] },
      'tea-garden':       { stars: 0, highScore: 0, played: false, difficulty: 'medium' },
      'number-adventure': { stars: 0, highScore: 0, played: false },
    },
    animalTrophies: {
      'অজগৰ': { emoji:'🐍', eng:'Python',   letter:'অ', stars:0, unlocked:false },
      'হাতী':  { emoji:'🐘', eng:'Elephant', letter:'হ', stars:0, unlocked:false },
      'কপৌ':  { emoji:'🕊️', eng:'Dove',     letter:'ক', stars:0, unlocked:false },
      'গঁড়':  { emoji:'🦏', eng:'Rhino',    letter:'গ', stars:0, unlocked:false },
      'মাছ':  { emoji:'🐟', eng:'Fish',     letter:'ম', stars:0, unlocked:false },
      'বাঘ':  { emoji:'🐯', eng:'Tiger',    letter:'ব', stars:0, unlocked:false },
      'পহু':  { emoji:'🦌', eng:'Deer',     letter:'প', stars:0, unlocked:false },
      'ৰঙীন চৰাই': { emoji:'🦜', eng:'Colourful Bird', letter:'ৰ', stars:0, unlocked:false },
    },
    badges: [],
    onboardingSeen: {},
    settings: { muted: false, lang: 'en' },
    history: [],
    dailyChallenge: { date: null, gameId: null, targetScore: 0, completed: false },
  });

  // ── LOAD / SAVE ─────────────────────────────────────────────
  function load() {
    try {
      const raw = localStorage.getItem(KEY);
      if (!raw) return defaultState();
      const saved = JSON.parse(raw);
      // Merge so new keys in defaultState are always present
      const def = defaultState();
      return deepMerge(def, saved);
    } catch (e) {
      return defaultState();
    }
  }

  function save(state) {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch (e) {}
  }

  function deepMerge(target, source) {
    const out = Object.assign({}, target);
    for (const key of Object.keys(source)) {
      if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
        out[key] = deepMerge(target[key] || {}, source[key]);
      } else {
        out[key] = source[key];
      }
    }
    return out;
  }

  // ── STREAK ──────────────────────────────────────────────────
  function updateStreak(state) {
    const today = new Date().toDateString();
    if (state.lastPlayedDate === today) return state;
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    state.streak = (state.lastPlayedDate === yesterday) ? state.streak + 1 : 1;
    state.lastPlayedDate = today;
    return state;
  }

  // ── BADGES ──────────────────────────────────────────────────
  const BADGE_RULES = [
    { id:'first_rescue',   check: s => Object.values(s.animalTrophies).some(a => a.unlocked),          name_en:'First Rescue',  name_as:'প্ৰথম উদ্ধাৰ', icon:'🌱', desc_en:'Freed your first animal!',     desc_as:'প্ৰথম জন্তু মুক্ত!' },
    { id:'on_fire',        check: s => s.streak >= 3,                                                    name_en:'On Fire! 🔥',   name_as:'আগুনীয়া!',     icon:'🔥', desc_en:'3-day play streak',             desc_as:'৩ দিনৰ ধাৰা' },
    { id:'star_student',   check: s => s.totalStars >= 50,                                               name_en:'Star Student',  name_as:'তাৰকা ছাত্ৰ',   icon:'⭐', desc_en:'Earned 50 stars total',         desc_as:'মুঠ ৫০টা তাৰকা' },
    { id:'letter_master',  check: s => Object.values(s.animalTrophies).filter(a => a.unlocked).length >= 8, name_en:'Letter Master', name_as:'আখৰ মাষ্টৰ', icon:'📖', desc_en:'Learned all 8 letters',          desc_as:'সকলো ৮টা আখৰ' },
    { id:'champion',       check: s => Object.values(s.games).filter(g => g.played).length >= 5,        name_en:'Champion',      name_as:'চ্যাম্পিয়ন',   icon:'🏆', desc_en:'Played 5+ different games',      desc_as:'৫+ খেল খেলিলে' },
    { id:'perfect_score',  check: s => Object.values(s.games).some(g => g.highScore >= 100),             name_en:'Perfect Score', name_as:'নিখুঁত স্কোৰ',  icon:'💯', desc_en:'Scored 100+ in one game',        desc_as:'এটা খেলত ১০০+ স্কোৰ' },
    { id:'jungle_explorer',check: s => s.streak >= 7,                                                    name_en:'Explorer',      name_as:'অভিযাত্ৰী',    icon:'🌿', desc_en:'7 days in a row!',               desc_as:'৭ দিন একেৰাহে!' },
    { id:'rhino_friend',   check: s => s.animalTrophies['গঁড়']?.unlocked,                               name_en:'Rhino Friend',  name_as:"ৰংমনৰ বন্ধু",   icon:'🦏', desc_en:"Freed Rongmon's cousin!",        desc_as:'ৰংমনৰ আত্মীয় মুক্ত!' },
  ];

  function checkBadges(state) {
    let newBadge = false;
    for (const rule of BADGE_RULES) {
      if (!state.badges.includes(rule.id) && rule.check(state)) {
        state.badges.push(rule.id);
        newBadge = true;
      }
    }
    return newBadge;
  }

  // ── PUBLIC API ───────────────────────────────────────────────

  /** Record finishing a game level/victory */
  function recordGame(gameId, { stars = 0, score = 0, animalName = null, animalStars = 0 } = {}) {
    const s = load();
    updateStreak(s);
    const g = s.games[gameId] || { stars: 0, highScore: 0, played: false };
    g.played = true;
    g.stars = Math.max(g.stars, stars);
    g.highScore = Math.max(g.highScore, score);
    s.games[gameId] = g;
    s.totalStars += stars;

    // Unlock animal trophy
    if (animalName && s.animalTrophies[animalName]) {
      s.animalTrophies[animalName].unlocked = true;
      s.animalTrophies[animalName].stars = Math.max(s.animalTrophies[animalName].stars, animalStars);
    }

    // History (keep last 20)
    s.history.unshift({ gameId, stars, score, date: new Date().toISOString() });
    if (s.history.length > 20) s.history.length = 20;

    checkBadges(s);
    save(s);
    return s;
  }

  /** Check if daily challenge is complete today */
  function getDailyChallenge() {
    const s = load();
    const today = new Date().toDateString();
    const games = ['jungle-rescue','flood-mission','bihu-cookoff','animal-detective','map-warrior','tea-garden'];
    // Seed by day-of-year for deterministic rotation
    const doy = Math.floor((Date.now() - new Date(new Date().getFullYear(),0,0)) / 86400000);
    const gameId = games[doy % games.length];
    const targets = [30, 50, 75, 100];
    const targetScore = targets[doy % targets.length];

    if (s.dailyChallenge.date !== today) {
      s.dailyChallenge = { date: today, gameId, targetScore, completed: false };
      save(s);
    }
    return s.dailyChallenge;
  }

  function completeDailyChallenge() {
    const s = load();
    s.dailyChallenge.completed = true;
    save(s);
  }

  /** Save difficulty preference for a game */
  function setDifficulty(gameId, level) {
    const s = load();
    if (s.games[gameId]) s.games[gameId].difficulty = level;
    save(s);
  }

  function getDifficulty(gameId) {
    return load().games[gameId]?.difficulty || 'medium';
  }

  /** Mark onboarding seen for a game */
  function markOnboardingSeen(gameId) {
    const s = load();
    s.onboardingSeen[gameId] = true;
    save(s);
  }

  function hasSeenOnboarding(gameId) {
    return !!load().onboardingSeen[gameId];
  }

  /** Get / set global settings */
  function getSetting(key) { return load().settings[key]; }
  function setSetting(key, val) {
    const s = load(); s.settings[key] = val; save(s);
  }

  /** Get full state for dashboard */
  function getState() { return load(); }

  /** Get summary report */
  function getReport() {
    const s = load();
    return {
      totalStars: s.totalStars,
      streak: s.streak,
      animalsFreed: Object.values(s.animalTrophies).filter(a => a.unlocked).length,
      lettersLearned: [...new Set(
        Object.values(s.animalTrophies).filter(a => a.unlocked).map(a => a.letter)
      )],
      badges: s.badges,
      gamesPlayed: Object.keys(s.games).filter(k => s.games[k].played).length,
      history: s.history,
      trophies: s.animalTrophies,
      allBadges: BADGE_RULES,
    };
  }

  /** Reset all saved data (for testing) */
  function resetAll() { localStorage.removeItem(KEY); }

  return {
    recordGame, getDailyChallenge, completeDailyChallenge,
    setDifficulty, getDifficulty,
    markOnboardingSeen, hasSeenOnboarding,
    getSetting, setSetting,
    getState, getReport, resetAll,
    BADGE_RULES,
  };
})();

// Register service worker for PWA/offline
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('../service-worker.js').catch(() => {});
  });
}
