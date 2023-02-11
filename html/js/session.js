const queryString = window.location.search;
var params = new URLSearchParams(queryString);
var hiragana = params.get('hiragana') || 0;
var katakana = params.get('katakana') || 0;
var kanji = params.get('kanji') || 0;
var timeLimit = params.get('timeLimit');
var options = params.get("options") || 0;
var score = 0;
var questionNumber = 0;
var min = timeLimit;
var sec = 0;
var timerInterval = setInterval(updateTimer, 1000);
var answer = "";
var incorrect = false;
function renderChoices(choices) {
    var choicesHTML = "";
    for (var i = 0; i < choices.length; i++) {
        choicesHTML += "<button class='choice' onclick='checkAnswer(this)'>" + choices[i] + "</button>";
    }
    document.getElementById('optionsL').innerHTML = choicesHTML;
}

function getQuestion() {
    incorrect = false;
    fetch('/getQuestion?hiragana=' + hiragana + '&katakana=' + katakana + '&kanji=' + kanji + '&options=' + options)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            document.getElementById('question').innerHTML = data.question;
            document.getElementById('option1').value = "";
            if (options == 1) renderChoices(data.choices);
            answer = data.answer;
        })

}

function pad(n) {
    return (n < 10) ? ("0" + n) : n;
}

function updateTimer() {
    if (sec == 0) {
        min--;
        sec = 60;
    }
    sec--;
    document.getElementById('timer').innerHTML = pad(min) + ":" + pad(sec);
    if (min == 0 && sec == 0) {
        clearInterval(timerInterval);
        document.getElementById('timer').innerHTML = "Time's up!";
        if (questionNumber == 0) questionNumber = 1;
        document.getElementById('results').innerHTML = `
        <div class="popup">
                <h2>Time's Up!</h2>
                <h2> Accuracy - ${Math.round(score*100/questionNumber)}% </h2>
                <h2><a href="">Click Here to Restart</a></h2>
        </div>
            `;
        document.getElementById('results').style.visibility = "visible";
    }
    document.getElementById('score').innerHTML = score + "/" + questionNumber;
}
window.onload = function() {
    if (options == 1) {
        document.getElementById('check').style.display = "none";
    }
    getQuestion();
    if(options != 1) {
        document.getElementById('option1').focus();
    }
}

function checkAnswer(el) {
    el.style.backgroundColor = el.innerHTML == answer ? "green" : "rgb(135, 6, 6)";
    if (el.innerHTML == answer) {
        if (!incorrect) score++;
        questionNumber++;
        getQuestion();
    }
    else {
        incorrect = true;
    }
}

function checkAnswer2(el) {
    if (el.value == answer) {
        if (!incorrect) score++;
        questionNumber++;
        el.style.border = "0px solid red";
        getQuestion();
        return
    }

    el.style.border = "2px solid red";
    incorrect = true;
}

function handlekey(e){
    if(e.keyCode === 13){
        e.preventDefault(); // Ensure it is only this code that runs
        checkAnswer2(document.getElementById('option1'))
    }
}