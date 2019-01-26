// Question class: 
class Question {
    constructor(text, choices, answer) {
        this.text = text;
        this.choices = choices;
        this.answer = answer;
    }

    //Correct answer method
    correctAnswer(choice) {
        return choice === this.answer;
    }
}

//Quiz Class
class Quiz {
    constructor(questions) {
        this.score = 0;
        this.questions = questions;
        this.questionIndex = 0;
    }

    //get current question index
    getQuestionIndex() {
        return this.questions[this.questionIndex];
    }

    //check if quiz has ended
    isEnded() {
        return this.questions.length === this.questionIndex;
    }

    //Guess answer

    guessAnswer(answer) {


        if (this.getQuestionIndex().correctAnswer(answer)) {
            this.score++;
        }
        this.questionIndex++;
    }
}

//Instatiate Questions
const questions = [
    new Question("Q. Who is the prime minister of India", ["Amir Khan", "Rahul Gandhi", "Narendra Modi", "Man Mohan Singh"], "Narendra Modi"),
    new Question("Q. Who is the captain of Indian cricket team", ["Virat Kohli", "Rohit Sharma", "Mahendra Singh Dhoni", "None of Above"], "Virat Kohli"),
    new Question("Q. Who has been appointed as the new chairman of Central Board of Indirect taxes and Customs (CBIC)", ["Johnjoseph", "VanajaN.Sarna", "MahenderSingh", "S Ramesh"], "S Ramesh"),
    new Question("Q. Who has been appointed as the acting Chairman of the Union Public Service Commission (UPSC)", ["ArvindSaxena", "SudhaJain", "KirtiKumar", "Omi Agrawal"], "ArvindSaxena"),
    new Question("Q. India’s first-ever national police museum will establish in which city", ["Chennai", "Delhi", "Nagpur", "Kolkata"], "Delhi"),
]

//Instatiate Quiz
const quiz = new Quiz(questions);

//UI class: Repersent UI
class UI {
    //Populate Questions
    static populateQuestions() {
        if (quiz.isEnded()) {
            UI.showResults();
        } else {
            // UI.showQuestions();
            // UI.showChoices();

            //show questions to ui
            const element = document.querySelector("#questions");
            const question = quiz.getQuestionIndex().text;
            element.innerHTML = question.concat("?");

            //show choices to ui
            const choices = quiz.getQuestionIndex().choices;
            const btnContainer = document.querySelector("#btnContainer");
            btnContainer.innerHTML = "";
            for (let i = 0; i < choices.length; i++) {
                const div = document.createElement("div");
                div.className=`col-6 mb-3`;
                div.innerHTML=`
                    <button id="btn-${i}" class="btn btn-outline-primary btn-lg btn-block"><span>${choices[i]}</span></button>
                `;
               
              
                btnContainer.appendChild(div);
                UI.correctAnswer("btn-" + i, choices[i]);
                //console.log(choices[i]);
            }

            //Show progress
            UI.progress();
        }
    }



    //guess answer
    static correctAnswer(id, guess) {
        const button = document.getElementById(id);
        //console.log(button);
        button.onclick = function () {
            quiz.guessAnswer(guess);
            UI.populateQuestions();
        }
    }

    //show score
    static showResults() {
        const container = document.querySelector("#quiz");
        container.innerHTML = `<h1 class="display-4 text-center mt-4">Your total score is ${quiz.score}</h1>`;
    }

    //progress
    static progress() {
        const current = document.querySelector("#current");
        const total = document.querySelector("#total");
        current.textContent = quiz.questionIndex + 1;
        total.textContent = quiz.questions.length;
        //console.log(quiz.questions.length);
    }
}

//Event
document.addEventListener("DOMContentLoaded", () => UI.populateQuestions());
