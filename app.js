const keyboard = document.getElementById("qwerty");
const phrase = document.getElementById("phrase");
let startButton = document.querySelector(".btn__reset");
const overlay = document.getElementById("overlay");

let missed = 0;

// 3.
startButton.addEventListener("click", (e) => {
  overlay.style.display = "none";
});

// 4.
const arrOfPhrases = [
  "Eine Schwalbe macht noch keinen Sommer",
  "Alter schuetzt vor der Liebe nicht aber Liebe vor dem Altern",
  "Wer nicht wagt der nicht gewinnt",
  "Alte Fuechse gehen schwer in die Falle",
  "Auch ein blindes Huhn findet mal ein Korn",
];

// 5.
//return a random phrase from an array
function getRandomPhraseAsArray(arr) {
  const randomNumber = Math.floor(Math.random() * arr.length);
  let randomArray = arr[randomNumber];
  return randomArray.split("");
}

const randomPhraseArray = getRandomPhraseAsArray(arrOfPhrases);
console.log(randomPhraseArray);

// 6.
//adds the letterElements of a string of characters to the display
function addPhraseToDisplay(arr) {
  let phraseList = document.querySelector("#phrase ul");
  phraseList.innerHTML = "";

  for (let i = 0; i < arr.length; i++) {
    let character = arr[i];
    let li = document.createElement("li");
    li.textContent = character;

    if (character !== " ") {
      li.classList.add("letter");
    } else {
      li.classList.add("space");
    }
    phraseList.appendChild(li);
  }
}

const phraseArray = getRandomPhraseAsArray(arrOfPhrases);
addPhraseToDisplay(phraseArray);

// 7.
//check if a letter is in the phrase
function checkLetter(button) {
  const letterElements = document.querySelectorAll(".letter");
  let match = null;

  for (let i = 0; i < letterElements.length; i++) {
    const letterElement = letterElements[i];
    const letter = letterElement.textContent.toLowerCase();

    if (letter === button.textContent.toLowerCase()) {
      letterElement.classList.add("show");
      match = letter;
    }
  }
  return match;
}

// 8. Add an event listener to the keyboard.
// 9.Count the missed guesses in the game.
keyboard.addEventListener("click", (event) => {
  if (event.target.tagName === "BUTTON") {
    const button = event.target;
    button.classList.add("chosen");
    button.disabled = true;

    const letterFound = checkLetter(button);

    if (letterFound === null) {
      missed++;

      const tries = document.querySelectorAll(".tries")[missed - 1];
      const heartImage = tries.querySelector("img");
      heartImage.src = "images/lostHeart.png";
    }
  }
  checkWin();
});

// 10.
//check if the game has been won or lost
function checkWin() {
  const showElements = document.querySelectorAll(".show");
  const letterElements = document.querySelectorAll(".letter");

  if (letterElements.length === showElements.length) {
    overlay.className = "win";
    overlay.querySelector(".title").textContent = "Congrulations, you WIN!";
    overlay.style.display = "flex";
  } else if (missed >= 5) {
    overlay.className = "lose";
    overlay.querySelector(".title").textContent = "Sorry, you LOSE!";
    overlay.style.display = "flex";
  }
}

// 11
// Reset the game

startButton.addEventListener("click", () => {
  resetGame();
  overlay.style.display = "none";
});

function resetGame() {
  const phraseList = document.querySelector("#phrase ul");
  phraseList.innerHTML = "";

  const buttons = keyboard.querySelectorAll("button");
  for (let i = 0; i < buttons.length; i++) {
    const button = buttons[i];
    button.classList.remove("chosen");
    button.disabled = false;
  }

  missed = 0;

  const tries = document.querySelectorAll(".tries");
  for (let i = 0; i < tries.length; i++) {
    const heartImage = tries[i].querySelector("img");
    heartImage.src = "images/liveHeart.png";
  }

  const newPhraseArray = getRandomPhraseAsArray(arrOfPhrases);
  addPhraseToDisplay(newPhraseArray);
}
