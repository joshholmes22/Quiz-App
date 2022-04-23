//target buttons
const startButton = document.getElementById("start-quiz");

// game constants
let questionNumber = 0;
let score = 0;

const startQuiz = () => {
  // get title screen
  const titleScreen = document.getElementById("title-screen");
  titleScreen.classList.add("hide");
  // get question screen
  const questionScreen = document.getElementById("question-screen");
  questionScreen.classList.remove("hide");

  // display question
  displayQuestion();
};

const displayQuestion = () => {
  // get question and answers
  getQuestion();
  getAnswers();
  // add listener to button container
  const getAnswerContainer = document.getElementById("answer-container");
  getAnswerContainer.addEventListener("click", isCorrect);
};

const getQuestion = () => {
  // get next question number
  questionNumber++;
  currentQuestion = questions[questionNumber - 1].question;
  // get question and add it to HTML element
  const questionText = document.getElementById("question-text");
  questionText.textContent = currentQuestion;
};

const getAnswers = () => {
  // generate and create HTML elements to display answers
  const answerContainer = document.getElementById("answer-container");

  for (let i = 0; i < 4; i++) {
    // create button
    const answer = document.createElement("button");
    // add styling
    answer.setAttribute("class", "answer btn");
    // get answer array
    currentAnswers = questions[questionNumber - 1].answers;
    // add answer text to button
    answer.textContent = currentAnswers[i].text;
    answer.setAttribute("data-answer", currentAnswers[i].correct);
    // append to section
    answerContainer.append(answer);
  }
};

const isCorrect = (event) => {
  const target = event.target;
  const isAnswerCorrect = target.getAttribute("data-answer");

  if (isAnswerCorrect === "true") {
    console.log("Correct Answer!");
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
