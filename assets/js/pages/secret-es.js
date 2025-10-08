// Datos de vocabulario
const vocabulary = [
    {
        english: "Soap",
        spanish: "Jabón",
        example: "I need to buy natural soap for sensitive skin."
    },
    {
        english: "Essential oils",
        spanish: "Aceites esenciales",
        example: "Lavender essential oil is used for relaxation."
    },
    {
        english: "Moisturize",
        spanish: "Hidratar",
        example: "This cream helps to moisturize dry skin."
    },
    {
        english: "Fragrance",
        spanish: "Fragancia",
        example: "The soap has a pleasant citrus fragrance."
    },
    {
        english: "Natural ingredients",
        spanish: "Ingredientes naturales",
        example: "We only use natural ingredients in our products."
    },
    {
        english: "Handmade",
        spanish: "Hecho a mano",
        example: "All our soaps are handmade with care."
    },
    {
        english: "Skin care",
        spanish: "Cuidado de la piel",
        example: "Proper skin care is important for healthy skin."
    },
    {
        english: "Organic",
        spanish: "Orgánico",
        example: "We source organic materials for our products."
    },
    {
        english: "Sensitive skin",
        spanish: "Piel sensible",
        example: "This soap is specially formulated for sensitive skin."
    },
    {
        english: "Exfoliate",
        spanish: "Exfoliar",
        example: "The scrub helps to exfoliate dead skin cells."
    },
    {
        english: "Lather",
        spanish: "Espuma",
        example: "This soap creates a rich lather."
    },
    {
        english: "Scent",
        spanish: "Aroma",
        example: "The scent of lavender is very calming."
    },
    {
        english: "All-natural",
        spanish: "Completamente natural",
        example: "Our products are all-natural and chemical-free."
    },
    {
        english: "Gentle",
        spanish: "Suave",
        example: "This formula is gentle enough for babies."
    },
    {
        english: "Hydrating",
        spanish: "Hidratante",
        example: "The hydrating properties help retain moisture."
    }
];

// Elementos DOM
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const vocabList = document.getElementById('vocab-list');
const wordsColumn = document.getElementById('words-column');
const definitionsColumn = document.getElementById('definitions-column');
const matchesCount = document.getElementById('matches-count');
const totalPairs = document.getElementById('total-pairs');
const matchProgress = document.getElementById('match-progress');
const resetMatchBtn = document.getElementById('reset-match');
const practiceWord = document.getElementById('practice-word');
const practiceHint = document.getElementById('practice-hint');
const practiceInput = document.getElementById('practice-input');
const checkAnswerBtn = document.getElementById('check-answer');
const resultMessage = document.getElementById('result-message');
const nextWordBtn = document.getElementById('next-word');
const resetPracticeBtn = document.getElementById('reset-practice');
const scoreDisplay = document.getElementById('score');
const practiceProgress = document.getElementById('practice-progress');

// Variables de estado
let currentPracticeIndex = 0;
let practiceScore = 0;
let matchedPairs = 0;
let selectedWord = null;
let selectedDefinition = null;
let matchedWords = [];
let matchedDefinitions = [];

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    initializeVocabularyTab();
    initializeMatchingGame();
    initializePracticeTab();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    // Navegación por pestañas
    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.getAttribute('data-tab');
            switchTab(tabId);
        });
    });

    // Botones de reinicio
    resetMatchBtn.addEventListener('click', resetMatchingGame);
    resetPracticeBtn.addEventListener('click', resetPractice);

    // Práctica de traducción
    checkAnswerBtn.addEventListener('click', checkAnswer);
    nextWordBtn.addEventListener('click', nextPracticeWord);
    practiceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
}

// Cambiar pestañas
function switchTab(tabId) {
    tabBtns.forEach(btn => {
        btn.classList.remove('active');
        if (btn.getAttribute('data-tab') === tabId) {
            btn.classList.add('active');
        }
    });

    tabContents.forEach(content => {
        content.classList.remove('active');
        if (content.id === tabId) {
            content.classList.add('active');
        }
    });
}

// Inicializar pestaña de vocabulario
function initializeVocabularyTab() {
    vocabList.innerHTML = '';
    
    vocabulary.forEach(item => {
        const card = document.createElement('div');
        card.className = 'vocab-card';
        card.innerHTML = `
            <div class="card-header">${item.english}</div>
            <div class="card-body">
                <p><span class="translation">${item.spanish}</span></p>
                <p class="example">${item.example}</p>
            </div>
        `;
        vocabList.appendChild(card);
    });
}

// Inicializar juego de emparejamiento
function initializeMatchingGame() {
    // Mezclar el vocabulario
    const shuffledVocabulary = [...vocabulary].sort(() => Math.random() - 0.5);
    const gameWords = shuffledVocabulary.slice(0, 10);
    
    totalPairs.textContent = gameWords.length;
    matchesCount.textContent = matchedPairs;
    matchProgress.style.width = '0%';
    
    // Limpiar columnas
    wordsColumn.innerHTML = '';
    definitionsColumn.innerHTML = '';
    
    // Mezclar definiciones
    const shuffledDefinitions = [...gameWords].sort(() => Math.random() - 0.5);
    
    // Añadir palabras
    gameWords.forEach((item, index) => {
        const wordItem = document.createElement('div');
        wordItem.className = 'word-item';
        wordItem.textContent = item.english;
        wordItem.setAttribute('data-index', index);
        wordItem.addEventListener('click', selectWord);
        wordsColumn.appendChild(wordItem);
    });
    
    // Añadir definiciones
    shuffledDefinitions.forEach((item, index) => {
        const definitionItem = document.createElement('div');
        definitionItem.className = 'definition-item';
        definitionItem.textContent = item.spanish;
        definitionItem.setAttribute('data-index', gameWords.findIndex(w => w.english === item.english));
        definitionItem.addEventListener('click', selectDefinition);
        definitionsColumn.appendChild(definitionItem);
    });
}

// Seleccionar palabra en el juego de emparejamiento
function selectWord(e) {
    const wordIndex = e.target.getAttribute('data-index');
    
    // Si ya está emparejada, no hacer nada
    if (matchedWords.includes(wordIndex)) return;
    
    // Limpiar selección anterior
    if (selectedWord) {
        selectedWord.classList.remove('selected');
    }
    
    // Seleccionar nueva palabra
    selectedWord = e.target;
    selectedWord.classList.add('selected');
    
    // Si ya hay una definición seleccionada, verificar emparejamiento
    if (selectedDefinition) {
        checkMatch();
    }
}

// Seleccionar definición en el juego de emparejamiento
function selectDefinition(e) {
    const definitionIndex = e.target.getAttribute('data-index');
    
    // Si ya está emparejada, no hacer nada
    if (matchedDefinitions.includes(definitionIndex)) return;
    
    // Limpiar selección anterior
    if (selectedDefinition) {
        selectedDefinition.classList.remove('selected');
    }
    
    // Seleccionar nueva definición
    selectedDefinition = e.target;
    selectedDefinition.classList.add('selected');
    
    // Si ya hay una palabra seleccionada, verificar emparejamiento
    if (selectedWord) {
        checkMatch();
    }
}

// Verificar emparejamiento en el juego
function checkMatch() {
    const wordIndex = selectedWord.getAttribute('data-index');
    const definitionIndex = selectedDefinition.getAttribute('data-index');
    
    if (wordIndex === definitionIndex) {
        // Emparejamiento correcto
        selectedWord.classList.add('matched');
        selectedDefinition.classList.add('matched');
        
        matchedWords.push(wordIndex);
        matchedDefinitions.push(definitionIndex);
        
        matchedPairs++;
        matchesCount.textContent = matchedPairs;
        
        const progress = (matchedPairs / parseInt(totalPairs.textContent)) * 100;
        matchProgress.style.width = `${progress}%`;
        
        // Verificar si se completó el juego
        if (matchedPairs === parseInt(totalPairs.textContent)) {
            setTimeout(() => {
                alert('¡Felicidades! Has completado el juego de emparejamiento.');
            }, 500);
        }
    } else {
        // Emparejamiento incorrecto
        selectedWord.classList.add('incorrect');
        selectedDefinition.classList.add('incorrect');
        
        setTimeout(() => {
            selectedWord.classList.remove('selected', 'incorrect');
            selectedDefinition.classList.remove('selected', 'incorrect');
        }, 1000);
    }
    
    // Limpiar selecciones
    selectedWord = null;
    selectedDefinition = null;
}

// Reiniciar juego de emparejamiento
function resetMatchingGame() {
    matchedPairs = 0;
    matchedWords = [];
    matchedDefinitions = [];
    selectedWord = null;
    selectedDefinition = null;
    initializeMatchingGame();
}

// Inicializar pestaña de práctica
function initializePracticeTab() {
    currentPracticeIndex = 0;
    practiceScore = 0;
    scoreDisplay.textContent = practiceScore;
    practiceProgress.style.width = '0%';
    showPracticeWord();
}

// Mostrar palabra de práctica
function showPracticeWord() {
    if (currentPracticeIndex < vocabulary.length) {
        const word = vocabulary[currentPracticeIndex];
        practiceWord.textContent = word.english;
        practiceHint.textContent = `Ejemplo: ${word.example}`;
        practiceInput.value = '';
        resultMessage.className = 'result-message';
    } else {
        practiceWord.textContent = '¡Completado!';
        practiceHint.textContent = 'Has practicado todas las palabras.';
        practiceInput.style.display = 'none';
        checkAnswerBtn.style.display = 'none';
        nextWordBtn.textContent = 'Reiniciar';
    }
}

// Verificar respuesta en práctica
function checkAnswer() {
    const userAnswer = practiceInput.value.trim().toLowerCase();
    const correctAnswer = vocabulary[currentPracticeIndex].spanish.toLowerCase();
    
    if (userAnswer === correctAnswer) {
        resultMessage.textContent = '¡Correcto!';
        resultMessage.className = 'result-message result-correct';
        practiceScore++;
        scoreDisplay.textContent = practiceScore;
    } else {
        resultMessage.textContent = `Incorrecto. La respuesta correcta es: ${vocabulary[currentPracticeIndex].spanish}`;
        resultMessage.className = 'result-message result-incorrect';
    }
    
    // Actualizar barra de progreso
    const progress = ((currentPracticeIndex + 1) / vocabulary.length) * 100;
    practiceProgress.style.width = `${progress}%`;
}

// Siguiente palabra en práctica
function nextPracticeWord() {
    if (currentPracticeIndex < vocabulary.length - 1) {
        currentPracticeIndex++;
        showPracticeWord();
    } else {
        // Si ya se completó, reiniciar
        initializePracticeTab();
        practiceInput.style.display = 'block';
        checkAnswerBtn.style.display = 'inline-block';
        nextWordBtn.textContent = 'Siguiente Palabra';
    }
}

// Reiniciar práctica
function resetPractice() {
    initializePracticeTab();
}
