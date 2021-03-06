const startButton = document.querySelector(".startButton");
const startContainer = document.querySelector('.startContainer')
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
const goBack = document.querySelector('.goBack')

// will push user scores and names, then this array gets sent to local storage
const userScores = [];

let score = 0;
let index = 0;
let count = 60;

startButton.addEventListener("click", startQuiz);

// starts timer and invokes question function to start looping through questions 
function startQuiz() {
  startContainer.classList.add("hide");
  container.classList.remove("hide");
  questionSelector(questions);
  timeLeft();
}

// function for timer to run
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

// functions to display scores when view scores link is clicked in nav
viewScores.addEventListener("click", function () {
  viewScoreList.innerHTML = "";
  if(!userScores.length){
    alert('There are no scores')
    return false;
  }
  startContainer.classList.add("hide");
  viewScoresContainer.classList.remove("hide");
  for (let i = 0; i < userScores.length; i++) {
    const user = JSON.parse(localStorage.getItem("userScores"));
    const userList = document.createElement("li");
    userList.innerText = user[i];
    viewScoreList.appendChild(userList);
  }
  highScoreContainer.classList.add('hide')
  restartButton.classList.add('hide')
  index = 0;
  count = 60;
});

// this allows user to go back to main screen from view scores link
goBack.addEventListener('click', function(){
  startContainer.classList.remove("hide");
  viewScoresContainer.classList.add("hide");
  userName.classList.remove('hide')
  scoreButton.classList.remove('hide')
})

//setting which question and answer to display, creating element for them to be displayed
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

//after user selects an answer, we display correct or wrong
function correctWrong(selection) {
  if (selection === "true") {
    correct.classList.remove("hide");
    score++;
  } else {
    wrong.classList.remove("hide");
    if (count > 0) {
      count -= 5;
    }
  }
  index++;
  endQuiz();
  setTimeout(() => {
    correct.classList.add("hide");
    wrong.classList.add("hide");
    questionSelector(questions);
  }, 500);
}

// quiz is over, show our score
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

// sending our array to local storage
function storeUsers() {
  localStorage.setItem("userScores", JSON.stringify(userScores));
}

//quiz is finished, user inputs name and submits, user name and score pushed to array
scoreButton.addEventListener("click", function (event) {
  highScoreList.innerHTML = "";
  event.preventDefault();
  if(!userName.value){
      return false;
  };
  const userText = userName.value;
  userScores.push(userText + " _____ " + "SCORE: " + score);
  storeUsers();
  renderUsers();
  userName.classList.add('hide')
  scoreButton.classList.add('hide')
  restartButton.classList.remove("hide");
});

// creating li to display userScore array info
function renderUsers() {
  for (let i = 0; i < userScores.length; i++) {
    const user = JSON.parse(localStorage.getItem("userScores"));
    const userList = document.createElement("li");
    userList.innerText = user[i];
    highScoreList.appendChild(userList);
  }
}

//restart to send us back to homepage after we have entered our name for score
restartButton.addEventListener("click", function () {
  restartButton.classList.add("hide");
  highScoreContainer.classList.add("hide");
  startContainer.classList.remove("hide");
  userName.classList.remove('hide')
  scoreButton.classList.remove('hide')
  index = 0;
  count = 60;
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
  {
    question: "Which built-in method returns the length of the string?",
    answers: [
      { text: ".size()", correct: false },
      { text: ".index()", correct: false },
      { text: ".length()", correct: true },
      { text: ".end()", correct: false },
    ],
  },
  {
    question: "Which of the following function of Number object returns the number's value?",
    answers: [
      { text: "toString()", correct: false },
      { text: "valueOf()", correct: true },
      { text: "typeOf()", correct: false },
      { text: "toNumber()", correct: false },
    ],
  },
  {
    question: "What index does an array start at?",
    answers: [
      { text: "null", correct: false },
      { text: "-1", correct: false },
      { text: "1", correct: false },
      { text: "0", correct: true},
    ],
  },
  {
    question: "What will add an item onto the end of an array?",
    answers: [
      { text: ".push()", correct: true },
      { text: ".pop()", correct: false },
      { text: ".unshift()", correct: false },
      { text: ".map()", correct: false },
    ],
  },
  {
    question: "How would you create new HTML element usinsg Javascript?",
    answers: [
      { text: "document.getElementbyId()", correct: false },
      { text: "decument.createElement()", correct: true },
      { text: ".creatHTMLElement()", correct: false },
      { text: "html.newElement()", correct: false },
    ],
  },
  {
    question: "What method can you use to join two arrays?",
    answers: [
      { text: ".splice()", correct: false },
      { text: ".add()", correct: true },
      { text: ".concat()", correct: false },
      { text: ".push()", correct: false },
    ],
  },
];

