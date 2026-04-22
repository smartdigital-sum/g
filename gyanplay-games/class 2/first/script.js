// GyanPlay Class 2 - Main JavaScript

// Utility: debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Game data structure
const gamesData = {
    maths: [
        { id: 1, name: "Number Market", concept: "Place value — hundreds/tens/ones up to 999", 
          mechanic: "Shopkeeper gives you bundles of 100s, 10s and 1s — drag them onto a counter to build the number shown", batch: 1 },
        { id: 2, name: "Carry the Coconuts", concept: "Addition with carrying (e.g. 47+38)", 
          mechanic: "Two baskets overfill — physically 'carry' the overflow to the next column. Visual column addition", batch: 1 },
        { id: 3, name: "Multiplication Pond", concept: "Tables 2, 3, 4, 5", 
          mechanic: "Frogs jump in groups — tap to count the jumps. '3 frogs jump 4 times = ?' Builds times-tables as repeated addition", batch: 2 },
        { id: 4, name: "Ruler Race", concept: "Measurement — cm and m", 
          mechanic: "Measure objects by dragging a ruler. Compare lengths. 'Which is longer?' 'How many cm?'", batch: 2 },
        { id: 5, name: "Clock Tower", concept: "Telling time — o'clock and half past", 
          mechanic: "Drag clock hands to match times shown. Day schedule of a child (wake up → school → lunch → sleep)", batch: 3 }
    ],
    english: [
        { id: 1, name: "Punctuation Fixer", concept: "Full stop, question mark, exclamation mark", 
          mechanic: "Sentences shown with blank at end — tap the right punctuation. Context clues to decide which", batch: 1 },
        { id: 2, name: "Noun Town", concept: "Common nouns, proper nouns, pronouns", 
          mechanic: "A town map — tap all the 'things' (nouns) hidden in a scene. Separate common vs proper", batch: 1 },
        { id: 3, name: "Verb Volcano", concept: "Action words — verbs in sentences", 
          mechanic: "Volcano erupts with word tiles — drag verbs into sentences. 'The bird _____ in the sky.'", batch: 2 },
        { id: 4, name: "Paragraph Builder", concept: "Reading comprehension + sequencing", 
          mechanic: "3–4 sentence paragraph scrambled — arrange in correct order. Then answer 2 questions about it", batch: 3 }
    ],
    science: [
        { id: 1, name: "Sense Safari", concept: "5 senses — eyes/ears/nose/tongue/skin", 
          mechanic: "Objects appear — child matches them to the correct sense organ. Then rounds flip: 'Which sense do you use to taste?'", batch: 1 },
        { id: 2, name: "Material World", concept: "Properties of materials — hard/soft/rough/smooth/transparent", 
          mechanic: "Drag materials into the right bin. Second level: 'Which material is best for making a cup?' Apply properties", batch: 2 },
        { id: 3, name: "Water Journey", concept: "Water cycle — evaporation, clouds, rain, river", 
          mechanic: "Animated cycle — tap each stage as the narrator explains. Then gaps appear and child fills them in", batch: 2 },
        { id: 4, name: "Baby Animal Match", concept: "Animals and their young ones", 
          mechanic: "Match hen→chick, cow→calf, dog→pup, frog→tadpole, butterfly→caterpillar. 15+ pairs", batch: 3 }
    ],
    social: [
        { id: 1, name: "My Neighbourhood", concept: "Places in a community — post office, hospital, market, school, park", 
          mechanic: "Bird's eye town map — find the building matching each clue. 'Where do we post letters?'", batch: 1 },
        { id: 2, name: "Festival Colours", concept: "Major Indian festivals + Assam festivals", 
          mechanic: "Rangoli-style board — match decorations, food and clothing to each festival. Bihu, Diwali, Eid, Christmas, Holi", batch: 2 },
        { id: 3, name: "Food Farm to Fork", concept: "Where our food comes from", 
          mechanic: "Journey game — trace rice from Assam paddy field → mill → shop → plate. Same for milk, vegetables, eggs", batch: 3 },
        { id: 4, name: "Map Reader", concept: "Basic directions — N/S/E/W, map symbols", 
          mechanic: "Simple village map — follow directions to reach destinations. 'Go 2 steps North then 1 step East'", batch: 3 }
    ],
    hindi: [
        { id: 1, name: "शब्द बनाओ (Word Weaver)", concept: "Build 2-3 syllable Hindi words", 
          mechanic: "Syllable blocks fall — drag them in the right order to build words. कमल = क + म + ल", batch: 1 },
        { id: 2, name: "लिंग खेल (Gender Game)", concept: "Masculine/feminine — ling", 
          mechanic: "Objects appear — sort them into पुल्लिंग (🔵) and स्त्रीलिंग (🔴) baskets. Raja/Rani, Ladka/Ladki etc.", batch: 2 },
        { id: 3, name: "वचन जादू (Singular to Plural)", concept: "Vachan — ekavachan to bahuvachan", 
          mechanic: "One apple → apples. Tap to transform: एक किताब → दो किताबें. Visual transformation with animation", batch: 3 }
    ],
    computer: [
        { id: 1, name: "Input or Output?", concept: "Input devices (keyboard, mouse, mic, scanner) vs output devices (monitor, printer, speakers)", 
          mechanic: "Sort devices into two bins with flying animation. 12 devices total", batch: 1 },
        { id: 2, name: "Paint Studio", concept: "MS Paint tools — pencil, eraser, fill, shapes", 
          mechanic: "Mini drawing app built-in. Complete drawings by using the right tool. 'Use the fill tool to colour the sky blue'", batch: 2 },
        { id: 3, name: "Internet Explorer Jr.", concept: "What is internet, safe browsing, email basics", 
          mechanic: "Story-based — Anu wants to send a message to grandma. Navigate choices, learn what internet is and what's safe", batch: 3 }
    ]
};

// Subject metadata
const subjects = [
    { id: 'maths', name: 'Maths', icon: 'fas fa-calculator', color: 'math', gamesCount: 5, 
      description: 'Numbers to 999, carrying, multiplication, measurement, time' },
    { id: 'english', name: 'English', icon: 'fas fa-book-open', color: 'english', gamesCount: 4, 
      description: 'Punctuation, parts of speech (noun/verb), paragraph comprehension' },
    { id: 'science', name: 'Science', icon: 'fas fa-flask', color: 'science', gamesCount: 4, 
      description: '5 senses, material properties, water cycle, animal young ones' },
    { id: 'social', name: 'Social Studies', icon: 'fas fa-globe-asia', color: 'social', gamesCount: 4, 
      description: 'Neighbourhood map, festivals, farm to fork, directions' },
    { id: 'hindi', name: 'Hindi', icon: 'fas fa-language', color: 'hindi', gamesCount: 3, 
      description: '2-syllable words, gender (ling), singular/plural (vachan)' },
    { id: 'computer', name: 'Computer', icon: 'fas fa-laptop-code', color: 'computer', gamesCount: 3, 
      description: 'Input/output devices, Paint tools, internet basics' }
];

// Progress tracking
const STORAGE_KEY = 'gyanplay_class2_progress';

function getProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
}

function saveProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
}

function getGameProgress(subjectId, gameId) {
    const progress = getProgress();
    const key = `${subjectId}_${gameId}`;
    return progress[key] || { completed: false, score: 0, attempts: 0 };
}

function updateGameProgress(subjectId, gameId, updates) {
    const progress = getProgress();
    const key = `${subjectId}_${gameId}`;
    progress[key] = { ...getGameProgress(subjectId, gameId), ...updates };
    saveProgress(progress);
    updateProgressOverview();
}

function markGameCompleted(subjectId, gameId) {
    updateGameProgress(subjectId, gameId, { completed: true, score: 100 });
}

function resetAllProgress() {
    if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
        localStorage.removeItem(STORAGE_KEY);
        updateProgressOverview();
        renderSubjects();
        if (selectedGame && selectedSubjectId) {
            selectGame(selectedGame, selectedSubjectId);
        }
    }
}

function calculateOverallProgress() {
    const progress = getProgress();
    let totalGames = 0;
    let completedGames = 0;
    
    subjects.forEach(subject => {
        gamesData[subject.id].forEach(game => {
            totalGames++;
            const key = `${subject.id}_${game.id}`;
            if (progress[key] && progress[key].completed) {
                completedGames++;
            }
        });
    });
    
    return {
        totalGames,
        completedGames,
        percentage: totalGames > 0 ? Math.round((completedGames / totalGames) * 100) : 0
    };
}

function updateProgressOverview() {
    const { totalGames, completedGames, percentage } = calculateOverallProgress();
    const totalEl = document.getElementById('total-games');
    const completedEl = document.getElementById('completed-games');
    const percentageEl = document.getElementById('progress-percentage');
    const fillEl = document.getElementById('progress-fill');
    const progressBar = document.querySelector('.progress-bar');
    
    if (totalEl) totalEl.textContent = totalGames;
    if (completedEl) completedEl.textContent = completedGames;
    if (percentageEl) percentageEl.textContent = `${percentage}%`;
    if (fillEl) fillEl.style.width = `${percentage}%`;
    if (progressBar) {
        progressBar.setAttribute('aria-valuenow', percentage);
        progressBar.setAttribute('aria-label', `Progress: ${percentage}% complete`);
    }
}

// Current state
let currentBatch = 1;
let selectedGame = null;
let selectedSubjectId = null;
let searchTerm = '';

// DOM elements
const subjectsContainer = document.querySelector('.subjects');
const batchButtons = document.querySelectorAll('.batch-btn');
const detailsContent = document.querySelector('.details-content');
const gameSearchInput = document.getElementById('gameSearch');
const clearSearchBtn = document.getElementById('clearSearch');

// Initialize the app
function init() {
    renderSubjects();
    setupBatchButtons();
    setupGameSelection();
    setupSearch();
    setupProgress();
    
    // Select first game by default
    if (gamesData.maths.length > 0) {
        selectGame(gamesData.maths[0], 'maths');
    }
}

// Setup progress overview and reset button
function setupProgress() {
    updateProgressOverview();
    
    const resetBtn = document.getElementById('reset-progress');
    if (resetBtn) {
        resetBtn.addEventListener('click', resetAllProgress);
    }
}

// Render all subjects with their games
function renderSubjects() {
    subjectsContainer.innerHTML = '';
    
    subjects.forEach(subject => {
        const subjectCard = document.createElement('div');
        subjectCard.className = `subject-card ${subject.color}`;
        
        const games = gamesData[subject.id];
        const gamesInBatch = currentBatch === 0
            ? games
            : games.filter(game => game.batch === currentBatch);
        
        // Filter by search term if present
        let filteredGames = gamesInBatch;
        if (searchTerm.trim() !== '') {
            const term = searchTerm.toLowerCase();
            filteredGames = gamesInBatch.filter(game =>
                game.name.toLowerCase().includes(term) ||
                game.concept.toLowerCase().includes(term) ||
                game.mechanic.toLowerCase().includes(term)
            );
        }
        
        // Only show subject if it has games after filtering
        if (filteredGames.length === 0) {
            subjectCard.style.display = 'none';
        } else {
            subjectCard.style.display = '';
        }
        
        subjectCard.innerHTML = `
            <div class="subject-header ${subject.color}">
                <h4><i class="${subject.icon}" aria-hidden="true"></i> ${subject.name}</h4>
                <div class="game-count">${filteredGames.length} games</div>
            </div>
            <div class="games-list" role="list" aria-label="Games in ${subject.name}">
                ${filteredGames.map(game => {
                    const progress = getGameProgress(subject.id, game.id);
                    const completed = progress.completed;
                    const isSelected = selectedGame && selectedGame.id === game.id && selectedSubjectId === subject.id;
                    return `
                        <div class="game-item" data-subject="${subject.id}" data-game-id="${game.id}"
                             role="listitem" tabindex="0"
                             aria-label="${game.name}, Batch ${game.batch}${completed ? ', Completed' : ''}"
                             ${isSelected ? 'aria-selected="true"' : 'aria-selected="false"'}>
                            <div class="game-name">${game.name}</div>
                            <div class="game-right">
                                <div class="game-batch">Batch ${game.batch}</div>
                                ${completed ? '<div class="game-progress" aria-hidden="true"><i class="fas fa-check"></i> Done</div>' : ''}
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
        
        subjectsContainer.appendChild(subjectCard);
    });
}

// Setup batch button event listeners
function setupBatchButtons() {
    batchButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active button
            batchButtons.forEach(btn => {
                btn.classList.remove('active');
                btn.setAttribute('aria-selected', 'false');
            });
            button.classList.add('active');
            button.setAttribute('aria-selected', 'true');
            
            // Update current batch
            currentBatch = parseInt(button.dataset.batch);
            
            // Re-render subjects
            renderSubjects();
            
            // Update command hint
            updateCommandHint();
        });
    });
}

// Update the command hint based on current batch
function updateCommandHint() {
    const commandHint = document.querySelector('.command-hint code');
    if (commandHint) {
        if (currentBatch === 0) {
            commandHint.textContent = `Say "go class 2 all games" when ready`;
        } else {
            commandHint.textContent = `Say "go class 2 batch ${currentBatch}" when ready`;
        }
    }
}

// Setup search functionality
function setupSearch() {
    if (!gameSearchInput || !clearSearchBtn) return;
    
    // Search input event with debounce
    const handleSearch = debounce(() => {
        searchTerm = gameSearchInput.value;
        renderSubjects();
        updateClearButton();
    }, 300);
    
    gameSearchInput.addEventListener('input', handleSearch);
    
    // Clear search button
    clearSearchBtn.addEventListener('click', () => {
        gameSearchInput.value = '';
        searchTerm = '';
        renderSubjects();
        updateClearButton();
    });
    
    // Update clear button visibility
    function updateClearButton() {
        if (searchTerm.trim() !== '') {
            clearSearchBtn.style.display = 'flex';
        } else {
            clearSearchBtn.style.display = 'none';
        }
    }
    
    // Initial update
    updateClearButton();
}

// Setup game selection event listeners
function setupGameSelection() {
    // Use event delegation for game items
    subjectsContainer.addEventListener('click', (e) => {
        const gameItem = e.target.closest('.game-item');
        if (gameItem) {
            const subjectId = gameItem.dataset.subject;
            const gameId = parseInt(gameItem.dataset.gameId);
            
            const game = gamesData[subjectId].find(g => g.id === gameId);
            if (game) {
                selectGame(game, subjectId);
            }
        }
    });
    
    // Add keyboard navigation support
    subjectsContainer.addEventListener('keydown', (e) => {
        const gameItem = e.target.closest('.game-item');
        if (gameItem && (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar')) {
            e.preventDefault();
            const subjectId = gameItem.dataset.subject;
            const gameId = parseInt(gameItem.dataset.gameId);
            
            const game = gamesData[subjectId].find(g => g.id === gameId);
            if (game) {
                selectGame(game, subjectId);
            }
        }
    });
}

// Select and display a game
function selectGame(game, subjectId) {
    selectedGame = game;
    selectedSubjectId = subjectId;
    
    const subject = subjects.find(s => s.id === subjectId);
    
    // Map game names to demo HTML files
    const demoFiles = {
        'Number Market': 'number-market-demo.html',
        'Punctuation Fixer': 'punctuation-demo.html',
        'Sense Safari': 'sense-safari-demo.html'
    };
    
    const hasDemo = demoFiles.hasOwnProperty(game.name);
    
    const progress = getGameProgress(subjectId, game.id);
    const completed = progress.completed;
    
    detailsContent.innerHTML = `
        <h3 class="game-title">${game.name}</h3>
        <div class="game-concept">${game.concept}</div>
        <div class="game-mechanic">
            <strong><i class="fas fa-gamepad"></i> Game Mechanic:</strong><br>
            ${game.mechanic}
        </div>
        <div style="margin-bottom: 20px;">
            <strong><i class="fas fa-book"></i> Subject:</strong> ${subject.name}<br>
            <strong><i class="fas fa-layer-group"></i> Batch:</strong> ${game.batch}<br>
            <strong><i class="fas fa-brain"></i> Cognitive Level:</strong> Operation & Reasoning
            ${hasDemo ? '<br><strong><i class="fas fa-star"></i> Demo Available:</strong> Yes' : ''}
            <br><strong><i class="fas fa-chart-line"></i> Progress:</strong> ${completed ? '<span style="color: var(--success);">Completed</span>' : '<span style="color: var(--warning);">Not started</span>'}
        </div>
        <button class="play-btn" id="play-game-btn">
            <i class="fas fa-play"></i> ${hasDemo ? 'Try Demo' : 'Play Game'}
        </button>
        <button class="how-to-play-btn" style="background: var(--accent); margin-left: 10px;">
            <i class="fas fa-info-circle"></i> How to Play
        </button>
        <button class="progress-toggle-btn" id="progress-toggle-btn" style="background: ${completed ? 'var(--warning)' : 'var(--success)'}; margin-left: 10px;">
            <i class="fas ${completed ? 'fa-undo' : 'fa-check'}"></i> ${completed ? 'Mark as Not Completed' : 'Mark as Completed'}
        </button>
        ${hasDemo ? `<a href="${demoFiles[game.name]}" target="_blank" class="demo-link" style="display: block; margin-top: 15px; color: var(--primary);"><i class="fas fa-external-link-alt"></i> Open demo in new tab</a>` : ''}
    `;
    
    // Add play button functionality
    const playBtn = detailsContent.querySelector('#play-game-btn');
    playBtn.addEventListener('click', () => {
        if (hasDemo) {
            window.open(demoFiles[game.name], '_blank');
        } else {
            alert(`Starting "${game.name}"...\n\nThis would launch the interactive game in a real implementation.`);
        }
    });
    
    // Add how to play button functionality
    const howToPlayBtn = detailsContent.querySelector('.how-to-play-btn');
    howToPlayBtn.addEventListener('click', () => {
        alert(`How to Play "${game.name}":\n\n${game.mechanic}\n\nLearning Objective: ${game.concept}`);
    });
    
    // Add progress toggle button functionality
    const progressToggleBtn = detailsContent.querySelector('#progress-toggle-btn');
    if (progressToggleBtn) {
        progressToggleBtn.addEventListener('click', () => {
            const newCompleted = !completed;
            if (newCompleted) {
                markGameCompleted(subjectId, game.id);
            } else {
                updateGameProgress(subjectId, game.id, { completed: false });
            }
            // Re-render subjects to update progress badges
            renderSubjects();
            // Update the details view to reflect new status
            selectGame(game, subjectId);
        });
    }
    
    // Highlight selected game and update ARIA attributes
    document.querySelectorAll('.game-item').forEach(item => {
        item.style.background = '';
        item.style.color = '';
        item.setAttribute('aria-selected', 'false');
    });
    
    const selectedItem = document.querySelector(`.game-item[data-subject="${subjectId}"][data-game-id="${game.id}"]`);
    if (selectedItem) {
        selectedItem.style.background = 'var(--accent)';
        selectedItem.style.color = 'white';
        selectedItem.setAttribute('aria-selected', 'true');
        selectedItem.focus(); // Focus for keyboard navigation
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', init);

// Export for debugging
window.gyanPlay = {
    gamesData,
    subjects,
    currentBatch,
    selectGame
};