// DOM Elements
const grid = document.querySelector(".grid"); // Get the grid element from the HTML
const scoreboard = document.querySelector("#score"); // Get the scoreboard element from the HTML

// Constants
const BOX_WIDTH = 100; // Width of a block
const BOX_HEIGHT = 20; // Height of a block
const BALL_DIAMETER = 20; // Diameter of the ball
const BOARD_WIDTH = 560; // Width of the game board
const BOARD_HEIGHT = 300; // Height of the game board
const MOVE_AMOUNT = 10; // Amount to move the user left or right

// Game State
let timerId; // Stores the timer ID for moving the ball
let xDirection = -2; // Initial x-direction for the ball's movement
let yDirection = 2; // Initial y-direction for the ball's movement
let score = 0; // Initialize the score

const userStartPosition = [230, 10]; // Initial position of the user
let currentUserPosition = userStartPosition; // Store the current user position

const ballStartPosition = [270, 30]; // Initial position of the ball
let currentBallPosition = ballStartPosition; // Store the current ball position

// Box class definition
class Box {
  constructor(x, y) {
    this.bottomLeft = [x, y]; // Store the bottom-left corner coordinates of a box
    this.bottomRight = [x + BOX_WIDTH, y]; // Store the bottom-right corner coordinates of a box
    this.topLeft = [x, y + BOX_HEIGHT]; // Store the top-left corner coordinates of a box
    this.topRight = [x + BOX_WIDTH, y + BOX_HEIGHT]; // Store the top-right corner coordinates of a box
  }
}

// Array of boxes
const boxes = [
  new Box(10, 270), new Box(120, 270), new Box(230, 270), new Box(340, 270), new Box(450, 270),
  new Box(10, 240), new Box(120, 240), new Box(230, 240), new Box(340, 240), new Box(450, 240),
  new Box(10, 210), new Box(120, 210), new Box(230, 210), new Box(340, 210), new Box(450, 210)
];

// Function to create boxes on the grid
function createBoxes() {
  for (let i = 0; i < boxes.length; i++) {
    const box = document.createElement("div"); // Create a new div element for a box
    box.classList.add("box"); // Add the "box" class to the div element
    box.style.left = boxes[i].bottomLeft[0] + "px"; // Set the left position of the box
    box.style.bottom = boxes[i].bottomLeft[1] + "px"; // Set the bottom position of the box
    grid.appendChild(box); // Add the box element to the grid
  }
}

createBoxes(); // Call the function to create boxes on the grid

// Create user element
const user = document.createElement("div"); // Create a new div element for the user
user.classList.add("user"); // Add the "user" class to the user div
drawUser(); // Call the drawUser function to set the initial user position
grid.appendChild(user); // Add the user element to the grid

// Function to draw the user on the grid
function drawUser() {
  user.style.left = currentUserPosition[0] + "px"; // Set the left position of the user element
  user.style.bottom = currentUserPosition[1] + "px"; // Set the bottom position of the user element
}

// Create ball element
const ball = document.createElement("div"); // Create a new div element for the ball
ball.classList.add("ball"); // Add the "ball" class to the ball div
drawBall(); // Call the drawBall function to set the initial ball position
grid.appendChild(ball); // Add the ball element to the grid

// Function to draw the ball on the grid
function drawBall() {
  ball.style.left = currentBallPosition[0] + "px"; // Set the left position of the ball element
  ball.style.bottom = currentBallPosition[1] + "px"; // Set the bottom position of the ball element
}

// Function to move the user
function moveUser(e) {
  switch (e.key) {
    case 'ArrowLeft':
      if (currentUserPosition[0] > 0) { // Check if user can move left within the board
        currentUserPosition[0] -= MOVE_AMOUNT; // Update the left position of the user
        drawUser(); // Redraw the user
      }
      break;
    case 'ArrowRight':
      if (currentUserPosition[0] < BOARD_WIDTH - BOX_WIDTH) { // Check if user can move right within the board
        currentUserPosition[0] += MOVE_AMOUNT; // Update the left position of the user
        drawUser(); // Redraw the user
      }
      break;
  }
}

document.addEventListener("keydown", moveUser); // Listen for user key presses and call moveUser

// Function to move the ball
function moveBall() {
  currentBallPosition[0] += xDirection; // Update the left position of the ball
  currentBallPosition[1] += yDirection; // Update the bottom position of the ball
  drawBall(); // Redraw the ball
  detectCollision(); // Check for collisions
}

timerId = setInterval(moveBall, 30); // Set a timer to call moveBall every 30 milliseconds

// Function to detect collisions
function detectCollision() {
  for (let i = 0; i < boxes.length; i++) {
    if (
      (currentBallPosition[0] > boxes[i].bottomLeft[0] &&
        currentBallPosition[0] < boxes[i].bottomRight[0]) &&
      ((currentBallPosition[1] + BALL_DIAMETER) > boxes[i].bottomLeft[1] && currentBallPosition[1] < boxes[i].topLeft[1])
    ) {
      const allBoxes = Array.from(document.querySelectorAll(".box")); // Get all box elements
      grid.removeChild(allBoxes[i]); // Remove the block element from the DOM
      boxes.splice(i, 1); // Remove the box object from the array
      changeDirection(); // Change the ball's direction
      score++; // Increment the score
      scoreboard.innerHTML = score; // Update the scoreboard
    }
  }
  if (
    currentBallPosition[0] >= (BOARD_WIDTH - BALL_DIAMETER) ||
    currentBallPosition[1] >= (BOARD_HEIGHT - BALL_DIAMETER) ||
    currentBallPosition[0] <= 0
  ) {
    changeDirection();
  }

  if (
    (currentBallPosition[0] > currentUserPosition[0] && currentBallPosition[0] < currentUserPosition[0] + BOX_WIDTH) &&
    (currentBallPosition[1] > currentUserPosition[1] && currentBallPosition[1] < currentUserPosition[1] + BOX_HEIGHT)
  ) {
    changeDirection();
  }

  // Game over
  if (currentBallPosition[1] <= 0) {
    clearInterval(timerId);
    scoreboard.innerHTML = "GAME OVER";
    document.removeEventListener("keydown", moveUser);

    if (boxes.length === 0) {
    endGame("Congratulations! You won!");
    }

  // Additional game over conditions can be added here
}

// Function to change the ball's direction
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
  } else if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
  } else if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
  } else if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
  }
}


function clearGrid() {
    const allBoxes = document.querySelectorAll(".box");
    allBoxes.forEach((box) => {
      grid.removeChild(box);
    });
  }

function endGame(message) {
    clearInterval(timerId); // Stop the game timer
    scoreboard.innerHTML = message; // Display an end game message
    document.removeEventListener("keydown", moveUser); // Remove the ability to move the user
    // Clear the grid and create a new set of boxes
    clearGrid();
    createBoxes(15); // Adjust the number of boxes as needed

  }}