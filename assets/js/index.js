// get screens
const header = document.getElementById("header");
const titleScreen = document.getElementById("title-screen");
const questionScreen = document.getElementById("question-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const highScoreScreen = document.getElementById("high-score-screen");

// target buttons
const startBtn = document.getElementById("start-btn");
const initalsForm = document.getElementById("initials-form");
const homeBtn = document.getElementById("home-btn");
const clearBtn = document.getElementById("clear-btn");
const viewScoresBtn = document.getElementById("view-scores-btn");

// click event listeners
startBtn.addEventListener("click");
initalsForm.addEventListener("submit");
homeBtn.addEventListener("click");
clearBtn.addEventListener("click");
viewScoresBtn.addEventListener("click");

// navigation
const startQuiz = () => {};

const questions = [
  {
    question: "Question 1 goes here",
    answers: [
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
      { text: "right", correct: true },
      { text: "wrong", correct: false },
    ],
  },
  {
    question: "Question 2 goes here",
    answers: [
      { text: "right", correct: true },
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
    ],
  },
  {
    question: "Question 3 goes here",
    answers: [
      { text: "wrong", correct: false },
      { text: "right", correct: true },
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
    ],
  },
  {
    question: "Question 4 goes here",
    answers: [
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
      { text: "right", correct: true },
    ],
  },
];
