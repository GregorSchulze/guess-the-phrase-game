const keyboard = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let startButon = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

let missed= 0;

// 3.
startButon.addEventListener('click', (e) => {
    overlay.style.display = 'none';
});

// 4.
const phrases = [
    'This fall the weather is going to be beautiful',
    'The cat on the roof is scared by the dog looking at her',
    'The trip to Florida last week was an amazing experience',
    'The Appalachian Mountains offer incredible hiking trails',
    'The hotel on the right side of the street is beautiful'
];

// 5.
//return a random phrase from an array 
const getRandomPhraseAsArray = arr => {
    let randomNumber = Math.floor(Math.random() * arr.length);
    let randomPhrase = arr[randomNumber];
    return randomPhrase.split(''); // Return the selected phrase as an array of characters
}; 

const randomPhraseArray = getRandomPhraseAsArray(phrases);
console.log(randomPhraseArray);

// 6.
//adds the letters of a string of characters to the display 
function addPhraseToDisplay(arr) {
    const phraseList = document.querySelector('#phrase ul');
    phraseList.innerHTML = '';
  
    for (let i = 0; i < arr.length; i++) {
      const character = arr[i];
      const li = document.createElement('li');
      li.textContent = character;
  
      if (character !== ' ') {
        li.classList.add('letter');
      } else {
        li.classList.add('space');
      }
  
      phraseList.appendChild(li);
    }
  }

const phraseArray = getRandomPhraseAsArray(phrases);
addPhraseToDisplay(phraseArray); 


// 7.
//check if a letter is in the phrase 
function checkLetter(button) {
    const letterElements = document.querySelectorAll('.letter');
    let match = null;
  
    for (let i = 0; i < letterElements.length; i++) {
      const letterElement = letterElements[i];
      const letter = letterElement.textContent.toLowerCase();
  
      if (letter === button.textContent.toLowerCase()) {
        letterElement.classList.add('show');
        match = letter;
      }
    }
  
    return match;
  }


// 8. & 9.
keyboard.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      const button = event.target;
      button.classList.add('chosen');
      button.disabled = true;
  
      const letterFound = checkLetter(button);
      
      if (letterFound === null) {
         missed++;

        const tries = document.querySelectorAll('.tries')[missed - 1];
        const heartImage = tries.querySelector('img');
        heartImage.src = 'images/lostHeart.png';
      } 
      checkWin();
    }
})

// 10.
//check if the game has been won or lost 
function checkWin() {
    const letterElements = document.querySelectorAll('.letter');
    const showElements = document.querySelectorAll('.show');
  
    
    if (letterElements.length === showElements.length) {
      
      overlay.className = 'win';
      overlay.style.display = 'flex';
      overlay.querySelector('.title').textContent = 'Congratulations, you win!';
    } else if (missed >= 5) {
      
      overlay.className = 'lose';
      overlay.style.display = 'flex';
      overlay.querySelector('.title').textContent = 'Sorry, you lose!';
    }
  }
