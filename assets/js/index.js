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

// game constants
let questionNumber = 0;
let score = 0;
let highScoreArray = JSON.parse(localStorage.getItem("highScores")) || [];

// start quiz
const startQuiz = () => {
  titleScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
  displayQuestions();
};

// display questions

const displayQuestions = () => {
  // check if there are questions left and display question with answers
  questionNumber++;
  if (questionNumber <= questions.length) {
    getCurrentQuestion();
    getCurrentAnswers();
    const getAnswerContainer = document.getElementById("answer-container");
    getAnswerContainer.addEventListener("click", isCorrect);
  } else {
    gameOver();
  }
};

const getCurrentQuestion = () => {
  currentQuestion = questions[questionNumber - 1].question;

  const questionText = document.getElementById("question-text");
  questionText.textContent = currentQuestion;
};

const getCurrentAnswers = () => {
  // generate and create HTML elements to display answers
  const answerContainer = document.getElementById("answer-container");

  for (let i = 0; i < 4; i++) {
    // create answer buttons
    const answer = document.createElement("button");
    answer.setAttribute("class", "answer btn");
    currentAnswers = questions[questionNumber - 1].answers;
    answer.textContent = currentAnswers[i].text;
    answer.setAttribute("data-answer", currentAnswers[i].correct);
    answerContainer.append(answer);
  }
};

const isCorrect = (event) => {
  const target = event.target;
  const isAnswerCorrect = target.getAttribute("data-answer");

  if (isAnswerCorrect === "true") {
    score += 100;
    loadNextQuestion();
  } else {
    loadNextQuestion();
  }
};

const loadNextQuestion = () => {
  // find and remove question answer
  const answerSection = document.getElementById("question-screen");
  const answerContainer = document.getElementById("answer-container");
  answerContainer.remove();
  // create new answer container ready for next question
  const nextAnswer = document.createElement("div");
  nextAnswer.setAttribute("class", "answer-container");
  nextAnswer.setAttribute("id", "answer-container");
  answerSection.append(nextAnswer);
  displayQuestions();
};

// when questions finished - display form to enter initials

const gameOver = () => {
  gameOverScreen.classList.remove("hide");
  questionScreen.classList.add("hide");
  const userScoreText = document.getElementById("display-final-score");
  userScoreText.innerHTML = "Your final score is: " + score;
};

const onFormSubmit = (event) => {
  event.preventDefault();
  const formInput = document.querySelector('input[name="initials"]');
  const userInitials = formInput.value;
  const newScore = {
    score: score,
    initials: userInitials,
  };
  highScoreArray.push(newScore);
  highScoreArray.sort((a, b) => b.score - a.score);
  highScoreArray.splice(5);
  localStorage.setItem("highScores", JSON.stringify(highScoreArray));

  gameOverScreen.classList.add("hide");
  header.classList.add("hide");
  highScoreScreen.classList.remove("hide");

  displayHighScores();
};

// when form submitted - display highscores

// have options to clear highscores or go back to home

const goHome = () => {
  highScoreScreen.classList.add("hide");
  header.classList.remove("hide");
  titleScreen.classList.remove("hide");
  questionNumber = 0;
  score = 0;
};

// if high scores button is pressed, display high scores screen

const viewHighScores = () => {
  header.classList.add("hide");
  if (!titleScreen.classList.contains("hide")) {
    titleScreen.classList.add("hide");
  } else if (!questionScreen.classList.contains("hide")) {
    questionScreen.classList.add("hide");
    const currentAnswers = document.getElementById("answer-container");
    while (currentAnswers.firstChild) {
      currentAnswers.removeChild(currentAnswers.firstChild);
    }
  }
  highScoreScreen.classList.remove("hide");
  displayHighScores();
};

// display high scores from local storage
const displayHighScores = () => {
  const scoreList = clearScores();

  for (let i = 0; i < highScoreArray.length; i++) {
    const scoreItem = document.createElement("li");
    scoreItem.textContent =
      highScoreArray[i].initials + " - " + highScoreArray[i].score;
    scoreList.appendChild(scoreItem);
  }
};

// clear scores page
const clearScores = () => {
  const scoreList = document.getElementById("score-list");

  while (scoreList.firstChild) {
    scoreList.removeChild(scoreList.firstChild);
  }

  return scoreList;
};

// clear local storage
const clearLocalStorage = () => {
  window.localStorage.clear();
  highScoreArray = [];
  clearScores();
};

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

// click event listeners
startBtn.addEventListener("click", startQuiz);
initalsForm.addEventListener("submit", onFormSubmit);
homeBtn.addEventListener("click", goHome);
clearBtn.addEventListener("click", clearLocalStorage);
viewScoresBtn.addEventListener("click", viewHighScores);
