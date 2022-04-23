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
};

const getQuestion = () => {};

// add click event listener
startButton.addEventListener("click", startQuiz);
