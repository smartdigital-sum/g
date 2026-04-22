/**
 * Assam Kids Learn - Educational Games Website
 * Main Application JavaScript
 * For students aged 6-9 in Assam, India
 * Version 2.0 - With all bug fixes and new features
 */

// ==========================================================================
// Configuration & Data
// ==========================================================================

const CONFIG = {
    appName: 'Assam Kids Learn',
    version: '2.0.0',
    languages: ['en', 'as', 'hi'],
    defaultLang: 'en',
    subjects: ['math', 'english', 'assamese', 'evs'],
    storageKey: 'assamKidsLearn',
    avatars: ['👦', '👧', '🧒', '🦁', '🐯', '🐘', '🦚', '🦉', '🐼', '🦋', '🌟', '🚀']
};

// Multilingual Translations
const translations = {
    en: {
        appName: 'Assam Kids Learn',
        navHome: '🏠 Home',
        navMath: '🔢 Math',
        navEnglish: '📖 English',
        navAssamese: '🅰️ Assamese',
        navEVS: '🌿 EVS',
        navGames: '🎮 All Games',
        navProgress: '📈 My Progress',
        welcomeTitle: 'Welcome, Learner! 🎉',
        welcomeSubtitle: "Let's learn and play together",
        welcomeName: 'Welcome, {name}! 🎉',
        chooseSubject: 'Choose Your Subject',
        subjectMath: 'Math',
        subjectEnglish: 'English',
        subjectAssamese: 'Assamese',
        subjectEVS: 'EVS',
        mathDesc: 'Numbers, shapes & counting',
        englishDesc: 'Words & reading',
        assameseDesc: 'অসমীয়া বর্ণমালা',
        evsDesc: 'Nature & around us',
        featuredGames: 'Featured Games',
        allGames: 'All Games',
        viewAllGames: '🎮 View All Games',
        myProgress: 'My Progress',
        totalStars: 'Total Stars',
        gamesPlayed: 'Games Played',
        badgesEarned: 'Badges',
        badgesTitle: '🏆 Badges Earned',
        subjectProgress: 'Subject Progress',
        dailyChallengeTitle: 'Complete 3 Math Games!',
        dailyChallengeComplete: 'Daily Challenge Complete!',
        playNow: 'Play Now',
        play: 'Play',
        loading: 'Loading...',
        selectLanguage: 'Select Your Language',
        levelComplete: 'Level Complete!',
        playAgain: 'Play Again',
        nextLevel: 'Next Level',
        backToMenu: 'Back to Menu',
        settings: '⚙️ Settings',
        profile: '👤 Profile',
        matchNumbers: 'Match the same numbers!',
        findWords: 'Find hidden words!',
        tapLetter: 'Tap the correct letter!',
        whatAnimal: 'What is this animal?',
        findShape: 'Find the shape!',
        soundOn: 'Sound On',
        soundOff: 'Sound Off',
        lowDataMode: 'Low Data Mode',
        darkMode: 'Dark Mode',
        resetProgress: 'Reset Progress',
        chooseAvatar: 'Choose Your Avatar',
        yourName: 'Your Name',
        save: 'Save',
        cancel: 'Cancel',
        correct: 'Correct! ✓',
        tryAgain: 'Try again!',
        great: 'Great! 🌟',
        perfect: 'Perfect! 🎉',
        firstGame: 'First Game Played',
        tenStars: 'Collector - 10 Stars',
        fiftyStars: 'Star Collector - 50 Stars',
        hundredStars: 'Star Master - 100 Stars',
        firstBadge: 'First Badge Earned',
        mathWizard: 'Math Wizard',
        englishStar: 'English Star',
        assameseHero: 'Assamese Hero',
        natureExplorer: 'Nature Explorer',
        dailyChamp: 'Daily Champion'
    },
    as: {
        appName: 'আসাম কিডছ লার্ণ',
        navHome: '🏠 ঘৰ',
        navMath: '🔢 গণিত',
        navEnglish: '📖 ইংৰাজী',
        navAssamese: '🅰️ অসমীয়া',
        navEVS: '🌿 পৰিবেশ',
        navGames: '🎮 সকলো খেল',
        navProgress: '📈 মোৰ অগ্রগতি',
        welcomeTitle: 'স্বাগতম, শিক্ষান্তৰ্থী! 🎉',
        welcomeSubtitle: 'আহক শিকিব আৰু খেলিব যাওঁ',
        welcomeName: 'স্বাগতম, {name}! 🎉',
        chooseSubject: 'বিষয় বাছক',
        subjectMath: 'গণিত',
        subjectEnglish: 'ইংৰাজী',
        subjectAssamese: 'অসমীয়া',
        subjectEVS: 'পৰিবেশ',
        mathDesc: 'সংখ্যা, আকৃতি আৰু গণনা',
        englishDesc: 'শব্দ আৰু পঢ়া',
        assameseDesc: 'অসমীয়া বর্ণমালা',
        evsDesc: 'প্রকৃতি আৰু চৌপাশে',
        featuredGames: 'জনপ্রিয় খেল',
        allGames: 'সকলো খেল',
        viewAllGames: '🎮 সকলো খেল',
        myProgress: 'মোৰ অগ্রগতি',
        totalStars: 'মুঠ তাৰা',
        gamesPlayed: 'খেলা খেলা হৈছে',
        badgesEarned: 'বেজ',
        badgesTitle: '🏆 বেজ',
        subjectProgress: 'বিষয় অগ্রগতি',
        dailyChallengeTitle: '৩টা গণিত খেল সম্পূর্ণ কৰক!',
        dailyChallengeComplete: 'দৈনিক চেলেঞ্জ সম্পূর্ণ!',
        playNow: 'এতিয়া খেলক',
        play: 'খেলক',
        loading: 'লোড হছে...',
        selectLanguage: 'আপোনাৰ ভাষা বাছক',
        levelComplete: 'লেভেল সম্পূর্ণ!',
        playAgain: 'আকৌ খেলক',
        nextLevel: 'পৰৱর্তী লেভেল',
        backToMenu: 'মেনুলৈ ঘূৰক',
        settings: '⚙️ ছেটিংছ',
        profile: '👤 প্রফাইল',
        matchNumbers: 'সমান সংখ্যা মিলাও!',
        findWords: 'লুকান শব্দ বিচাৰক!',
        tapLetter: 'সঠিক আখৰটো টেপ কৰক!',
        whatAnimal: 'এই পশুটো কি?',
        findShape: 'আকৃতিটো বিচাৰক!',
        soundOn: 'শব্দ অন',
        soundOff: 'শব্দ বন্ধ',
        lowDataMode: 'কম ডাটা মোড',
        darkMode: 'ডাৰ্ক মোড',
        resetProgress: 'প্রগতি ৰিছেট কৰক',
        chooseAvatar: 'আপোনাৰ অবতাৰ বাছক',
        yourName: 'আপোনাৰ নাম',
        save: 'সংরক্ষণ',
        cancel: 'বাতিল',
        correct: 'সঠিক! ✓',
        tryAgain: 'আকৌ চেষ্টা কৰক!',
        great: 'ভালো! 🌟',
        perfect: 'নিখুঁত! 🎉',
        firstGame: 'প্রথম খেল',
        tenStars: 'তাৰা সংগ্রাহক - ১০',
        fiftyStars: 'তাৰা সংগ্রাহক - ৫০',
        hundredStars: 'তাৰা মাস্টাৰ - ১০০',
        firstBadge: 'প্রথম বেজ',
        mathWizard: 'গণিত বিদ্যুৎ',
        englishStar: 'ইংৰাজী তাৰা',
        assameseHero: 'অসমীয়া বীৰ',
        natureExplorer: 'পৰিবেশ অন্বেষক',
        dailyChamp: 'দৈনিক চেম্পিয়ন'
    },
    hi: {
        appName: 'असम किड्स लर्न',
        navHome: '🏠 होम',
        navMath: '🔢 गणित',
        navEnglish: '📖 अंग्रेज़ी',
        navAssamese: '🅰️ असमी',
        navEVS: '🌿 पर्यावरण',
        navGames: '🎮 सभी गेम्स',
        navProgress: '📈 मेरी प्रगति',
        welcomeTitle: 'स्वागत है, सीखने वाले! 🎉',
        welcomeSubtitle: 'चलो सीखते और खेलते हैं',
        welcomeName: 'स्वागत है, {name}! 🎉',
        chooseSubject: 'विषय चुनें',
        subjectMath: 'गणित',
        subjectEnglish: 'अंग्रेज़ी',
        subjectAssamese: 'असमी',
        subjectEVS: 'पर्यावरण',
        mathDesc: 'संख्याएं, आकृतियां और गिनती',
        englishDesc: 'शब्द और पढ़ना',
        assameseDesc: 'असमी वर्णमाला',
        evsDesc: 'प्रकृति और हमारे आसपास',
        featuredGames: 'लोकप्रिय गेम्स',
        allGames: 'सभी गेम्स',
        viewAllGames: '🎮 सभी गेम्स',
        myProgress: 'मेरी प्रगति',
        totalStars: 'कुल तारे',
        gamesPlayed: 'खेले गए गेम्स',
        badgesEarned: 'बैज',
        badgesTitle: '🏆 बैज',
        subjectProgress: 'विषय प्रगति',
        dailyChallengeTitle: '3 गणित गेम पूरे करें!',
        dailyChallengeComplete: 'दैनिक चुनौती पूरी!',
        playNow: 'अभी खेलें',
        play: 'खेलें',
        loading: 'लोड हो रहा है...',
        selectLanguage: 'अपनी भाषा चुनें',
        levelComplete: 'लेवल पूरा!',
        playAgain: 'फिर से खेलें',
        nextLevel: 'अगला लेवल',
        backToMenu: 'मेनू पर वापस',
        settings: '⚙️ सेटिंग्स',
        profile: '👤 प्रोफाइल',
        matchNumbers: 'समान संख्याएं मिलाएं!',
        findWords: 'छिपे शब्द खोजें!',
        tapLetter: 'सही अक्षर पर टैप करें!',
        whatAnimal: 'यह क्या जानवर है?',
        findShape: 'आकृति खोजें!',
        soundOn: 'ध्वनि चालू',
        soundOff: 'ध्वनि बंद',
        lowDataMode: 'लो डेटा मोड',
        darkMode: 'डार्क मोड',
        resetProgress: 'प्रगति रीसेट करें',
        chooseAvatar: 'अपना अवतार चुनें',
        yourName: 'आपका नाम',
        save: 'सहेजें',
        cancel: 'रद्द करें',
        correct: 'सही! ✓',
        tryAgain: 'फिर कोशिश करें!',
        great: 'बढ़िया! 🌟',
        perfect: 'परफेक्ट! 🎉',
        firstGame: 'पहला गेम',
        tenStars: 'सितारा संग्राहक - 10',
        fiftyStars: 'सितारा संग्राहक - 50',
        hundredStars: 'सितारा मास्टर - 100',
        firstBadge: 'पहला बैज',
        mathWizard: 'गणित विदूषक',
        englishStar: 'अंग्रेज़ी सितारा',
        assameseHero: 'असमी हीरो',
        natureExplorer: 'प्रकृति अन्वेषक',
        dailyChamp: 'दैनिक चैंपियन'
    }
};

// Badges System
const badgesDB = [
    { id: 'firstGame', icon: '🎮', nameKey: 'firstGame', condition: (p) => p.gamesPlayed >= 1 },
    { id: 'tenStars', icon: '⭐', nameKey: 'tenStars', condition: (p) => p.totalStars >= 10 },
    { id: 'fiftyStars', icon: '🌟', nameKey: 'fiftyStars', condition: (p) => p.totalStars >= 50 },
    { id: 'hundredStars', icon: '🏆', nameKey: 'hundredStars', condition: (p) => p.totalStars >= 100 },
    { id: 'firstBadge', icon: '🎖️', nameKey: 'firstBadge', condition: (p) => p.badges.length >= 1 },
    { id: 'mathWizard', icon: '🔢', nameKey: 'mathWizard', condition: (p) => p.subjects.math.stars >= 50 },
    { id: 'englishStar', icon: '📖', nameKey: 'englishStar', condition: (p) => p.subjects.english.stars >= 50 },
    { id: 'assameseHero', icon: '🅰️', nameKey: 'assameseHero', condition: (p) => p.subjects.assamese.stars >= 50 },
    { id: 'natureExplorer', icon: '🌿', nameKey: 'natureExplorer', condition: (p) => p.subjects.evs.stars >= 50 },
    { id: 'dailyChamp', icon: '🏅', nameKey: 'dailyChamp', condition: (p) => p.dailyChallenge.completed >= 1 }
];

// Game Database
const gamesDB = [
    {
        id: 'numberMatch',
        title: 'Number Match',
        titleAs: 'সংখ্যা মিল',
        titleHi: 'नंबर मैच',
        description: 'Match numbers and learn counting',
        descriptionAs: 'সংখ্যা মিলাও আৰু গণনা শিকক',
        descriptionHi: 'संख्याएं मिलाएं और गिनती सीखें',
        subject: 'math',
        category: 'puzzle',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: '🔢'
    },
    {
        id: 'wordPuzzle',
        title: 'Word Puzzle',
        titleAs: 'শব্দ পাজল',
        titleHi: 'शब्द पहेली',
        description: 'Find hidden words',
        descriptionAs: 'লুকান শব্দ বিচাৰক',
        descriptionHi: 'छिपे शब्द खोजें',
        subject: 'english',
        category: 'puzzle',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: '📝'
    },
    {
        id: 'assameseAlpha',
        title: 'Assamese Alphabet',
        titleAs: 'অসমীয়া বৰ্ণমালা',
        titleHi: 'असमी वर्णमाला',
        description: 'Master Assamese alphabet',
        descriptionAs: 'অসমীয়া বৰ্ণমালা আয়ত্ত কৰক',
        descriptionHi: 'असमी वर्णमाला में महारत हासिल करें',
        subject: 'assamese',
        category: 'learning',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: 'অ'
    },
    {
        id: 'animalWorld',
        title: 'Animal World',
        titleAs: 'প্ৰাণী জগৎ',
        titleHi: 'जानवरों की दुनिया',
        description: 'Learn about animals',
        descriptionAs: 'প্ৰাণী সম্পৰ্কে শিকক',
        descriptionHi: 'जानवरों के बारे में सीखें',
        subject: 'evs',
        category: 'quiz',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: '🐘'
    },
    {
        id: 'shapeSorter',
        title: 'Shape Sorter',
        titleAs: 'আকৃতি বাছক',
        titleHi: 'आकृति चुनें',
        description: 'Sort shapes and colors',
        descriptionAs: 'আকৃতি আৰু ৰং বাছক',
        descriptionHi: 'आकृतियां और रंग चुनें',
        subject: 'math',
        category: 'puzzle',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: '⭕'
    },
    {
        id: 'mathAdventure',
        title: 'Math Adventure',
        titleAs: 'গণিত অভিযান',
        titleHi: 'गणित साहसिक',
        description: 'Solve math problems to win',
        descriptionAs: 'গণিত সমাধান কৰি জয়ী হওক',
        descriptionHi: 'गणित की समस्याएं हल करें और जीतें',
        subject: 'math',
        category: 'adventure',
        difficulty: 'medium',
        minAge: 7,
        levels: 15,
        emoji: '🧮'
    },
    {
        id: 'readAndMatch',
        title: 'Read & Match',
        titleAs: 'পঢ়ক আৰু মিলাও',
        titleHi: 'पढ़ें और मिलाएं',
        description: 'Match words with pictures',
        descriptionAs: 'শব্দ ছবিৰ সৈতে মিলাও',
        descriptionHi: 'शब्दों को चित्रों से मिलाएं',
        subject: 'english',
        category: 'learning',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: '📖'
    },
    {
        id: 'assamQuiz',
        title: 'Assam Quiz',
        titleAs: 'আসাম কুইজ',
        titleHi: 'असम क्विज़',
        description: 'Test your knowledge about Assam',
        descriptionAs: 'আসম সম্পৰ্কে আপোনাৰ জ্ঞান পৰীক্ষা কৰক',
        descriptionHi: 'असम के बारे में अपना ज्ञान जांचें',
        subject: 'evs',
        category: 'quiz',
        difficulty: 'medium',
        minAge: 7,
        levels: 10,
        emoji: '🏛️'
    },
    {
        id: 'memoryGame',
        title: 'Memory Match',
        titleAs: 'স্মৃতি মিল',
        titleHi: 'याददाश्त मैच',
        description: 'Find matching pairs',
        descriptionAs: 'মিলে পোৱা যোৰ বিচাৰক',
        descriptionHi: 'मिलते जोड़े खोजें',
        subject: 'evs',
        category: 'puzzle',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: '🧠'
    },
    {
        id: 'countingFun',
        title: 'Counting Fun',
        titleAs: 'গণনা মজা',
        titleHi: 'गिनती का मज़ा',
        description: 'Count objects and learn numbers',
        descriptionAs: 'বস্তু গণনা কৰক আৰু সংখ্যা শিকক',
        descriptionHi: 'वस्तुओं को गिनें और संख्याएं सीखें',
        subject: 'math',
        category: 'learning',
        difficulty: 'easy',
        minAge: 6,
        levels: 10,
        emoji: '🔟'
    }
];

// ==========================================================================
// Sound System
// ==========================================================================

const SoundSystem = {
    enabled: true,
    audioContext: null,

    init() {
        const saved = localStorage.getItem('soundEnabled');
        if (saved !== null) {
            this.enabled = saved === 'true';
        }
        this.updateToggleButton();
    },

    play(type) {
        if (!this.enabled) return;
        
        try {
            if (!this.audioContext) {
                this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            
            const ctx = this.audioContext;
            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);
            
            const frequencies = {
                correct: 523.25,
                wrong: 200,
                levelComplete: 659.25,
                click: 440,
                success: 783.99,
                badge: 880
            };
            
            const durations = {
                correct: 0.15,
                wrong: 0.3,
                levelComplete: 0.4,
                click: 0.05,
                success: 0.3,
                badge: 0.2
            };
            
            oscillator.frequency.value = frequencies[type] || 440;
            oscillator.type = type === 'wrong' ? 'sawtooth' : 'sine';
            
            gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + (durations[type] || 0.1));
            
            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + (durations[type] || 0.1));
        } catch (e) {
            console.log('Audio not supported');
        }
    },

    toggle() {
        this.enabled = !this.enabled;
        localStorage.setItem('soundEnabled', this.enabled);
        this.updateToggleButton();
    },

    updateToggleButton() {
        const btn = document.getElementById('soundToggleBtn');
        if (btn) {
            btn.textContent = this.enabled ? '🔊' : '🔇';
            btn.classList.toggle('sound-off', !this.enabled);
        }
    }
};

// ==========================================================================
// Confetti System
// ==========================================================================

const ConfettiSystem = {
    colors: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FFEAA7', '#DDA0DD', '#98D8C8', '#F7DC6F'],
    container: null,

    init() {
        this.container = document.getElementById('confettiContainer');
    },

    fire() {
        if (!this.container) return;
        
        const isLowData = localStorage.getItem('lowDataMode') === 'true';
        if (isLowData) return;

        for (let i = 0; i < 50; i++) {
            setTimeout(() => this.createPiece(), i * 20);
        }
    },

    createPiece() {
        if (!this.container) return;

        const piece = document.createElement('div');
        piece.className = 'confetti-piece';
        piece.style.left = Math.random() * 100 + '%';
        piece.style.backgroundColor = this.colors[Math.floor(Math.random() * this.colors.length)];
        piece.style.animationDuration = (Math.random() * 2 + 2) + 's';
        piece.style.transform = `rotate(${Math.random() * 360}deg)`;
        
        const shapes = ['50%', '0%'];
        piece.style.borderRadius = shapes[Math.floor(Math.random() * shapes.length)];

        this.container.appendChild(piece);

        setTimeout(() => piece.remove(), 4000);
    }
};

// ==========================================================================
// State Management
// ==========================================================================

const state = {
    currentLang: CONFIG.defaultLang,
    currentSection: 'home',
    currentGame: null,
    userProgress: {
        playerName: '',
        avatar: '👤',
        totalStars: 0,
        gamesPlayed: 0,
        badges: [],
        subjects: {
            math: { stars: 0, gamesPlayed: 0, level: 1 },
            english: { stars: 0, gamesPlayed: 0, level: 1 },
            assamese: { stars: 0, gamesPlayed: 0, level: 1 },
            evs: { stars: 0, gamesPlayed: 0, level: 1 }
        },
        dailyChallenge: {
            completed: 0,
            target: 3,
            lastPlayed: null,
            dateCompleted: null
        },
        streak: {
            current: 0,
            best: 0,
            lastDate: null
        }
    },
    settings: {
        soundEnabled: true,
        lowDataMode: false,
        darkMode: false
    }
};

// ==========================================================================
// Utility Functions
// ==========================================================================

function t(key, replacements = {}) {
    const langData = translations[state.currentLang] || translations.en;
    let text = langData[key] || translations.en[key] || key;
    
    Object.keys(replacements).forEach(param => {
        text = text.replace(`{${param}}`, replacements[param]);
    });
    
    return text;
}

function saveState() {
    try {
        localStorage.setItem(CONFIG.storageKey, JSON.stringify(state.userProgress));
    } catch (e) {
        console.warn('Could not save state:', e);
    }
}

function loadState() {
    try {
        const saved = localStorage.getItem(CONFIG.storageKey);
        if (saved) {
            const parsed = JSON.parse(saved);
            state.userProgress = { ...state.userProgress, ...parsed };
            
            if (parsed.playerName) {
                state.userProgress.playerName = parsed.playerName;
            }
            if (parsed.avatar) {
                state.userProgress.avatar = parsed.avatar;
            }
        }
    } catch (e) {
        console.warn('Could not load state:', e);
    }
}

function loadSettings() {
    try {
        const sound = localStorage.getItem('soundEnabled');
        if (sound !== null) state.settings.soundEnabled = sound === 'true';
        
        const lowData = localStorage.getItem('lowDataMode');
        if (lowData !== null) state.settings.lowDataMode = lowData === 'true';
        
        const dark = localStorage.getItem('darkMode');
        if (dark !== null) state.settings.darkMode = dark === 'true';
        
        applySettings();
    } catch (e) {
        console.warn('Could not load settings:', e);
    }
}

function applySettings() {
    const app = document.getElementById('app');
    
    if (state.settings.lowDataMode) {
        app.classList.add('low-data');
    } else {
        app.classList.remove('low-data');
    }
    
    if (state.settings.darkMode) {
        app.classList.add('dark-mode');
        document.body.classList.add('dark-mode');
    } else {
        app.classList.remove('dark-mode');
        document.body.classList.remove('dark-mode');
    }
    
    SoundSystem.enabled = state.settings.soundEnabled;
}

function showToast(message, type = 'info') {
    const container = document.getElementById('toastContainer');
    if (!container) return;
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    
    const icons = {
        success: '✅',
        error: '❌',
        info: 'ℹ️'
    };
    
    toast.innerHTML = `
        <span class="toast-icon">${icons[type]}</span>
        <span class="toast-message">${message}</span>
    `;
    
    container.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ==========================================================================
// Language Management
// ==========================================================================

function setLanguage(lang) {
    if (!CONFIG.languages.includes(lang)) {
        lang = CONFIG.defaultLang;
    }
    
    state.currentLang = lang;
    localStorage.setItem('assamKidsLang', lang);
    
    document.querySelectorAll('.lang-setting').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
    
    updateUI();
}

function updateUI() {
    const progress = state.userProgress;
    const hasName = progress.playerName && progress.playerName.trim().length > 0;
    
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        let translated = t(key);
        
        if (key === 'welcomeTitle' && hasName) {
            translated = t('welcomeName', { name: progress.playerName });
        }
        
        if (translated) {
            el.textContent = translated;
        }
    });
    
    document.querySelectorAll('.game-card').forEach(card => {
        const gameId = card.dataset.game;
        const game = gamesDB.find(g => g.id === gameId);
        if (game) {
            const titleKey = `title${state.currentLang.charAt(0).toUpperCase() + state.currentLang.slice(1)}`;
            const descKey = `description${state.currentLang.charAt(0).toUpperCase() + state.currentLang.slice(1)}`;
            
            const titleEl = card.querySelector('h4');
            const descEl = card.querySelector('p');
            
            if (titleEl && game[titleKey]) titleEl.textContent = game[titleKey];
            if (descEl && game[descKey]) descEl.textContent = game[descKey];
        }
    });
    
    updateProgressDisplay();
    updateBadgesDisplay();
    updateStreakDisplay();
}

// ==========================================================================
// Navigation
// ==========================================================================

function showSection(sectionId) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href') === `#${sectionId}`) {
            item.classList.add('active');
        }
    });
    
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    
    let targetSection = document.getElementById(`${sectionId}Section`);
    if (!targetSection) {
        targetSection = document.getElementById(sectionId);
    }
    
    if (targetSection) {
        targetSection.classList.add('active');
    }
    
    state.currentSection = sectionId;
    
    window.scrollTo(0, 0);
}

function openSidebar() {
    document.getElementById('sidebar').classList.add('active');
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.add('active');
}

function closeSidebar() {
    document.getElementById('sidebar').classList.remove('active');
    const overlay = document.getElementById('sidebarOverlay');
    if (overlay) overlay.classList.remove('active');
}

// ==========================================================================
// Progress Tracking
// ==========================================================================

function updateProgressDisplay() {
    const progress = state.userProgress;
    
    document.getElementById('totalStars').textContent = progress.totalStars;
    document.getElementById('gamesPlayed').textContent = progress.gamesPlayed;
    document.getElementById('badgesEarned').textContent = progress.badges.length;
    
    Object.keys(progress.subjects).forEach(subject => {
        const subjectData = progress.subjects[subject];
        const maxStars = 100;
        const percentage = Math.min((subjectData.stars / maxStars) * 100, 100);
        
        const progressFill = document.querySelector(`.progress-fill[data-subject="${subject}"]`);
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }
        
        const progressPercent = progressFill?.closest('.progress-item')?.querySelector('.progress-percent');
        if (progressPercent) {
            progressPercent.textContent = `${Math.round(percentage)}%`;
        }
        
        const starsEl = document.querySelector(`.subject-card[data-subject="${subject}"] .stars`);
        if (starsEl) {
            starsEl.textContent = `⭐ ${subjectData.stars}`;
        }
    });
    
    const challengeProgress = progress.dailyChallenge;
    const progressFill = document.querySelector('.challenge-progress .progress-fill');
    const progressText = document.querySelector('.challenge-progress .progress-text');
    
    if (progressFill) {
        const percentage = (challengeProgress.completed / challengeProgress.target) * 100;
        progressFill.style.width = `${percentage}%`;
    }
    
    if (progressText) {
        progressText.textContent = `${challengeProgress.completed}/${challengeProgress.target}`;
    }
}

function updateBadgesDisplay() {
    const container = document.getElementById('badgesGrid');
    if (!container) return;
    
    const progress = state.userProgress;
    
    container.innerHTML = badgesDB.map(badge => {
        const earned = progress.badges.includes(badge.id) || badge.condition(progress);
        const name = t(badge.nameKey);
        
        return `
            <div class="badge-item ${earned ? '' : 'locked'}">
                <span class="badge-icon">${badge.icon}</span>
                <span class="badge-name">${name}</span>
            </div>
        `;
    }).join('');
}

function addStars(amount, subject) {
    state.userProgress.totalStars += amount;
    state.userProgress.subjects[subject].stars += amount;
    saveState();
    updateProgressDisplay();
    checkBadges();
}

function updateStreak() {
    const today = new Date().toDateString();
    const yesterday = new Date(Date.now() - 86400000).toDateString();
    const streak = state.userProgress.streak;

    if (streak.lastDate === today) return; // already counted today

    if (streak.lastDate === yesterday) {
        streak.current += 1;
    } else {
        streak.current = 1; // broke streak or first ever
    }

    streak.best = Math.max(streak.best, streak.current);
    streak.lastDate = today;

    updateStreakDisplay();
    saveState();

    if (streak.current > 1) {
        showToast(`🔥 ${streak.current} day streak!`, 'success');
    }
}

function updateStreakDisplay() {
    const el = document.getElementById('streakDisplay');
    if (el) {
        const s = state.userProgress.streak;
        el.textContent = `🔥 ${s.current} day streak`;
        el.title = `Best streak: ${s.best} days`;
    }
}

function incrementGamesPlayed(subject) {
    state.userProgress.gamesPlayed += 1;
    state.userProgress.subjects[subject].gamesPlayed += 1;
    updateStreak();
    
    if (subject === 'math') {
        const today = new Date().toDateString();
        const dc = state.userProgress.dailyChallenge;

        // Reset counter at the start of each new day
        if (dc.lastPlayed !== today) {
            dc.completed = 0;
            dc.dateCompleted = null;
            dc.lastPlayed = today;
        }

        dc.completed += 1;

        // Award bonus exactly once when target is reached today
        if (dc.completed === dc.target) {
            dc.dateCompleted = today;
            SoundSystem.play('success');
            ConfettiSystem.fire();
            showToast(t('dailyChallengeComplete') + ' +5 Stars', 'success');
            addStars(5, 'math');
        }
    }
    
    saveState();
    updateProgressDisplay();
    checkBadges();
}

function checkBadges() {
    const progress = state.userProgress;
    let earnedNew = false;
    
    for (const badge of badgesDB) {
        if (!progress.badges.includes(badge.id) && badge.condition(progress)) {
            progress.badges.push(badge.id);
            showToast(`${badge.icon} ${t(badge.nameKey)}`, 'success');
            earnedNew = true;
        }
    }
    
    if (earnedNew) {
        saveState();
        updateBadgesDisplay();
        
        SoundSystem.play('badge');
        ConfettiSystem.fire();
    }
}

// ==========================================================================
// Game System
// ==========================================================================

function openGame(gameId) {
    const game = gamesDB.find(g => g.id === gameId);
    if (!game) return;
    
    state.currentGame = { ...game, score: 0, level: 1 };
    
    const titleKey = `title${state.currentLang.charAt(0).toUpperCase() + state.currentLang.slice(1)}`;
    document.getElementById('gameTitle').textContent = game[titleKey] || game.title;
    document.getElementById('gameScore').textContent = '⭐ 0';
    document.getElementById('gameLevel').textContent = 'Level 1';
    
    document.getElementById('gameContainer').classList.add('active');
    document.getElementById('app').classList.add('game-active');
    
    loadGame(game);
}

function closeGame() {
    // Clean up any active game timers
    if (typeof window._mathAdventureCleanup === 'function') {
        window._mathAdventureCleanup();
        window._mathAdventureCleanup = null;
    }
    state.currentGame = null;
    document.getElementById('gameContainer').classList.remove('active');
    document.getElementById('app').classList.remove('game-active');
    document.getElementById('gameCanvas').innerHTML = '';
}

function loadGame(game) {
    const canvas = document.getElementById('gameCanvas');
    canvas.innerHTML = '';
    
    switch (game.id) {
        case 'numberMatch':
            renderNumberMatchGame(canvas, game);
            break;
        case 'wordPuzzle':
            renderWordPuzzleGame(canvas, game);
            break;
        case 'assameseAlpha':
            renderAssameseGame(canvas, game);
            break;
        case 'animalWorld':
            renderAnimalWorldGame(canvas, game);
            break;
        case 'shapeSorter':
            renderShapeSorterGame(canvas, game);
            break;
        case 'mathAdventure':
            renderMathAdventureGame(canvas, game);
            break;
        case 'readAndMatch':
            renderReadAndMatchGame(canvas, game);
            break;
        case 'assamQuiz':
            renderAssamQuizGame(canvas, game);
            break;
        case 'memoryGame':
            renderMemoryGame(canvas, game);
            break;
        case 'countingFun':
            renderCountingFunGame(canvas, game);
            break;
        default:
            renderGenericGame(canvas, game);
    }
}

function showGameCompleteModal(stars, score) {
    const modal = document.getElementById('gameCompleteModal');
    const starsContainer = document.getElementById('starsEarned');
    
    document.getElementById('completionStars').textContent = '+' + stars;
    document.getElementById('completionScore').textContent = score;
    
    starsContainer.innerHTML = '';
    for (let i = 0; i < 3; i++) {
        const star = document.createElement('span');
        star.className = 'star' + (i < Math.ceil(stars / 10) ? ' earned' : '');
        star.textContent = '⭐';
        starsContainer.appendChild(star);
    }
    
    modal.classList.add('active');
    
    setTimeout(() => {
        ConfettiSystem.fire();
    }, 300);
}

function hideGameCompleteModal() {
    document.getElementById('gameCompleteModal').classList.remove('active');
}

// ==========================================================================
// Game Renderers
// ==========================================================================

function renderNumberMatchGame(container, game) {
    let score = 0;
    let level = 1;
    let correctMatches = 0;
    const targetMatches = 5 + level;
    
    const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    const selectedNumbers = numbers.slice(0, 5 + level);
    const numberPairs = [...selectedNumbers, ...selectedNumbers];
    
    // Shuffle
    for (let i = numberPairs.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [numberPairs[i], numberPairs[j]] = [numberPairs[j], numberPairs[i]];
    }
    
    let selectedCards = [];
    let matchedPairs = [];
    
    const gameHTML = `
        <div class="game-area">
            <div class="game-instructions">
                <p>${t('matchNumbers') || 'Match the same numbers!'}</p>
            </div>
            <div class="number-grid">
                ${numberPairs.map((num, idx) => `
                    <button class="number-card ${selectedCards.includes(idx) ? 'selected' : ''} ${matchedPairs.includes(num) ? 'matched' : ''}" 
                            data-number="${num}" data-index="${idx}" ${matchedPairs.includes(num) ? 'disabled' : ''}>
                        ${matchedPairs.includes(num) ? '✓' : num}
                    </button>
                `).join('')}
            </div>
            <div class="game-status">
                <span class="game-score">⭐ ${score}</span>
                <span class="game-level">Level ${level}</span>
            </div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    // Add styles for game
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .game-instructions { margin-bottom: 1.5rem; color: #666; }
        .number-grid { 
            display: grid; 
            grid-template-columns: repeat(4, 1fr); 
            gap: 0.75rem; 
            margin-bottom: 1.5rem;
        }
        .number-card {
            aspect-ratio: 1;
            border: none;
            border-radius: 12px;
            background: linear-gradient(135deg, #2196F3, #1976D2);
            color: white;
            font-size: 1.5rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s, background 0.2s;
        }
        .number-card:hover:not(:disabled) { transform: scale(1.05); }
        .number-card.selected { 
            background: linear-gradient(135deg, #FF9800, #F57C00); 
            transform: scale(1.1);
        }
        .number-card.matched { 
            background: linear-gradient(135deg, #4CAF50, #388E3C); 
        }
        .number-card:disabled { cursor: not-allowed; }
        .game-status { 
            display: flex; 
            justify-content: space-between; 
            padding: 1rem;
            background: white;
            border-radius: 12px;
            font-weight: 700;
        }
    `;
    container.appendChild(style);
    
    // Add click handlers
    container.querySelectorAll('.number-card').forEach(card => {
        card.addEventListener('click', () => {
            const index = parseInt(card.dataset.index);
            const number = parseInt(card.dataset.number);
            
            if (selectedCards.includes(index) || matchedPairs.includes(number)) return;
            
            selectedCards.push(index);
            card.classList.add('selected');
            
            if (selectedCards.length === 2) {
                const card1 = container.querySelector(`[data-index="${selectedCards[0]}"]`);
                const card2 = container.querySelector(`[data-index="${selectedCards[1]}"]`);
                
                const num1 = parseInt(card1.dataset.number);
                const num2 = parseInt(card2.dataset.number);
                
                if (num1 === num2) {
                    // Match!
                    matchedPairs.push(num1);
                    card1.classList.add('matched');
                    card2.classList.add('matched');
                    card1.disabled = true;
                    card2.disabled = true;
                    score += 10;
                    correctMatches++;
                    
                    document.getElementById('gameScore').textContent = `⭐ ${score}`;
                    
                    if (correctMatches >= targetMatches) {
                        setTimeout(() => {
                            showToast('🎉 Level Complete! +' + (level * 10) + ' Stars', 'success');
                            addStars(level * 10, 'math');
                            incrementGamesPlayed('math');
                            showGameCompleteModal(level * 10, score);
                        }, 500);
                    }
                } else {
                    // No match
                    setTimeout(() => {
                        card1.classList.remove('selected');
                        card2.classList.remove('selected');
                    }, 500);
                }
                
                selectedCards = [];
            }
        });
    });
}

function renderWordPuzzleGame(container, game) {
    const words = ['CAT', 'DOG', 'SUN', 'TOP', 'PEN', 'CUP'];
    const selectedWords = words.slice(0, 4);
    
    let score = 0;
    let foundWords = [];
    let selectedCells = [];
    
    const gameHTML = `
        <div class="game-area">
            <div class="game-instructions">
                <p>${t('findWords')}</p>
            </div>
            <div class="word-search-grid" id="wordGrid">
                ${generateWordSearchGrid(selectedWords)}
            </div>
            <div class="word-list">
                ${selectedWords.map(word => `
                    <span class="word-item ${foundWords.includes(word) ? 'found' : ''}" data-word="${word}">${word}</span>
                `).join('')}
            </div>
            <div class="game-status">
                <span class="game-score">⭐ <span id="wordScore">0</span></span>
            </div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .word-search-grid {
            display: grid;
            grid-template-columns: repeat(8, 1fr);
            gap: 3px;
            margin-bottom: 1.5rem;
            background: #E3F2FD;
            padding: 0.75rem;
            border-radius: 12px;
            touch-action: manipulation;
        }
        .letter-cell {
            width: 36px;
            height: 36px;
            display: flex;
            align-items: center;
            justify-content: center;
            background: white;
            border-radius: 6px;
            font-weight: 700;
            font-size: 1rem;
            cursor: pointer;
            user-select: none;
            transition: all 0.15s ease;
        }
        .letter-cell:active { transform: scale(0.95); }
        .letter-cell.selected { background: #FF9800; color: white; transform: scale(1.05); }
        .letter-cell.found { background: #4CAF50; color: white; transform: scale(0.98); }
        .letter-cell.wrong { background: #F44336; color: white; animation: shake 0.3s; }
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            25% { transform: translateX(-4px); }
            75% { transform: translateX(4px); }
        }
        .word-list {
            display: flex;
            flex-wrap: wrap;
            gap: 0.5rem;
            justify-content: center;
            margin-bottom: 1rem;
        }
        .word-item {
            padding: 0.5rem 1rem;
            background: white;
            border-radius: 20px;
            font-weight: 600;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            transition: all 0.3s ease;
        }
        .word-item.found {
            background: #4CAF50;
            color: white;
            text-decoration: line-through;
            transform: scale(1.1);
        }
        @media (max-width: 400px) {
            .letter-cell { width: 32px; height: 32px; font-size: 0.9rem; }
        }
    `;
    container.appendChild(style);
    
    const gridEl = container.querySelector('#wordGrid');
    const scoreEl = container.querySelector('#wordScore');
    
    gridEl.addEventListener('click', (e) => {
        const cell = e.target.closest('.letter-cell');
        if (!cell || cell.classList.contains('found')) return;
        
        const idx = parseInt(cell.dataset.index);
        
        if (selectedCells.includes(idx)) {
            cell.classList.remove('selected');
            selectedCells = selectedCells.filter(i => i !== idx);
            return;
        }
        
        selectedCells.push(idx);
        cell.classList.add('selected');
        
        if (selectedCells.length >= 3) {
            checkSelectedWord();
        }
    });
    
    function checkSelectedWord() {
        const selectedLetters = selectedCells.map(idx => {
            return gridEl.querySelector(`[data-index="${idx}"]`).textContent;
        }).join('');
        
        const reversed = selectedLetters.split('').reverse().join('');
        
        let found = null;
        for (const word of selectedWords) {
            if (selectedLetters === word || reversed === word) {
                found = word;
                break;
            }
        }
        
        if (found && !foundWords.includes(found)) {
            foundWords.push(found);
            score += 10;
            scoreEl.textContent = score;
            
            selectedCells.forEach(idx => {
                gridEl.querySelector(`[data-index="${idx}"]`).classList.add('found');
            });
            
            document.querySelector(`[data-word="${found}"]`).classList.add('found');
            
            SoundSystem.play('correct');
            
            if (foundWords.length === selectedWords.length) {
                setTimeout(() => {
                    document.getElementById('gameScore').textContent = `⭐ ${score}`;
                    addStars(score, 'english');
                    incrementGamesPlayed('english');
                    showGameCompleteModal(score, state.userProgress.totalStars + score);
                }, 500);
            }
        } else if (selectedCells.length >= 3) {
            selectedCells.forEach(idx => {
                const cell = gridEl.querySelector(`[data-index="${idx}"]`);
                cell.classList.add('wrong');
                setTimeout(() => cell.classList.remove('wrong'), 300);
            });
            SoundSystem.play('wrong');
        }
        
        selectedCells = [];
        gridEl.querySelectorAll('.letter-cell.selected').forEach(cell => {
            cell.classList.remove('selected');
        });
    }
}

function generateWordSearchGrid(words) {
    const gridSize = 8;
    const grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(''));
    const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    
    words.forEach((word) => {
        let placed = false;
        let attempts = 0;
        
        while (!placed && attempts < 100) {
            attempts++;
            const isVertical = Math.random() > 0.5;
            const r = Math.floor(Math.random() * (isVertical ? (gridSize - word.length + 1) : gridSize));
            const c = Math.floor(Math.random() * (isVertical ? gridSize : (gridSize - word.length + 1)));
            
            let possible = true;
            for (let i = 0; i < word.length; i++) {
                const char = isVertical ? grid[r + i][c] : grid[r][c + i];
                if (char !== '' && char !== word[i]) {
                    possible = false;
                    break;
                }
            }
            
            if (possible) {
                for (let i = 0; i < word.length; i++) {
                    if (isVertical) grid[r + i][c] = word[i];
                    else grid[r][c + i] = word[i];
                }
                placed = true;
            }
        }
    });
    
    // Fill remaining
    for (let r = 0; r < gridSize; r++) {
        for (let c = 0; c < gridSize; c++) {
            if (!grid[r][c]) {
                grid[r][c] = letters[Math.floor(Math.random() * letters.length)];
            }
        }
    }
    
    let index = 0;
    return grid.map((row, rIdx) => 
        row.map((letter, cIdx) => 
            `<div class="letter-cell" data-index="${index++}" data-row="${rIdx}" data-col="${cIdx}">${letter}</div>`
        ).join('')
    ).join('');
}

function renderAssameseGame(container, game) {
    const assameseVowels = ['অ', 'আ', 'ই', 'ঊ', 'ঋ', 'এ', 'ঐ', 'ও', 'ঔ'];
    const assameseConsonants = ['ক', 'খ', 'গ', 'ঘ', 'ঙ', 'চ', 'ছ', 'জ', 'ঝ', 'ঞ', 'ট', 'ঠ', 'ড', 'ঢ', 'ণ', 'ত', 'থ', 'দ', 'ধ', 'ন', 'প', 'ফ', 'ব', 'ভ', 'ম', 'য', 'ৰ', 'ল', 'ৱ', 'শ', 'ষ', 'স', 'হ'];
    
    const allChars = [...assameseVowels, ...assameseConsonants.slice(0, 8)];
    let currentTarget = '';
    let score = 0;
    let round = 0;
    const totalRounds = 10;
    
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }
    
    function getRandomChars(arr, count) {
        const shuffled = shuffleArray([...arr]);
        return shuffled.slice(0, count);
    }
    
    function nextRound() {
        if (round >= totalRounds) {
            addStars(score, 'assamese');
            incrementGamesPlayed('assamese');
            showGameCompleteModal(score, score);
            return;
        }
        
        const displayChars = getRandomChars(allChars, 8);
        currentTarget = displayChars[Math.floor(Math.random() * displayChars.length)];
        
        const questionText = state.currentLang === 'as' ? 'এই আখৰটো বিচাৰক:' : 
                            state.currentLang === 'hi' ? 'इस अक्षर को खोजें:' : 
                            'Find this letter:';
        
        const gameArea = container.querySelector('.game-area');
        gameArea.innerHTML = `
            <div class="game-instructions">
                <p>${questionText}</p>
                <div class="target-letter">${currentTarget}</div>
            </div>
            <div class="assamese-grid">
                ${displayChars.map((char, idx) => `
                    <button class="assamese-card" data-char="${char}" data-idx="${idx}">
                        ${char}
                    </button>
                `).join('')}
            </div>
            <div class="game-status">
                <span class="game-score">⭐ ${score}</span>
                <span class="game-round">${round + 1}/${totalRounds}</span>
            </div>
        `;
        
        container.querySelectorAll('.assamese-card').forEach(card => {
            card.addEventListener('click', () => {
                const clickedChar = card.dataset.char;
                
                if (clickedChar === currentTarget) {
                    score += 10;
                    SoundSystem.play('correct');
                    showToast(t('correct'), 'success');
                } else {
                    SoundSystem.play('wrong');
                    showToast(t('tryAgain'), 'error');
                    return;
                }
                
                round++;
                document.getElementById('gameScore').textContent = `⭐ ${score}`;
                nextRound();
            });
        });
    }
    
    const gameHTML = `
        <div class="game-area">
            <div class="game-instructions">
                <p>Loading...</p>
            </div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .target-letter {
            font-size: 4rem;
            font-weight: 800;
            color: #FF9800;
            margin: 1rem 0 2rem;
            padding: 1rem 2rem;
            background: white;
            border-radius: 16px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            display: inline-block;
        }
        .assamese-grid {
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 1rem;
            margin-bottom: 1.5rem;
        }
        .assamese-card {
            aspect-ratio: 1;
            border: none;
            border-radius: 16px;
            background: linear-gradient(135deg, #FF9800, #F57C00);
            color: white;
            font-size: 2.5rem;
            font-weight: 700;
            cursor: pointer;
            transition: transform 0.2s;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
        }
        .assamese-card:hover { transform: scale(1.05); }
        .assamese-card.correct {
            background: linear-gradient(135deg, #4CAF50, #388E3C);
        }
        .assamese-card.wrong {
            background: linear-gradient(135deg, #F44336, #D32F2F);
        }
        .game-status { 
            display: flex; 
            justify-content: space-between; 
            padding: 1rem;
            background: white;
            border-radius: 12px;
            font-weight: 700;
        }
    `;
    container.appendChild(style);
    
    nextRound();
}

function renderAnimalWorldGame(container, game) {
    const animals = [
        { name: 'Elephant', nameAs: 'হাতী', nameHi: 'हाथी', emoji: '🐘', habitat: 'Forest' },
        { name: 'Tiger', nameAs: 'বাঘ', nameHi: 'बाघ', emoji: '🐅', habitat: 'Forest' },
        { name: 'Dolphin', nameAs: 'শুশুক', nameHi: 'डॉल्फिन', emoji: '🐬', habitat: 'Water' },
        { name: 'Peacock', nameAs: 'ময়ূৰ', nameHi: 'मोर', emoji: '🦚', habitat: 'Land' },
        { name: 'Rhino', nameAs: 'গঁড়', nameHi: 'गेंडा', emoji: '🦏', habitat: 'Forest' }
    ];
    
    let currentAnimal = 0;
    let score = 0;
    let revealed = 0;

    const gameHTML = `
        <div class="game-area">
            <div class="animal-card">
                <div class="animal-emoji">${animals[currentAnimal].emoji}</div>
                <div class="animal-question">
                    <p>What is this animal called?</p>
                    <p class="hint">(Tap to reveal answer)</p>
                </div>
                <button class="reveal-btn">Show Answer</button>
                <div class="animal-answer" style="display: none;">
                    <h3>${animals[currentAnimal].name}</h3>
                    <p>${animals[currentAnimal].nameAs} | ${animals[currentAnimal].nameHi}</p>
                    <p>Habitat: ${animals[currentAnimal].habitat}</p>
                </div>
            </div>
            <div class="animal-nav">
                <button class="nav-btn" id="prevAnimal">← Previous</button>
                <button class="nav-btn" id="nextAnimal">Next →</button>
            </div>
            <div class="game-status">
                <span class="game-score">⭐ ${score}</span>
            </div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .animal-card {
            background: white;
            border-radius: 20px;
            padding: 2rem;
            margin-bottom: 1.5rem;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .animal-emoji { font-size: 6rem; margin-bottom: 1rem; }
        .animal-question p { margin: 0.5rem 0; }
        .hint { font-size: 0.85rem; color: #999; }
        .reveal-btn {
            background: #2196F3;
            color: white;
            border: none;
            padding: 0.75rem 2rem;
            border-radius: 25px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            margin: 1rem 0;
        }
        .animal-answer h3 { color: #2196F3; margin-bottom: 0.5rem; }
        .animal-nav {
            display: flex;
            justify-content: center;
            gap: 1rem;
        }
        .nav-btn {
            background: white;
            border: 2px solid #E0E0E0;
            padding: 0.5rem 1rem;
            border-radius: 20px;
            font-weight: 600;
            cursor: pointer;
        }
        .nav-btn:hover { background: #F5F5F5; }
    `;
    container.appendChild(style);
    
    const revealBtn = container.querySelector('.reveal-btn');
    const answerDiv = container.querySelector('.animal-answer');
    
    revealBtn.addEventListener('click', () => {
        answerDiv.style.display = 'block';
        revealBtn.style.display = 'none';
        score += 10;
        revealed++;
        document.getElementById('gameScore').textContent = `⭐ ${score}`;
        SoundSystem.play('correct');

        // Award stars and count game played only once — after all animals are seen
        if (revealed === animals.length) {
            setTimeout(() => {
                addStars(score, 'evs');
                incrementGamesPlayed('evs');
                showGameCompleteModal(score, score);
            }, 600);
        }
    });
    
    container.querySelector('#nextAnimal').addEventListener('click', () => {
        currentAnimal = (currentAnimal + 1) % animals.length;
        updateAnimalDisplay();
    });
    
    container.querySelector('#prevAnimal').addEventListener('click', () => {
        currentAnimal = (currentAnimal - 1 + animals.length) % animals.length;
        updateAnimalDisplay();
    });
    
    function updateAnimalDisplay() {
        container.querySelector('.animal-emoji').textContent = animals[currentAnimal].emoji;
        const answerEl = container.querySelector('.animal-answer');
        answerEl.innerHTML = `
            <h3>${animals[currentAnimal].name}</h3>
            <p>${animals[currentAnimal].nameAs} | ${animals[currentAnimal].nameHi}</p>
            <p>Habitat: ${animals[currentAnimal].habitat}</p>
        `;
        answerDiv.style.display = 'none';
        revealBtn.style.display = 'inline-block';
    }
}

function renderShapeSorterGame(container, game) {
    const shapes = [
        { name: 'Circle', emoji: '⭕', color: '#F44336' },
        { name: 'Square', emoji: '⬜', color: '#2196F3' },
        { name: 'Triangle', emoji: '🔺', color: '#4CAF50' },
        { name: 'Star', emoji: '⭐', color: '#FFD54F' },
        { name: 'Heart', emoji: '❤️', color: '#E91E63' },
        { name: 'Diamond', emoji: '💎', color: '#9C27B0' }
    ];
    
    let score = 0;
    let matched = 0;
    
    const gameHTML = `
        <div class="game-area">
            <div class="shape-target">
                <p>Find the: <strong id="targetShape">Circle</strong></p>
            </div>
            <div class="shapes-grid">
                ${shapes.map((shape, idx) => `
                    <button class="shape-card" data-name="${shape.name}" data-color="${shape.color}">
                        ${shape.emoji}
                    </button>
                `).join('')}
            </div>
            <div class="game-status">
                <span class="game-score">⭐ ${score}</span>
            </div>
        </div>
    `;
    
    container.innerHTML = gameHTML;
    
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .shape-target {
            background: white;
            padding: 1rem;
            border-radius: 12px;
            margin-bottom: 1.5rem;
            font-size: 1.25rem;
        }
        #targetShape { color: #2196F3; }
        .shapes-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 1rem;
        }
        .shape-card {
            aspect-ratio: 1;
            border: none;
            border-radius: 16px;
            background: white;
            font-size: 3rem;
            cursor: pointer;
            transition: transform 0.2s;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        }
        .shape-card:hover { transform: scale(1.1); }
    `;
    container.appendChild(style);
    
    const targetEl = container.querySelector('#targetShape');
    let currentTarget = shapes[Math.floor(Math.random() * shapes.length)].name;
    targetEl.textContent = currentTarget;

    container.querySelectorAll('.shape-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.dataset.name === currentTarget) {
                score += 10;
                matched++;
                document.getElementById('gameScore').textContent = `⭐ ${score}`;
                showToast('✓ Correct!', 'success');
                SoundSystem.play('correct');
                addStars(10, 'math');
                incrementGamesPlayed('math');

                // Pick a new target (different from current if possible)
                let newTarget;
                do {
                    newTarget = shapes[Math.floor(Math.random() * shapes.length)].name;
                } while (newTarget === currentTarget && shapes.length > 1);
                currentTarget = newTarget;
                targetEl.textContent = currentTarget;
            } else {
                showToast('Try again!', 'error');
                SoundSystem.play('wrong');
            }
        });
    });
}

// Math Adventure Game
function renderMathAdventureGame(container, game) {
    let level = 1;
    let score = 0;
    let currentProblem = null;
    let timeLeft = 30;
    let timerInterval = null;
    
    function generateProblem() {
        const operations = ['+', '-'];
        const op = operations[Math.floor(Math.random() * operations.length)];
        const a = Math.floor(Math.random() * 10) + 1;
        const b = Math.floor(Math.random() * 10) + 1;
        
        let answer, question;
        if (op === '+') {
            answer = a + b;
            question = `${a} + ${b} = ?`;
        } else {
            const [big, small] = a >= b ? [a, b] : [b, a];
            answer = big - small;
            question = `${big} - ${small} = ?`;
        }
        
        return { question, answer, options: generateOptions(answer) };
    }
    
    function generateOptions(correct) {
        const options = [correct];
        while (options.length < 4) {
            const num = Math.floor(Math.random() * 20) + 1;
            if (!options.includes(num)) options.push(num);
        }
        return options.sort(() => Math.random() - 0.5);
    }
    
    function startTimer() {
        if (timerInterval) clearInterval(timerInterval);
        timeLeft = Math.max(15, 30 - (level - 1) * 3); // gets harder each level

        timerInterval = setInterval(() => {
            timeLeft--;
            const timerEl = container.querySelector('#adventureTimer');
            if (timerEl) {
                timerEl.textContent = timeLeft;
                timerEl.style.color = timeLeft <= 5 ? '#F44336' : '#333';
            }

            if (timeLeft <= 0) {
                clearInterval(timerInterval);
                SoundSystem.play('wrong');
                addStars(score, 'math');
                incrementGamesPlayed('math');
                showGameCompleteModal(score, score);
            }
        }, 1000);
    }

    function render() {
        currentProblem = generateProblem();

        container.innerHTML = `
            <div class="game-area">
                <div class="adventure-header">
                    <span class="timer-display">⏱ <span id="adventureTimer">${timeLeft}</span>s</span>
                    <span class="level-display">Level ${level}</span>
                </div>
                <div class="problem-display">
                    <h2>${currentProblem.question}</h2>
                </div>
                <div class="options-grid">
                    ${currentProblem.options.map(opt => `
                        <button class="option-btn" data-answer="${opt}">${opt}</button>
                    `).join('')}
                </div>
                <div class="game-status">
                    <span class="game-score">⭐ <span id="adventureScore">${score}</span></span>
                </div>
            </div>
        `;

        const style = document.createElement('style');
        style.textContent = `
            .game-area { text-align: center; width: 100%; max-width: 500px; }
            .adventure-header {
                display: flex; justify-content: space-between; align-items: center;
                background: white; padding: 0.75rem 1rem; border-radius: 12px;
                margin-bottom: 1rem; font-weight: 700;
            }
            .timer-display { font-size: 1.1rem; }
            .level-display { color: #2196F3; }
            .problem-display { background: white; padding: 2rem; border-radius: 16px; margin-bottom: 1.5rem; }
            .problem-display h2 { font-size: 2.5rem; color: #2196F3; }
            .options-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 1rem; }
            .option-btn {
                padding: 1.5rem; font-size: 1.5rem; font-weight: 700; border: none;
                border-radius: 12px; background: white; cursor: pointer;
                box-shadow: 0 4px 8px rgba(0,0,0,0.1); transition: all 0.2s;
            }
            .option-btn:active { transform: scale(0.95); }
            .option-btn:hover { background: #E3F2FD; }
            .option-btn.correct { background: #4CAF50; color: white; }
            .option-btn.wrong { background: #F44336; color: white; }
        `;
        container.appendChild(style);

        startTimer();

        container.querySelectorAll('.option-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selected = parseInt(btn.dataset.answer);
                if (selected === currentProblem.answer) {
                    score += 10 * level;
                    container.querySelector('#adventureScore').textContent = score;
                    SoundSystem.play('correct');
                    btn.classList.add('correct');

                    if (score >= level * 50) {
                        level++;
                    }

                    setTimeout(render, 500);
                } else {
                    SoundSystem.play('wrong');
                    btn.classList.add('wrong');
                }
            });
        });
    }

    // Stop timer when game is closed
    const origClose = window._mathAdventureCleanup;
    window._mathAdventureCleanup = () => {
        if (timerInterval) clearInterval(timerInterval);
        if (origClose) origClose();
    };

    render();
}

// Read & Match Game
function renderReadAndMatchGame(container, game) {
    const pairs = [
        { word: 'CAT', emoji: '🐱' },
        { word: 'DOG', emoji: '🐕' },
        { word: 'SUN', emoji: '☀️' },
        { word: 'TREE', emoji: '🌳' }
    ];
    
    let score = 0;
    let matched = 0;
    
    const items = [...pairs].sort(() => Math.random() - 0.5);
    
    container.innerHTML = `
        <div class="game-area">
            <div class="game-instructions">
                <p>Match words with pictures!</p>
            </div>
            <div class="match-grid" id="matchGrid">
                ${items.map((item, idx) => `
                    <button class="match-card" data-index="${idx}" data-pair="${idx}" data-emoji="${item.emoji}">${item.emoji}</button>
                    <button class="match-card" data-index="${idx + items.length}" data-pair="${idx}" data-word="${item.word}">${item.word}</button>
                `).join('')}
            </div>
            <div class="game-status">
                <span class="game-score">⭐ <span id="matchScore">0</span></span>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .match-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 0.75rem; margin-bottom: 1rem; }
        .match-card {
            padding: 1rem; font-size: 1.5rem; border: 2px solid #E0E0E0;
            border-radius: 12px; background: white; cursor: pointer; transition: all 0.2s;
        }
        .match-card:hover { border-color: #2196F3; transform: scale(1.02); }
        .match-card.selected { border-color: #FF9800; background: #FFF3E0; }
        .match-card.matched { border-color: #4CAF50; background: #E8F5E9; opacity: 0.5; }
    `;
    container.appendChild(style);
    
    let selected = [];
    const scoreEl = container.querySelector('#matchScore');
    
    container.querySelectorAll('.match-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('matched') || selected.includes(card)) return;
            
            card.classList.add('selected');
            selected.push(card);
            
            if (selected.length === 2) {
                const first = selected[0];
                const second = selected[1];
                
                // Match when both cards belong to the same pair but are different card types
                if (first.dataset.pair === second.dataset.pair && first.dataset.index !== second.dataset.index) {
                    first.classList.add('matched');
                    second.classList.add('matched');
                    score += 10;
                    scoreEl.textContent = score;
                    matched++;
                    SoundSystem.play('correct');
                    
                    if (matched === items.length) {
                        setTimeout(() => {
                            addStars(score, 'english');
                            incrementGamesPlayed('english');
                            showGameCompleteModal(score, score);
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        first.classList.remove('selected');
                        second.classList.remove('selected');
                    }, 500);
                    SoundSystem.play('wrong');
                }
                
                selected = [];
            }
        });
    });
}

// Assam Quiz Game
function renderAssamQuizGame(container, game) {
    const questions = [
        { q: 'What is the capital of Assam?', options: ['Guwahati', 'Dispur', 'Dibrugarh', 'Jorhat'], answer: 'Dispur' },
        { q: 'Which river flows through Assam?', options: ['Ganges', 'Brahmaputra', 'Yamuna', 'Godavari'], answer: 'Brahmaputra' },
        { q: 'What is the state bird of Assam?', options: ['Peacock', 'Hornbill', 'Parrot', 'Eagle'], answer: 'Hornbill' },
        { q: 'Which festival is famous in Assam?', options: ['Holi', 'Bihu', 'Diwali', 'Pongal'], answer: 'Bihu' }
    ];
    
    let currentQ = 0;
    let score = 0;
    
    function render() {
        const q = questions[currentQ];
        
        container.innerHTML = `
            <div class="game-area">
                <div class="quiz-progress">Question ${currentQ + 1}/${questions.length}</div>
                <div class="quiz-question">
                    <h3>${q.q}</h3>
                </div>
                <div class="quiz-options">
                    ${q.options.map(opt => `
                        <button class="quiz-option" data-answer="${opt}">${opt}</button>
                    `).join('')}
                </div>
                <div class="game-status">
                    <span class="game-score">⭐ <span id="quizScore">${score}</span></span>
                </div>
            </div>
        `;
        
        const style = document.createElement('style');
        style.textContent = `
            .game-area { text-align: center; width: 100%; max-width: 500px; }
            .quiz-progress { font-size: 0.9rem; color: #666; margin-bottom: 0.5rem; }
            .quiz-question { background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; }
            .quiz-question h3 { color: #333; }
            .quiz-options { display: flex; flex-direction: column; gap: 0.75rem; }
            .quiz-option {
                padding: 1rem; font-size: 1.1rem; border: 2px solid #E0E0E0;
                border-radius: 10px; background: white; cursor: pointer; transition: all 0.2s;
            }
            .quiz-option:hover { border-color: #2196F3; background: #E3F2FD; }
            .quiz-option.correct { border-color: #4CAF50; background: #E8F5E9; }
            .quiz-option.wrong { border-color: #F44336; background: #FFEBEE; }
        `;
        container.appendChild(style);
        
        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                if (btn.dataset.answer === q.answer) {
                    score += 10;
                    container.querySelector('#quizScore').textContent = score;
                    btn.classList.add('correct');
                    SoundSystem.play('correct');
                } else {
                    btn.classList.add('wrong');
                    SoundSystem.play('wrong');
                }
                
                setTimeout(() => {
                    currentQ++;
                    if (currentQ < questions.length) {
                        render();
                    } else {
                        addStars(score, 'evs');
                        incrementGamesPlayed('evs');
                        showGameCompleteModal(score, score);
                    }
                }, 800);
            });
        });
    }
    
    render();
}

// Memory Match Game
function renderMemoryGame(container, game) {
    const emojis = ['🐘', '🐅', '🦚', '🐬', '🦏', '🦋'];
    const cards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    
    let score = 0;
    let flipped = [];
    let matched = 0;
    
    container.innerHTML = `
        <div class="game-area">
            <div class="game-instructions">
                <p>Find matching pairs!</p>
            </div>
            <div class="memory-grid" id="memoryGrid">
                ${cards.map((emoji, idx) => `
                    <button class="memory-card" data-index="${idx}" data-emoji="${emoji}">?</button>
                `).join('')}
            </div>
            <div class="game-status">
                <span class="game-score">⭐ <span id="memoryScore">0</span></span>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .memory-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0.5rem; }
        .memory-card {
            aspect-ratio: 1; font-size: 1.5rem; border: none; border-radius: 8px;
            background: linear-gradient(135deg, #2196F3, #1976D2); color: white;
            cursor: pointer; transition: all 0.2s;
        }
        .memory-card:hover { transform: scale(1.05); }
        .memory-card.flipped { background: white; color: #333; border: 2px solid #2196F3; }
        .memory-card.matched { background: #4CAF50; opacity: 0.5; }
        @media (max-width: 400px) { .memory-card { font-size: 1.2rem; } }
    `;
    container.appendChild(style);
    
    const scoreEl = container.querySelector('#memoryScore');
    
    container.querySelectorAll('.memory-card').forEach(card => {
        card.addEventListener('click', () => {
            if (card.classList.contains('flipped') || card.classList.contains('matched') || flipped.length >= 2) return;
            
            card.classList.add('flipped');
            card.textContent = card.dataset.emoji;
            flipped.push(card);
            
            if (flipped.length === 2) {
                const [first, second] = flipped;
                if (first.dataset.emoji === second.dataset.emoji) {
                    first.classList.add('matched');
                    second.classList.add('matched');
                    score += 10;
                    scoreEl.textContent = score;
                    matched++;
                    SoundSystem.play('correct');
                    
                    if (matched === emojis.length) {
                        setTimeout(() => {
                            addStars(score, 'evs');
                            incrementGamesPlayed('evs');
                            showGameCompleteModal(score, score);
                        }, 500);
                    }
                } else {
                    setTimeout(() => {
                        first.classList.remove('flipped');
                        first.textContent = '?';
                        second.classList.remove('flipped');
                        second.textContent = '?';
                    }, 800);
                    SoundSystem.play('wrong');
                }
                flipped = [];
            }
        });
    });
}

// Counting Fun Game
function renderCountingFunGame(container, game) {
    const items = ['🍎', '🍊', '🍌', '🍇', '🥕'];
    let score = 0;
    let target = Math.floor(Math.random() * 5) + 3;
    let count = 0;
    
    container.innerHTML = `
        <div class="game-area">
            <div class="count-instructions">
                <p>Count the items! Tap ${target} items</p>
            </div>
            <div class="count-items" id="countItems">
                ${Array(10).fill(null).map((_, i) => `
                    <button class="count-item" data-index="${i}" data-item="${items[i % items.length]}">${items[i % items.length]}</button>
                `).join('')}
            </div>
            <div class="count-display">
                <span>Count: <strong id="countNum">0</strong> / ${target}</span>
            </div>
            <div class="game-status">
                <span class="game-score">⭐ <span id="countScore">0</span></span>
            </div>
        </div>
    `;
    
    const style = document.createElement('style');
    style.textContent = `
        .game-area { text-align: center; width: 100%; max-width: 500px; }
        .count-instructions { margin-bottom: 1rem; }
        .count-items { display: flex; flex-wrap: wrap; gap: 0.5rem; justify-content: center; margin-bottom: 1rem; }
        .count-item {
            width: 50px; height: 50px; font-size: 1.8rem; border: none; border-radius: 8px;
            background: white; cursor: pointer; transition: all 0.2s;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .count-item:hover { transform: scale(1.1); }
        .count-item.clicked { background: #4CAF50; opacity: 0.6; }
        .count-display { font-size: 1.2rem; margin-bottom: 1rem; }
    `;
    container.appendChild(style);
    
    const countEl = container.querySelector('#countNum');
    const scoreEl = container.querySelector('#countScore');
    
    container.querySelectorAll('.count-item').forEach(item => {
        item.addEventListener('click', () => {
            if (item.classList.contains('clicked')) return;
            
            item.classList.add('clicked');
            count++;
            countEl.textContent = count;
            score += 5;
            scoreEl.textContent = score;
            SoundSystem.play('click');
            
            if (count >= target) {
                setTimeout(() => {
                    addStars(score, 'math');
                    incrementGamesPlayed('math');
                    showGameCompleteModal(score, score);
                }, 500);
            }
        });
    });
}

function renderGenericGame(container, game) {
    container.innerHTML = `
        <div class="game-area" style="text-align: center;">
            <div style="font-size: 4rem; margin-bottom: 1rem;">🎮</div>
            <h2>${game.title}</h2>
            <p>${game.description}</p>
            <button class="play-btn" style="margin-top: 1rem; width: auto; padding: 1rem 2rem;">
                Start Playing
            </button>
        </div>
    `;
    
    container.querySelector('.play-btn').addEventListener('click', () => {
        showToast('Game started!', 'info');
        addStars(5, game.subject);
        incrementGamesPlayed(game.subject);
    });
}

// ==========================================================================
// Games List Rendering
// ==========================================================================

function renderGamesList(filter = 'all') {
    const container = document.getElementById('gamesList');
    if (!container) return;
    
    const filteredGames = filter === 'all' 
        ? gamesDB 
        : gamesDB.filter(g => g.subject === filter);
    
    container.innerHTML = filteredGames.map(game => {
        const titleKey = `title${state.currentLang.charAt(0).toUpperCase() + state.currentLang.slice(1)}`;
        const descKey = `description${state.currentLang.charAt(0).toUpperCase() + state.currentLang.slice(1)}`;
        
        return `
            <div class="game-card" data-game="${game.id}">
                <div class="game-thumbnail ${game.subject}-game-bg">${game.emoji || ''}</div>
                <div class="game-info">
                    <span class="game-badge ${game.subject}">${getSubjectEmoji(game.subject)} ${game.subject.charAt(0).toUpperCase() + game.subject.slice(1)}</span>
                    <h4>${game[titleKey] || game.title}</h4>
                    <p>${game[descKey] || game.description}</p>
                    <button class="play-btn-small" data-i18n="play">${t('play')} ▶</button>
                </div>
            </div>
        `;
    }).join('');
    
    // Add click handlers
    container.querySelectorAll('.game-card').forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('play-btn-small')) return;
            const gameId = card.dataset.game;
            openGame(gameId);
        });
    });
}

function getSubjectEmoji(subject) {
    const emojis = {
        math: '🔢',
        english: '📖',
        assamese: '🅰️',
        evs: '🌿'
    };
    return emojis[subject] || '🎮';
}

// ==========================================================================
// Initialization
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize systems
    ConfettiSystem.init();
    SoundSystem.init();
    loadSettings();
    
    // Load saved state
    loadState();
    
    // Update avatar display
    if (state.userProgress.avatar) {
        const avatarEl = document.getElementById('avatarEmoji');
        if (avatarEl) avatarEl.textContent = state.userProgress.avatar;
    }
    
    // Check for saved language - show modal only on first visit
    const savedLang = localStorage.getItem('assamKidsLang');
    const hasVisited = localStorage.getItem('hasVisited');
    
    if (!savedLang && !hasVisited) {
        document.getElementById('languageModal').classList.add('active');
    } else {
        if (savedLang && CONFIG.languages.includes(savedLang)) {
            state.currentLang = savedLang;
        }
        document.getElementById('loadingScreen').classList.add('hidden');
        localStorage.setItem('hasVisited', 'true');
        
        // Check if user needs to set profile
        if (!state.userProgress.playerName || state.userProgress.playerName.trim() === '') {
            setTimeout(() => {
                document.getElementById('profileModal').classList.add('active');
            }, 1500);
        }
    }
    
    // Update UI
    updateUI();
    updateBadgesDisplay();
    
    // Render games list
    renderGamesList();
    
    // Update progress display
    updateProgressDisplay();
    
    // Update settings modal toggles
    document.getElementById('soundToggle').checked = state.settings.soundEnabled;
    document.getElementById('lowDataToggle').checked = state.settings.lowDataMode;
    document.getElementById('darkModeToggle').checked = state.settings.darkMode;
    
    // Update theme toggle button icon
    const themeBtn = document.getElementById('themeToggleBtn');
    if (themeBtn) {
        themeBtn.textContent = state.settings.darkMode ? '☀️' : '🌙';
    }
    
    // Update language settings buttons
    document.querySelectorAll('.lang-setting').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === state.currentLang);
    });
    
    // Hide loading screen after animation
    setTimeout(() => {
        document.getElementById('loadingScreen').classList.add('hidden');
    }, 2000);

    // Language button handlers
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const lang = btn.dataset.lang;
            setLanguage(lang);
            document.getElementById('languageModal').classList.remove('active');
            document.getElementById('loadingScreen').classList.add('hidden');
            localStorage.setItem('hasVisited', 'true');
            
            // Show profile setup after language selection
            setTimeout(() => {
                if (!state.userProgress.playerName || state.userProgress.playerName.trim() === '') {
                    document.getElementById('profileModal').classList.add('active');
                }
            }, 1000);
        });
    });
});

// Settings modal handlers
document.getElementById('settingsBtn').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.add('active');
    closeSidebar();
});

document.getElementById('closeSettings').addEventListener('click', () => {
    document.getElementById('settingsModal').classList.remove('active');
});

// Settings language buttons
document.querySelectorAll('.lang-setting').forEach(btn => {
    btn.addEventListener('click', () => {
        setLanguage(btn.dataset.lang);
    });
});

// Sound toggle
document.getElementById('soundToggle').addEventListener('change', (e) => {
    state.settings.soundEnabled = e.target.checked;
    localStorage.setItem('soundEnabled', e.target.checked);
    SoundSystem.enabled = e.target.checked;
    SoundSystem.updateToggleButton();
});

// Low data mode toggle
document.getElementById('lowDataToggle').addEventListener('change', (e) => {
    state.settings.lowDataMode = e.target.checked;
    localStorage.setItem('lowDataMode', e.target.checked);
    applySettings();
});

// Dark mode toggle
document.getElementById('darkModeToggle').addEventListener('change', (e) => {
    state.settings.darkMode = e.target.checked;
    localStorage.setItem('darkMode', e.target.checked);
    applySettings();
});

// Reset progress
document.getElementById('resetProgressBtn').addEventListener('click', () => {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem(CONFIG.storageKey);
        state.userProgress = {
            playerName: state.userProgress.playerName,
            avatar: state.userProgress.avatar,
            totalStars: 0,
            gamesPlayed: 0,
            badges: [],
            subjects: {
                math: { stars: 0, gamesPlayed: 0, level: 1 },
                english: { stars: 0, gamesPlayed: 0, level: 1 },
                assamese: { stars: 0, gamesPlayed: 0, level: 1 },
                evs: { stars: 0, gamesPlayed: 0, level: 1 }
            },
            dailyChallenge: {
                completed: 0,
                target: 3,
                lastPlayed: null,
                dateCompleted: null
            }
        };
        saveState();
        updateProgressDisplay();
        updateBadgesDisplay();
        showToast('Progress reset! Start fresh!', 'info');
    }
    document.getElementById('settingsModal').classList.remove('active');
});

// Profile modal handlers
document.getElementById('userAvatar').addEventListener('click', () => {
    document.getElementById('profileModal').classList.add('active');
});

document.getElementById('closeProfile').addEventListener('click', () => {
    document.getElementById('profileModal').classList.remove('active');
});

// Avatar selection
document.querySelectorAll('.avatar-option').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        state.userProgress.avatar = btn.dataset.avatar;
    });
});

// Save profile
document.getElementById('saveProfile').addEventListener('click', () => {
    const nameInput = document.getElementById('playerName');
    const name = nameInput.value.trim();
    
    if (name) {
        state.userProgress.playerName = name;
    }
    
    saveState();
    
    const avatarEl = document.getElementById('avatarEmoji');
    if (avatarEl) avatarEl.textContent = state.userProgress.avatar;
    
    document.getElementById('profileModal').classList.remove('active');
    updateUI();
    
    showToast('Profile saved!', 'success');
});

// Game complete modal handlers
document.getElementById('playAgainBtn').addEventListener('click', () => {
    hideGameCompleteModal();
    if (state.currentGame) {
        loadGame(state.currentGame);
    }
});

document.getElementById('nextLevelBtn').addEventListener('click', () => {
    hideGameCompleteModal();
    closeGame();
    showSection('home');
});

document.getElementById('backToMenuBtn').addEventListener('click', () => {
    hideGameCompleteModal();
    closeGame();
    showSection('home');
});

// Sound toggle button in header
document.getElementById('soundToggleBtn').addEventListener('click', () => {
    SoundSystem.toggle();
    state.settings.soundEnabled = SoundSystem.enabled;
    localStorage.setItem('soundEnabled', SoundSystem.enabled);
});

// Theme toggle button (dark/light mode)
document.getElementById('themeToggleBtn').addEventListener('click', () => {
    state.settings.darkMode = !state.settings.darkMode;
    localStorage.setItem('darkMode', state.settings.darkMode);
    applySettings();
    
    const btn = document.getElementById('themeToggleBtn');
    btn.textContent = state.settings.darkMode ? '☀️' : '🌙';
    
    document.getElementById('darkModeToggle').checked = state.settings.darkMode;
});

// All games button
document.getElementById('allGamesBtn').addEventListener('click', () => {
    showSection('games');
    renderGamesList('all');
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
    });
});

// Menu button handler
document.getElementById('menuBtn').addEventListener('click', openSidebar);
document.getElementById('closeSidebar').addEventListener('click', closeSidebar);

// Sidebar overlay click to close
document.getElementById('sidebarOverlay').addEventListener('click', closeSidebar);

// Navigation handlers
document.addEventListener('click', function(e) {
    var navItem = e.target.closest('.nav-item');
    if (!navItem) return;
    
    e.preventDefault();
    var href = navItem.getAttribute('href');
    if (!href) return;
    
    href = href.substring(1);
    
    var subjects = ['math', 'english', 'assamese', 'evs'];
    if (subjects.indexOf(href) !== -1) {
        showSection('games');
        renderGamesList(href);
        document.querySelectorAll('.filter-btn').forEach(function(btn) {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === href);
        });
    } else {
        showSection(href);
    }
    
    closeSidebar();
});

// Subject card handlers
document.addEventListener('click', function(e) {
    var subjectCard = e.target.closest('.subject-card');
    if (!subjectCard) return;
    
    var subject = subjectCard.getAttribute('data-subject');
    showSection('games');
    renderGamesList(subject);
    document.querySelectorAll('.filter-btn').forEach(function(btn) {
        btn.classList.toggle('active', btn.getAttribute('data-filter') === subject);
    });
});

// Featured game handlers
document.addEventListener('click', function(e) {
    var card = e.target.closest('.game-card.featured');
    if (!card) return;
    
    var gameId = card.dataset.game;
    if (gameId) openGame(gameId);
});

// Play button with data-game attribute
document.addEventListener('click', function(e) {
    var btn = e.target.closest('.play-btn[data-game]');
    if (!btn) return;
    
    var gameId = btn.dataset.game;
    if (gameId) openGame(gameId);
});

// Filter button handlers
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderGamesList(btn.dataset.filter);
    });
});

// Back to home from game — confirm so kids don't lose progress accidentally
document.getElementById('backToHome').addEventListener('click', () => {
    if (confirm('Exit this game? Your current game progress will not be saved.')) {
        closeGame();
    }
});

// Progress button in header
document.getElementById('progressBtn').addEventListener('click', () => {
    showSection('progress');
});

// Keyboard support for games
document.addEventListener('keydown', (e) => {
    if (!state.currentGame) return;
    
    if (e.key === 'Escape') {
        if (confirm('Exit this game? Your current game progress will not be saved.')) {
            closeGame();
        }
    }
});

// Close modals on outside click
document.querySelectorAll('.modal').forEach(modal => {
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
});

// Export for potential module use
window.App = {
    state,
    setLanguage,
    openGame,
    closeGame,
    addStars,
    showToast
};
