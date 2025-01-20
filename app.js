const guessedWordDiv = document.getElementById('word'); 
const scoreSpan = document.getElementById('score');
const alphabetDiv = document.getElementById('alphabet');
const guessedLettersSpan = document.getElementById('guessed-letters');
const resetButton = document.getElementById('reset-button');

const alphabet = 'abcdefghijklmnopqrsšzžtuvwõäöüxy';
let guessedLetters = [];
let score = 10;
let word = 'word'; // Mõistatussõna
let guessedWord = '';

// Mängu lähtestamine
function initializeGame() {
    guessedLetters = [];
    guessedWord = '';
    score = 10;
    scoreSpan.innerText = score;
    guessedLettersSpan.innerText = '';
    alphabetDiv.innerHTML = '';
    resetButton.style.display = 'none'; // Peidame reset-nupu

    // Loo tühjade kohtadega sõna
    for (let char of word) {
        if (char.toUpperCase() !== char.toLowerCase()) {
            guessedWord += '_';
        } else {
            guessedWord += char;
        }
    }

    guessedWordDiv.innerText = guessedWord;

    // Tähtede lisamine
    for (let letter of alphabet) {
        let letterSpan = document.createElement('span');
        letterSpan.id = letter;
        letterSpan.innerText = letter.toUpperCase();
        letterSpan.classList.add('letter');

        letterSpan.addEventListener('click', () => {
            if (!guessedLetters.includes(letter)) {
                guessedLetters.push(letter);
                guessedLettersSpan.innerText = guessedLetters.join(', ');

                // Kontrollime tähte
                if (word.includes(letter)) {
                    let updatedWord = '';
                    for (let i = 0; i < word.length; i++) {
                        if (word[i] === letter) {
                            updatedWord += letter;
                        } else {
                            updatedWord += guessedWord[i];
                        }
                    }
                    guessedWord = updatedWord;
                    guessedWordDiv.innerText = guessedWord;

                    if (!guessedWord.includes('_')) {
                        alert('Sa võitsid!');
                        resetButton.style.display = 'block';
                    }
                } else {
                    score--;
                    scoreSpan.innerText = score;

                    if (score <= 0) {
                        alert('Mäng läbi!');
                        resetButton.style.display = 'block';
                    }
                }
            }
        });

        alphabetDiv.appendChild(letterSpan);
    }
}

// Reset-nupu sündmus
resetButton.addEventListener('click', () => {
    initializeGame();
});

// Mängu algus
initializeGame();
