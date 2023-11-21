
// Get HTML elements
const keyboard = document.getElementById('qwerty');
const phraseDisplay = document.getElementById('phrase');
let missedGuesses = 0;

// Hide start button
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

// Array of phrases
const phrases = [
    "This is a sample phrase",
    "Another example here",
    "A third phrase with spaces",
    "Hello World",
    "Coding is fun"
];


// Event listener for the "Start Game" button
startButton.addEventListener('click', () => {
    overlay.classList.remove('show');
    overlay.style.display = 'none'; // Hide the overlay

    // Show the phrase when starting a new game
    showPhrase();

    resetGame(); // Reset the game
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);
    
});

// Event listener for the "Play Again (Success)" button
document.querySelector('.btn__reset-success').addEventListener('click', () => {
    resetGame(); // Reset the game
    overlay.style.display = 'none'; // Hide the overlay
    addPhraseToDisplay(phraseArray); // Generate and display a new random phrase
});

// Event listener for the "Try Again (Failure)" button
document.querySelector('.btn__reset-failure').addEventListener('click', () => {
    resetGame(); // Reset the game
    overlay.style.display = 'none'; // Hide the overlay
    addPhraseToDisplay(phraseArray); // Generate and display a new random phrase
});

// Function to reset the game state
function resetGame() {
    missedGuesses = 0;
    const tries = document.querySelectorAll('.tries img');
    tries.forEach(heart => {heart.src = 'images/liveHeart.png';
    heart.style.display = 'inline-block'; // Show the hearts
});

    // Hide the phrase elements
    const phraseList = document.querySelectorAll('#phrase ul li');
    phraseList.forEach(li => li.remove());

    // Generate and set a new random phrase
    phraseArray = getRandomPhraseAsArray(phrases);
    addPhraseToDisplay(phraseArray);

    const keyboardButtons = document.querySelectorAll('#qwerty button');
    keyboardButtons.forEach(button => {
        button.classList.remove('chosen');
        button.disabled = false;
    });
}


// Function to get a random phrase as an array of characters
const getRandomPhraseAsArray = arr => {
    let randomIndex = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomIndex];
    return randomPhrase.split(''); // Return the selected phrase as an array of characters
};                                 //Split the phrase into an array of characters



//Function to set up the game display
const addPhraseToDisplay = arr => {
    const ul = document.querySelector('ul');
    ul.innerHTML = '';

    for (let i = 0; i < arr.length; i++) {
        const li = document.createElement('li');
        li.textContent = arr[i];
        ul.append(li);

        if (li.textContent.toLowerCase() !== ' ') {
            li.classList.add('letter');
        } else {
            li.classList.add('space');
        }
    }

}





//Function to check if a letter is in the phrase

const checkLetter = button => {
    const phraseLetters = document.querySelectorAll('.letter') // Store all of the li elements -created in addPhraseToDisplay
    let match = null;

    phraseLetters.forEach((letter) => {
        if (letter.textContent.toLowerCase() === button.textContent.toLowerCase()) {
            letter.classList.add('show'); // Show the letter
            match = letter.textContent;
        }
    });

    return match;
}

//Event listener for keyboard clicks

keyboard.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON' && !e.target.classList.contains('chosen')) {
        const button = e.target;
        button.classList.add('chosen'); // Mark the chosen letter
        button.disabled = true; // Disable the clicked button

        const letterGuessed = checkLetter(button);

        if (!letterGuessed) {
            const tries = document.querySelectorAll('.tries');
            const lostHeart = document.createElement('img');
            lostHeart.src = 'images/lostHeart.png';
            tries[missedGuesses].innerHTML = '';
            tries[missedGuesses].appendChild(lostHeart);
            missedGuesses++; // Increase missed count and display a lost heart
        }
        checkWin();// Check if the game is won or lost
    }

})

// check if the game has been won or lost
const checkWin = () => {
    const letterElements = document.querySelectorAll('.letter');
    const showElements = document.querySelectorAll('.show');

    if (letterElements.length === showElements.length) {

        overlay.className = 'win';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'Congratulations! You won!';
        startButton.remove();


        // Hide the phrase when displaying the win screen
        hidePhrase();

        const buttons = document.querySelectorAll('.chosen');
        buttons.forEach(function (element) {
            element.classList.remove('chosen');
            element.disabled = false;
        });
    } else if (missedGuesses >= 5) {
        overlay.className = 'lose';
        overlay.style.display = 'flex';
        overlay.querySelector('.title').textContent = 'Sorry, You Lose. Try Again!';
        startButton.remove()


        // Hide the phrase when displaying the lose screen
        hidePhrase();

        const buttons = document.querySelectorAll('.chosen');
        buttons.forEach(function (element) {
            element.classList.remove('chosen');
            element.disabled = false;
        });
    }
}

// Function to hide the phrase
function hidePhrase() {
    const phraseList = document.querySelectorAll('#phrase ul li');
    phraseList.forEach(li => li.style.display = 'none');
}

// Function to show the phrase
function showPhrase() {
    const phraseList = document.querySelectorAll('#phrase ul li');
    phraseList.forEach(li => li.style.display = 'list-item');
}



















