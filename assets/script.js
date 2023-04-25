var questions = [
    { questionText: "Commonly used data types do NOT include: ",
    options: ["String", "Booleans", "Alerts", "Numbers" ],
    rightAnswer: 2
    },
    { questionText: "Arrays in JavaScript can be used to store __________ ",
    options: ["Numbers and strings", "Booleans", "Other arrays", "All of the above" ],
    rightAnswer: 3
    },
    { questionText: "The condition in an if/else statement is enclosed with ________. ", 
    options: ["Quotes", "Curly brackets", "Parenthesis", "Square brackets" ],
    rightAnswer: 2
    },
    { questionText: "String values must be enclosed with _________ when being assigned to variables.", 
    options: ["Comas", "Quotes", "Parenthesis", "Curly brackets" ],
    rightAnswer: 1
    },
    { questionText: "A very useful tool used during development and debugging for printing content to the debugger is: ", 
    options: ["JavaScript", "Terminal/Bash", "For loops", "Console.log" ],
    rightAnswer: 3
    },
    { questionText: "Inside which HTML element do we put the JavaScript? ",
    options: ["<script>", "<js>", "<scripting>", "<javascript>" ],
    rightAnswer: 0
    },
]
var currentQuestion = 0; 
var timeLeft = 60; 
var time = document.querySelector("#countdown"); 
var questionText = document.querySelector("#jsQuestions");
var welcomePage = document.querySelector("#welcomePage")
var QOptions = document.querySelector("#options");
var gameover = document.querySelector('#endpage'); 
var gamePage = document.querySelector('#gamePage');
var startBtn = document.querySelector('#startButton');
var result = document.querySelector('#questionResult');
var timer = 0;

var yourScore = document.querySelector('#yourscore'); 



startBtn.addEventListener("click", function(event) {
    start();
    renderQuestion();
    welcomePage.style.display = "none";
    gamePage.style.display = ""; 
});


function start(){
    refreshTime();
    timer = setInterval(function(){tickTime();refreshTime()}, 1000);
    console.log("this is the timer going: " + timer);
}

function refreshTime(){
    time.textContent = "Time: " + timeLeft;
}

function tickTime(){
    timeLeft = timeLeft-1; 
    if (timeLeft == 0) {
        clearInterval(timer);
        gamePage.style.display="none";
        gameover.style.display=""; 
    }
}

function renderQuestion(){
    var currentQ = questions[currentQuestion];
    questionText.innerText = questions[currentQuestion].questionText; 
    QOptions.innerHTML = "";
    for (i = 0; i < currentQ.options.length; i++){
        var button = document.createElement("button");
        button.innerText = currentQ.options[i];
        QOptions.appendChild(button);
        button.onclick = setAnswerFunc(i)
    }
}

function setAnswerFunc(anAnswer) {
    return function() {
        setAnswer(anAnswer)
    }
}

function setAnswer(answerIndex){
    if (questions[currentQuestion].rightAnswer == answerIndex){
        displayCorrect();
        refreshTime()
        
    } else {
        timeLeft = timeLeft - 10; 
        refreshTime();
        displayWrong();
        
    }
    setTimeout(nextQuestion(), 3000);
}


function nextQuestion(){
    if (currentQuestion < (questions.length-1)){
        currentQuestion++; 
        renderQuestion(); 
    }else {
        gameover.style.display = "";
        yourScore.textContent = "Your final score is: " + timeLeft; 
        localStorage.setItem('userScore', timeLeft); 
        gamePage.style.display = "none";
        clearInterval(timer);
    }
}

function displayCorrect() {
    result.textContent = "Correct!";
}

function displayWrong(){
    result.textContent = "Incorrect!";
}

var submitScore = document.querySelector("#submitScore");
var userInput = document.querySelector("#initials")
var highScorePage = document.querySelector("#highscorePage");
var backBtn = document.querySelector('#backbtn');
var clearInfo = document.querySelector("#clearInfo"); 
var scoreList = document.querySelector("#scoreList"); 
var scoreHolder = document.querySelector ("#highscoreholder"); 
var userScores = []; 


//userScore key saved in local storage as time left value 
//Needs function to save user input with userScore 

submitScore.addEventListener("click", function(event){
    gameover.style.display = "none";
    highScorePage.style.display = "";


    var userInputText = userInput.value.trim(); 
    userScores.push(userInputText); 
    
    storeHighScores();
    renderHighScore(); 

}); 

function renderHighScore(){
    scoreList.innerHTML = "";
    
    var realUserScores = userScores; 


    var li = document.createElement('li');
    li.textContent = realUserScores + ": " + timeLeft; 
    scoreList.appendChild(li); 


}

function storeHighScores(){
    // localStorage.setItem("userScore", JSON.stringify(timer));
    localStorage.setItem("userInitials", userInput.value)
}

function initialize(){
    var storedUserScore = JSON.parse(localStorage.getItem("userScore"));
    var storedUserInput = JSON.stringify(localStorage.getItem("userInitials"));
    renderHighScore(); 


}

backBtn.addEventListener("click", function(event) {
    highScorePage.style.display = "none";
    welcomePage.style.display = "";  
    initialize(); 
    currentQuestion = 0; 
    timeLeft = 60;


})

var scoreBtn = document.querySelector('#highscores'); 
scoreBtn.addEventListener("click", function(event){
    highScorePage.style.display = ""; 
    welcomePage.style.display = "none"; 
}); 


var clearScoresBtn = document.querySelector("#clearInfo"); 
clearScoresBtn.addEventListener("click", function(event){
    localStorage.removeItem("userScore"); 
    localStorage.removeItem("userInitials"); 
    scoreList.textContent = ""; 

}); 



initialize(); 

