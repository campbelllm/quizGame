const $startButton = document.querySelector('.startButton');
const $container = document.querySelector('.container');
const $timer = document.querySelector('.timer')
const $question = document.querySelector('.question')
const $answer = document.querySelector('.answer')
const $btn = document.querySelector('.btn')

$startButton.addEventListener('click', startQuiz)

   

function startQuiz() {
    $startButton.classList.add('hide');
    $container.classList.remove('hide');
    nextQuestion();
    timeLeft()
   
}

function nextQuestion(){
    questionSelector(questions)
}

function timeLeft(){
    let count = 15;
    let timer = setInterval(function() {
        $timer.textContent = "Time Left:" + count;
        console.log(count);
        count--;
        if(count === -1) {
            clearInterval(timer);
            alert('You ran out of time!')
        }
    }, 1000);  
}

let index = 0;
console.log(index)
function indexCount(){
    index++
}
   


function questionSelector(arr){
    $question.innerText = arr[index].question
    console.log(arr)
        arr[index].answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        $answer.appendChild(button);
        button.addEventListener('click', indexCount) 
        // if (answer.correct) {
        //   button.dataset.correct = answer.correct
        // }
        // button.addEventListener('click', selectAnswer)
        // answerButtonsElement.appendChild(button)
      })
}



const questions = [
    {
      question: 'Which is not a data type?',
      answers: [
        { text: 'string', correct: false },
        { text: 'object', correct: false },
        { text: 'array', correct : true},
        { text: 'symbol', correct: false}
      ]
    },
    {
      question: 'Which html element do we link our Javascript file? ',
      answers: [
        { text: '<style>', correct: false },
        { text: '<head>', correct: false },
        { text: '<body>', correct: false },
        { text: '<script', correct: true }
      ]
    },
    {
      question: 'What is the correct way to console.log Hello World?',
      answers: [
        { text: `console.log('Hello World')`, correct: true },
        { text: `consolelog Hello World `, correct: false },
        { text: `return 'Hello World'`, correct: false },
        { text: `console('Hello World')`, correct: false }
      ]
    },
    {
      question: 'How would you invoke a function called myName?',
      answers: [
        { text: 'myName', correct: false },
        { text: 'myName()', correct: true },
        { text: 'call myName', correct: false },
        { text: '.myName', correct: false }
      ]
    }
  ]
  