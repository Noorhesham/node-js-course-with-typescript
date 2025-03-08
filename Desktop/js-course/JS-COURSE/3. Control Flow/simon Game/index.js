// our data containers
let userSequence = [];
// this seqeuence resets on each round
// the goal of it is to compare each value in the array with its corrresponding value in the
//main sequence array to check if the user has enterd the right input or not

const colors = ["red", "green", "blue", "yellow"];

let sequence = [];
// store the sequence for the memory of the game or the app

let userCanClick = false;
// prevent the user from clicking or choosing any color during the game or during the flashing
// of input to the user
let round = 0; // keep track of current round

// ui elements
const roundElement = document.getElementById("round");
const colorBtns = document.querySelectorAll(".color-btn");
const gameOverModel = document.getElementById("game-over");

const startGame = function () {
  round = 0;
  sequence = [];
  userSequence = [];
  gameOverModel.style.display = "none";
  userCanClick = false;

  roundElement.textContent = round;
  addNewSequence();
};

//decleration
function addNewSequence() {
  // 0 1 2 3  4 this is getting a random color from the colors array to add it to the sequecne that the user
  // must follow
  userCanClick = false;
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  sequence.push(randomColor);
  for (let i = 0; i < sequence.length; i++) {
    const element = sequence[i];
    setTimeout(function () {
      flashColors(element);
    }, 1000 * i);
  }
  setTimeout(function () {
    userCanClick = true;
  }, sequence.length * 1000);
}

//expression
const flashColors = function (color) {
  const btn = document.getElementById(color);
  btn.classList.add("pressed");
  setTimeout(function () {
    btn.classList.remove("pressed");
  }, 500);
};
const userTurn = function (btn) {
  console.log(btn);
  if (!userCanClick) return;
  userSequence.push(btn.dataset.color);
  checkUserInput();
};
const checkUserInput = function () {
  for (let i = 0; i < userSequence.length; i++) {
    if (userSequence[i] !== sequence[i]) {
      gameOver();
      return;
    }
  }
  if (userSequence.length === sequence.length) {
    nextRound();
  }
};
const gameOver = function () {
  console.log("Game Over! You reached round " + round);
  // Display Game Over message on the screen.
  gameOverModel.style.display = "block";
  document.getElementById("final-round").textContent = round;
};
const nextRound = function () {
  round++;
  roundElement.textContent = round;
  userSequence = [];
  addNewSequence();
};
colorBtns.forEach((btn) => {
  console.log(btn);
  btn.addEventListener("click", function () {
    userTurn(btn);
  });
});
