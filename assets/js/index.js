//target buttons
const startButton = document.getElementById("start-quiz");

const startQuiz = () => {
  // get title screen
  const titleScreen = document.getElementById("title-screen");
  titleScreen.classList.add("hide");
  // get question screen
  const questionScreen = document.getElementById("question-screen");
  questionScreen.classList.remove("hide");

  // display question
  getQuestion();
};

const getQuestion = () => {
  const questionText = document.getElementById("question-text");
  questionText.textContent = "Javascript text";
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
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
      { text: "right", correct: true },
      { text: "wrong", correct: false },
    ],
  },
  {
    question: "Question 3 goes here",
    answers: [
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
      { text: "right", correct: true },
      { text: "wrong", correct: false },
    ],
  },
  {
    question: "Question 4 goes here",
    answers: [
      { text: "wrong", correct: false },
      { text: "wrong", correct: false },
      { text: "right", correct: true },
      { text: "wrong", correct: false },
    ],
  },
];

// add click event listener
startButton.addEventListener("click", startQuiz);
