//target buttons
const startButton = document.getElementById("start-quiz");
const scoreForm = document.getElementById("score-form");

// game constants
let questionNumber = 0;
let score = 0;

const startQuiz = () => {
  // hide title and show questions
  const titleScreen = document.getElementById("title-screen");
  titleScreen.classList.add("hide");

  const questionScreen = document.getElementById("question-screen");
  questionScreen.classList.remove("hide");

  displayQuestion();
};

const displayQuestion = () => {
  // get question and answers
  questionNumber++;
  // check if there are more questions left
  if (questionNumber <= questions.length) {
    getQuestion();
    getAnswers();
    const getAnswerContainer = document.getElementById("answer-container");
    getAnswerContainer.addEventListener("click", isCorrect);
  } else {
    console.log("Questions finished");
    showScore();
  }
};

const getQuestion = () => {
  // get question and add it to HTML element

  currentQuestion = questions[questionNumber - 1].question;

  const questionText = document.getElementById("question-text");
  questionText.textContent = currentQuestion;
};

const getAnswers = () => {
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
    console.log(score);
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
  displayQuestion();
};

const showScore = () => {
  // get score entry
  const scoreScreen = document.getElementById("score-screen");
  const questionScreen = document.getElementById("question-screen");
  scoreScreen.removeAttribute("class", "hide");
  questionScreen.setAttribute("class", "hide");
};

const updateHighscore = (event) => {
  event.preventDefault();
  const initialsInput = document.querySelector('input[name="initials"]');
  const initials = initialsInput.value;
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

// add click event listener
startButton.addEventListener("click", startQuiz);
scoreForm.addEventListener("submit", updateHighscore);
