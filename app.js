// 2. Get the elements you’ll need from your HTML
const qwerty= document.querySelector("qwerty");
const phrase= document.querySelector("phrase");
let missed= 0;

// 3. Attach an event listener to the “Start Game” button to hide the start screen overlay.
const overlay = document.getElementById('overlay');
const startButton = document.querySelector('.btn__reset');

startButton.addEventListener('click', () => {
    overlay.style.display = 'none';
});

// 4. Create a phrases
const phrases= [
"Der junge Vogel fängt den Wurm",
"Hochmut kommt vor dem Fall",
"Eine Hand wäscht die andere",
"Reden ist Silber Schweigen ist Gold",
"Alles hat ein Ende nur die Wurst hat zwei"
];

// 5. Create a getRandomPhraseAsArray function.
 function getRandomPhraseAsArray (arr) {
    const randomIndex= () => Math.floor(Math.random) * arr.length;
    const randomPhrase= arr[randomIndex];
    const charArray= randomPhrase.split("");
    return charArray;
 }

// 6. Set the game display.
const randomPhraseArray = getRandomPhraseAsArray(phrases);
console.log(randomPhraseArray);

function addPhraseToDisplay (arr) {
    const phraseList = document.querySelector('#phrase ul');
    phraseList.innerHTML = '';

    for (i= 0; i<arr.length; i++) {
        const character= arr[i];
        const li= document.createElement("li");
        li.textContent= character;
        // Überprüfung ob es ein Buchstabe oder eine Leerstelle ist und dann die passende Klasse hinzufügen
        if (character !== " ") {
            li.classList.add("letter");
        } else {
            li.classList.add("space");
        }

        phraseList.appendChild(li);
    }

}

// 7. Create a checkLetter function.

// 8. Add an event listener to the keyboard.

// 9. Count the missed guesses in the game.

// 10. Create a checkWin function.

// 11. If you're having trouble with this project, make sure you take a look at this great study guide:

