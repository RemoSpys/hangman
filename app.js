
const scoreSpan = document.getElementById('score');
const guessedWordDiv = document.getElementById('word');
const alphabetDiv = document.getElementById('alphabet');
const hangmanImg = document.getElementById('hangman-img'); // Tagab, et pildi elemendi ID on õige

const alphabet = 'abdefghijklmnoprsšzžtuvõäöü'; // Eesti tähestik
let guessedLetters = []; // Salvestab mängija poolt ära arvatud tähed

let score = 8; // Mängija elud
scoreSpan.innerText = score; // Kuvab mängija elude arvu

let word = ''; // Sõna, mida mängija peab ära arvama
let guessedWord = []; // Sõna tähtedest koosnev massiiv (näidatakse "_")

// Laeb juhusliku sõna hangman.txt failist
fetch('hangman.txt')
    .then(response => response.text())
    .then(text => {
        const words = text.split('\n').map(w => w.trim()).filter(Boolean); // Jagab faili sõnadeks
        word = words[Math.floor(Math.random() * words.length)]; // Valib juhusliku sõna
        initializeWord(); // Käivitab sõna initsialiseerimise
    });

// Initsialiseerib äraarvatava sõna (_ asemel)
function initializeWord() {
    for (let char of word) {
        if (char.toUpperCase() != char.toLowerCase()) {
            guessedWord.push('_'); // Tähed asendatakse "_"
        } else {
            guessedWord.push(char); // Jätab tühikud ja kirjavahemärgid alles
        }
    }
    guessedWordDiv.innerText = guessedWord.join(''); // Kuvab sõna mängijale
}

// Uuendab poomismängu pilti vastavalt kaotatud eludele
function updateHangmanImage() {
    const livesLost = 8 - score;
    hangmanImg.src = `/img/hangman${livesLost}.webp`; // Valib õige pildi
}

// Kontrollib mängija poolt pakutud tähte
function handleGuess(letter) {
    if (score && guessedWord.includes('_')) { // Kontrollib, kas mäng pole läbi
        if (!guessedLetters.includes(letter)) { // Kontrollib, kas täht on juba pakutud
            guessedLetters.push(letter); // Lisab tähe pakutud tähtede hulka

            if (word.toLowerCase().includes(letter)) { // Kui täht on õige
                for (let i = 0; word.toLowerCase().indexOf(letter, i) != -1; i++) {
                    i = word.toLowerCase().indexOf(letter, i);
                    guessedWord[i] = word[i]; // Asendab vastavad "_" õigete tähtedega
                }

                guessedWordDiv.innerText = guessedWord.join(''); // Uuendab sõna vaates
                const letterSpan = document.getElementById(letter);
                if (letterSpan) letterSpan.classList.add('correct'); // Lisab stiili õigele tähele
            } else { // Kui täht on vale
                score--; // Vähendab elude arvu
                scoreSpan.innerText = score; // Uuendab elude näitu
                updateHangmanImage(); // Uuendab pilti

                const letterSpan = document.getElementById(letter);
                if (letterSpan) letterSpan.classList.add('incorrect'); // Lisab stiili valesti pakutud tähele
            }
        }

        if (!score) { // Kui elud saavad otsa
            console.log('Kaotasid, õige sõna:', word);
        } else if (!guessedWord.includes('_')) { // Kui kõik tähed on ära arvatud
            console.log('Võitsid mängu!');
        }
    }
}

// Loob tähestiku, mida saab klõpsata
for (let letter of alphabet) {
    const letterSpan = document.createElement('span');
    letterSpan.id = letter; // Määrab ID tähe jaoks
    letterSpan.innerText = letter.toUpperCase(); // Kuvab tähe suurtähega

    letterSpan.addEventListener('click', () => handleGuess(letter)); // Lisab klõpsu sündmuse

    alphabetDiv.appendChild(letterSpan); // Lisab tähe tähestiku konteinerisse
}

// Kuulab klaviatuuri sündmusi (nt kui vajutatakse tähte klaviatuuril)
document.addEventListener('keydown', (event) => {
    const letter = event.key.toLowerCase(); // Muudab tähe väiketäheks
    if (alphabet.includes(letter)) { // Kontrollib, kas täht on tähestikus
        handleGuess(letter); // Käivitab äraarvamise funktsiooni
    }
});
