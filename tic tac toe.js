console.log("Welcome to Tic Tac Toe")
let music = new Audio("music.mp3")
let audioTurn = new Audio("ting.mp3")
let gameover = new Audio("gameover.mp3")
let turn = "X"
let RightAnswer = true 
let isgameover = false;
let questionAttempted = false;
// Function to change the turn
const changeTurn = ()=>{
    return turn === "X"? "0": "X"
   
    

}

// Function to check for a win
const checkWin = ()=>{
    let boxtext = document.getElementsByClassName('boxtext');
    let wins = [
        [0, 1, 2, 5, 5, 0],
        [3, 4, 5, 5, 15, 0],
        [6, 7, 8, 5, 25, 0],
        [0, 3, 6, -5, 15, 90],
        [1, 4, 7, 5, 15, 90],
        [2, 5, 8, 15, 15, 90],
        [0, 4, 8, 5, 15, 45],
        [2, 4, 6, 5, 15, 135],
    ]
    wins.forEach(e =>{
        if((boxtext[e[0]].innerText === boxtext[e[1]].innerText) && (boxtext[e[2]].innerText === boxtext[e[1]].innerText) && (boxtext[e[0]].innerText !== "") ){
            document.querySelector('.info').innerText = boxtext[e[0]].innerText + " Won"
            isgameover = true
            document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "200px";
            document.querySelector(".line").style.transform = `translate(${e[3]}vw, ${e[4]}vw) rotate(${e[5]}deg)`
            document.querySelector(".line").style.width = "20vw";
        }
    })
}

// Game Logic
// music.play()
let boxes = document.getElementsByClassName("box");
Array.from(boxes).forEach(element =>{
    let boxtext = element.querySelector('.boxtext');
    element.addEventListener('click', ()=>{
if(!questionAttempted)
        {
            alert("First Attempt question on the screen!!!");
            return 0;        
        }

        questionAttempted = false;
        if(boxtext.innerText === ''){
            boxtext.innerText = turn;
            turn = changeTurn();
            audioTurn.play();
            checkWin();
            if (!isgameover){
                document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
            } 
        }
    })
})

// Add onclick listener to reset button
reset.addEventListener('click', ()=>{
    let boxtexts = document.querySelectorAll('.boxtext');
    Array.from(boxtexts).forEach(element => {
        element.innerText = ""
    });
    currentQuestionIndex = 0
    timeLeft = 60;
    startGame();
    turn = "X"; 
    isgameover = false
    document.querySelector(".line").style.width = "0vw";
    document.getElementsByClassName("info")[0].innerText  = "Turn for " + turn;
    document.querySelector('.imgbox').getElementsByTagName('img')[0].style.width = "0px"
})
var sec = 60;
var time = setInterval(myTimer, 1000);

function myTimer() {
    document.getElementById('number').innerHTML = sec + "sec left";
    sec--;
    if (sec == -1) {
        clearInterval(time);
        alert("Time out!! :(");
    }
}
 const questions = [
    {
        question: " What type of programming language is JavaScript?",
        options: [ "Compiled","Interpreted","Assembly" ,"Machine"],
        correctAnswer:"Interpreted"
    },
    {
        question: "Who developed JavaScript?",
        options: [ "Microsoft","Google","Netscape","Oracle"],
        correctAnswer: "Netscape"
    }, {
      question: "In which year was JavaScript first introduced",
         options: ["1995","2000","1985","2010"],
           correctAnswer: "1995"
    },{ question: "Which of the following is not a valid data type in JavaScript?",
    options: ["Number","String","Boolean","Float"],
    correctAnswer: "Float"
},{
    question: "Question: What is the DOM in the context of JavaScript?",
    options: [ "Document Object Model","Data Output Mechanism ","Document Order Model", "Data Object Model"],
    correctAnswer: "Document Object Model"
}, 
{
    question: "Which keyword is used to declare a variable in JavaScript?",
    options: ["var","variable","int","declare"],
    correctAnswer: "var"
  },
  {
    question: "What is the result of the following expression: 5 + '5'?",
    options: ["a) 10", "b) 55", "c) '55'", "d) Error"],
    correctAnswer: "c) '55'"
  },
  {
    question: "Which method is used to add a new element at the end of an array in JavaScript?",
    options: ["a) push()", "b) append()", "c) addToEnd()", "d) insertEnd()"],
    correctAnswer: "a) push()"
  },{
    question: "What does the 'this' keyword refer to in JavaScript?",
    options: ["Current function", "Global object", "Calling function", "Current object"],
    correctAnswer: "Current object"
  },
  {
    question: "How do you comment a single line in JavaScript?",
    options: ["/* comment */", "// comment", "-- comment", "# comment"],
   correctAnswer: "// comment"
  },
  {
    question: "What is the purpose of the 'return' statement in a JavaScript function?",
    options: ["To exit the function", "To print a value", "To return a value from the function", "To define a function"],
   correctAnswer: "To return a value from the function"
  },
  {
    question: "What is the JavaScript function that is used to parse a string to an integer?",
    options: ["parseInt()", "toInteger()", "parseInteger()", "stringToInteger()"],
   correctAnswer: "parseInt()"
  },
  {
    question: "Which of the following is not a valid JavaScript data type?",
    options: ["boolean", "float", "string", "char"],
   correctAnswer: "char"
  },

    // Add more questions as needed
];

let currentQuestionIndex = 0;
let timeLeft = 60;
let timerInterval;

function startGame() {
    currentQuestionIndex;
    showQuestion();
    timerInterval = setInterval(updateTimer, 1000);
}

function showQuestion() {
    const questionContainer = document.getElementById("question");
    const optionsContainer = document.getElementById("optionbox");

    questionContainer.textContent = questions[currentQuestionIndex].question;
    optionsContainer.innerHTML = "";

    questions[currentQuestionIndex].options.forEach((option, index) => {
        const button = document.createElement("button");
        button.classList.add("button1")
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(option));
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selectedOption) {

    if(isgameover)
    {
        alert("Quiz is already ended");
        return 0;
    }    

    questionAttempted = true;
    clearInterval(timerInterval);

    const resultContainer = document.getElementById("result");

    if (selectedOption === questions[currentQuestionIndex].correctAnswer) {
        resultContainer.textContent = "Correct!";

        setTimeout(() => {
            resultContainer.textContent = "";
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                timeLeft = 60;
                startGame();
            } else {
                resultContainer.textContent = "Congratulations! You completed the game.";
            }
        }, 2000);
    } else {
        resultContainer.textContent = "Wrong! Game Over.";
        changeTurn()
        RightAnswer = false;
        setTimeout(() => {
            resultContainer.textContent = "";
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                timeLeft = 60;
                startGame();
            } else {
                resultContainer.textContent = "Congratulations! You completed the game.";
            }
        }, 2000);
    }
}

function updateTimer() {
    const timeContainer = document.getElementById("number");
    timeContainer.textContent = timeLeft;

    if (timeLeft === 0) {
        document.getElementById("result").textContent = "Time's up! Game Over.";
        RightAnswer = false;
        setTimeout(() => {
            resultContainer.textContent = "";
            currentQuestionIndex++;

            if (currentQuestionIndex < questions.length) {
                timeLeft = 60;
                startGame();
            } else {
                resultContainer.textContent = "Congratulations! You completed the game.";
            }
        }, 2000);
    } else {
        timeLeft--;
    }
}

startGame();