function Question(text, choices, answer) {
    this.answer = answer;
    this.choices = choices;
    this.text = text;
}
Question.prototype.isCorrectAnswer = function (choice) {
    return this.answer == choice;
}
//create Questions here 
var questions = [
    new Question("JavaScript supports", ["Functions", "XHTML", "CSS", "HTML"], "Functions"),
    new Question("Which language is used for styling web pages?", ["HTML", "JQuery", "CSS", "XML"], "CSS"),
    new Question("Which is not a JavaScript Framework?", ["Python Script", "JQuery", "Django", "NodeJS"], "Django"),
    new Question("Which is used for Connect To Database?", ["PHP", "HTML", "JS", "All"], "PHP"),
    new Question("JavaScript is a ", ["Language", "Programming Language", "Development", "All"], "Programming Language")
];


// We will play a Quiz
//intial score is 0
//starting from Question1 -> questions[0]
//load all the questions in the HTML
function Quiz(questions) {
    this.score = 0;
    this.questions = questions;
    this.questionIndex = 0;
}
var quiz = new Quiz(questions);
Quiz.prototype.getQuestionByIndex = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isEnded = function () {
   return this.questionIndex == questions.length;
}
Quiz.prototype.checkOptionWithAnswer = function (answer) {
    if (this.getQuestionByIndex().isCorrectAnswer(answer))
        this.score++;

    this.questionIndex++;
}
function handleOptionButton(id, choice) {
    var button = document.getElementById(id);
    button.onclick = function () {
        //check the answer 
        quiz.checkOptionWithAnswer(choice);
        // load the next question
        loadQuestions();

    }

}
function loadQuestions() {
    if (quiz.isEnded()) {

        showScores();
    }
    else {
        //write the question
        var qEle = document.getElementById("question");
        console.log(quiz.getQuestionByIndex());
        qEle.innerHTML = quiz.getQuestionByIndex().text;
        

        //show options
        var choices = quiz.getQuestionByIndex().choices;
        for (let i = 0; i < choices.length; i++) {
            var cEle = document.getElementById("choice" + i);
            cEle.innerHTML = choices[i];
            handleOptionButton("btn" + i, choices[i]);
        }
        //showing the progress
        showProgress();
    }
}
function showProgress() {
    var el = document.getElementById("progress");
    el.innerHTML = "Question " + (quiz.questionIndex + 1) + " of " + quiz.questions.length;
}
function showScores() {
    var gameOverHTML = "<h1>Result</h1>"
    gameOverHTML += "<h2 id ='score'> Your score is " + quiz.score +".Your percentage is "+(quiz.score/quiz.questions.length*100)+ "%.</h2>";
    var e = document.getElementById("quiz")
    e.innerHTML = gameOverHTML;

}
//display quiz 
loadQuestions();

