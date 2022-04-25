// get screens
const header = document.getElementById("header");
const titleScreen = document.getElementById("title-screen");
const questionScreen = document.getElementById("question-screen");
const gameOverScreen = document.getElementById("game-over-screen");
const highScoreScreen = document.getElementById("high-score-screen");
const highScoreError = document.getElementById("high-score-error");
const timerItem = document.getElementById("timer");

// target buttons
const startBtn = document.getElementById("start-btn");
const initalsForm = document.getElementById("initials-form");
const homeBtn = document.getElementById("home-btn");
const clearBtn = document.getElementById("clear-btn");
const viewScoresBtn = document.getElementById("view-scores-btn");

// variables
const timerAmount = 60;
const timePenalty = 10;
const scoreAmount = 100;

// game constants
let questionNumber = 0;
let score = 0;
let highScoreArray = JSON.parse(localStorage.getItem("highScores")) || [];
let timer = timerAmount;
let timeRemaining = true;
let timing = null;
let timerStarted = false;
let questions = [];

// get questions

fetch("https://opentdb.com/api.php?amount=10&difficulty=easy&type=multiple")
  .then((result) => {
    return result.json();
  })
  .then((loadedQuestions) => {
    questions = loadedQuestions.results.map((loadedQuestions) => {
      const formattedQuestions = {
        question: loadedQuestions.question,
        answers: [
          { text: loadedQuestions.correct_answer, correct: true },
          { text: loadedQuestions.incorrect_answers[0], correct: false },
          { text: loadedQuestions.incorrect_answers[1], correct: false },
          { text: loadedQuestions.incorrect_answers[2], correct: false },
        ],
      };
      shuffleAnswers(formattedQuestions.answers);
      return formattedQuestions;
    });
  })
  .catch((err) => {
    console.error(err);
  });

const shuffleAnswers = (answersArray) => {};

// start quiz
const startQuiz = () => {
  titleScreen.classList.add("hide");
  questionScreen.classList.remove("hide");
  displayQuestions();
};

// display questions

const displayQuestions = () => {
  // check if there are questions left and display question with answers
  timerItem.classList.remove("hide");
  if (!timerStarted) {
    timerItem.innerHTML = "Time Remaining: " + timerAmount;
    timing = setInterval(startTimer, 1000);
    timerStarted = true;
  }
  questionNumber++;
  if (questionNumber <= questions.length && timeRemaining) {
    getCurrentQuestion();
    getCurrentAnswers();
    const getAnswerContainer = document.getElementById("answer-container");
    getAnswerContainer.addEventListener("click", isCorrect);
  } else {
    gameOver();
  }
};

const startTimer = () => {
  timer--;
  timerItem.innerHTML = "Time Remaining: " + timer;
  if (timer <= 0) {
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
    answer.setAttribute("id", i);
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
    score += scoreAmount;
    target.classList.add("btn-correct");
    target.classList.remove("btn");
    setTimeout(loadNextQuestion, 500);
  } else {
    timer -= timePenalty;
    target.classList.add("btn-incorrect");
    target.classList.remove("btn");
    correctAnswer = findCorrectAnswer();
    const correctButton = document.getElementById(correctAnswer);
    correctButton.classList.add("btn-correct");
    correctButton.classList.remove("btn");
    setTimeout(loadNextQuestion, 500);
  }
};

const findCorrectAnswer = () => {
  const allAnswers = questions[questionNumber - 1].answers;
  for (let i = 0; i < allAnswers.length; i++) {
    if (allAnswers[i].correct) {
      return i;
    }
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
  clearTimeout(timing);
  document.querySelector('input[name="initials"]').value = "";
  gameOverScreen.classList.remove("hide");
  questionScreen.classList.add("hide");
  header.classList.add("hide");
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
  clearAnswers();
  highScoreScreen.classList.add("hide");
  header.classList.remove("hide");
  titleScreen.classList.remove("hide");
  timerItem.classList.add("hide");
  questionNumber = 0;
  score = 0;
  timerStarted = false;
  timer = timerAmount;
};

// if high scores button is pressed, display high scores screen

const viewHighScores = () => {
  clearTimeout(timing);
  header.classList.add("hide");
  if (!titleScreen.classList.contains("hide")) {
    titleScreen.classList.add("hide");
  } else if (!questionScreen.classList.contains("hide")) {
    questionScreen.classList.add("hide");
    clearAnswers();
  }
  highScoreScreen.classList.remove("hide");
  displayHighScores();
};

// clear answers
const clearAnswers = () => {
  const currentAnswers = document.getElementById("answer-container");
  while (currentAnswers.firstChild) {
    currentAnswers.removeChild(currentAnswers.firstChild);
  }
};

// display high scores from local storage
const displayHighScores = () => {
  const scoreList = clearScores();

  if (highScoreArray.length === 0) {
    highScoreError.classList.remove("hide");
  } else {
    if (!highScoreError.classList.contains("hide")) {
      highScoreError.classList.add("hide");
    }
    for (let i = 0; i < highScoreArray.length; i++) {
      const scoreItem = document.createElement("li");
      scoreItem.textContent =
        highScoreArray[i].initials.toUpperCase() +
        " - " +
        highScoreArray[i].score;
      scoreList.appendChild(scoreItem);
    }
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
  highScoreError.classList.remove("hide");
  window.localStorage.clear();
  highScoreArray = [];
  clearScores();
};

const oldQuestions = [
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
