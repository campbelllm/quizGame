const startButton = document.querySelector(".startButton");
const container = document.querySelector(".container");
const timer = document.querySelector(".timer");
const question = document.querySelector(".question");
const userSelections = document.querySelector(".userSelections");
const correct = document.querySelector(".correct");
const wrong = document.querySelector(".wrong");
const viewScores = document.querySelector(".viewScores");
const viewScoresContainer = document.querySelector(".viewScoresContainer");
const viewScoreList = document.querySelector(".viewScoreList");
const highScoreContainer = document.querySelector(".highScoreContainer");
const finalScore = document.querySelector(".finalScore");
const scoreButton = document.querySelector(".scoreButton");
const userName = document.querySelector(".userName");
const highScoreList = document.querySelector(".highScoreList");
const restartButton = document.querySelector(".restartButton");
const btn = document.querySelector('.btn')

const userScores = [];

let score = 0;
let index = 0;
let count = 60;

startButton.addEventListener("click", startQuiz);

function startQuiz() {
  startButton.classList.add("hide");
  container.classList.remove("hide");
  questionSelector(questions);
  timeLeft();
}

viewScores.addEventListener("click", function () {
  startButton.classList.add("hide");
  viewScoresContainer.classList.remove("hide");
  for (let i = 0; i < userScores.length; i++) {
    const user = JSON.parse(localStorage.getItem("userScores"));
    const userList = document.createElement("li");
    userList.innerText = user[i];
    viewScoreList.appendChild(userList);
  }
});

function timeLeft() {
  var countdown = setInterval(function () {
    timer.textContent = "Time Left: " + count;
    count--;
    if (count < 0) {
      count = 0;
      clearInterval(countdown);
      alert("You ran out of time!");
      highScoreContainer.classList.remove("hide");
      finalScore.textContent = "Final Score: " + score;
      container.classList.add("hide");
    }
  }, 1000);
}

function storeUsers() {
  // Add code here to stringify the todos array and save it to the "todos" key in localStorage
  localStorage.setItem("userScores", JSON.stringify(userScores));
}

scoreButton.addEventListener("click", function (event) {
  highScoreList.innerHTML = "";
  event.preventDefault();
  const userText = userName.value;
  userScores.push(userText + "        SCORE: " + score);
  userName.value = "";
  storeUsers();
  renderUsers();
  userName.value = "";
  restartButton.classList.remove("hide");
});

function renderUsers() {
  for (let i = 0; i < userScores.length; i++) {
    const user = JSON.parse(localStorage.getItem("userScores"));
    const userList = document.createElement("li");
    userList.innerText = user[i];
    highScoreList.appendChild(userList);
  }
}

function questionSelector(arr) {
  question.innerText = arr[index].question;
  userSelections.innerHTML = "";
  arr[index].answers.forEach((answer) => {
    const button = document.createElement("button");
    button.innerText = answer.text;
    button.classList.add("btn");
    button.setAttribute("data-correct", answer.correct);
    button.addEventListener("click", function (event) {
      correctWrong(event.target.dataset.correct);  
    });
    userSelections.appendChild(button);
  });
}

function endQuiz() {
  if (index === questions.length) {
    highScoreContainer.classList.remove("hide");
    finalScore.textContent = "Final Score: " + score;
    container.classList.add("hide");
    count = 0;
    //this stops the alert from happening
    alert = function(){};
  }
}

function correctWrong(selection) {
  if (selection === "true") {
    correct.classList.remove("hide");
    score++;
  } else {
    wrong.classList.remove("hide");
    if (count > 0) {
      count -= 1;
    }
  }
  index++;
  endQuiz();
  console.log(index);
  setTimeout(() => {
    correct.classList.add("hide");
    wrong.classList.add("hide");
    questionSelector(questions);
  }, 500);
}

restartButton.addEventListener("click", function () {
  restartButton.classList.add("hide");
  highScoreContainer.classList.add("hide");
  startButton.classList.remove("hide");
  index = 0;
});

const questions = [
  {
    question: "Which is not a data type?",
    answers: [
      { text: "string", correct: false },
      { text: "object", correct: false },
      { text: "array", correct: true },
      { text: "symbol", correct: false },
    ],
  },
  {
    question: "Which html element do we link our Javascript file? ",
    answers: [
      { text: "<style>", correct: false },
      { text: "<head>", correct: false },
      { text: "<body>", correct: false },
      { text: "<script>", correct: true },
    ],
  },
  {
    question: "What is the correct way to console.log Hello World?",
    answers: [
      { text: `console.log('Hello World')`, correct: true },
      { text: `consolelog Hello World `, correct: false },
      { text: `return 'Hello World'`, correct: false },
      { text: `console('Hello World')`, correct: false },
    ],
  },
  {
    question: "How would you invoke a function called myName?",
    answers: [
      { text: "myName", correct: false },
      { text: "myName()", correct: true },
      { text: "call myName", correct: false },
      { text: ".myName", correct: false },
    ],
  },
];
