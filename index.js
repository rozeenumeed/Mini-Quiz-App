
const allQuestions = {

    question1: {
        text: "What is the capital of France?",
        options: ["Berlin", "Madrid", "Paris", "Rome"],
        correctAnswer: 2
    },

    question2: {
        text: "What is the chemical symbol for water?",
        options: ["H2O", "O2", "CO2", "NaCl"],
        correctAnswer: 0
    },

    question3: {
        text: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Jupiter", "Venus"],
        correctAnswer: 1
    },

    question4: {
        text: "What is the largest ocean on Earth?",
        options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
        correctAnswer: 3
    }

};


const startButton = document.querySelector(".start");

let currentQuestion = 1;
let score = 0;


// Creates answer buttons
function createAnswerButtons(question) {

    let answerOptions = "";

    for (let i = 0; i < question.options.length; i++) {
        answerOptions += `
            <button class="ans">${question.options[i]}</button>
        `;
    }

    return answerOptions;
}


// Updates score on the screen
function updateScore(quizContainer) {

    quizContainer.querySelector(".mark").innerText = `Score:${score}`;

}


// Resets the color of all answer buttons
function resetAnswerColors(answerButtons) {

    answerButtons.forEach(function (button) {
        button.style.backgroundColor = "";
    });

}


// Checks the selected answer
function checkAnswer(button, question, answerButtons, quizContainer, count) {

    resetAnswerColors(answerButtons);

    if (
        button.innerText ==
        question.options[question.correctAnswer]
    ) {

        count.value++;

        if (count.value == 1) {
            score++;
            updateScore(quizContainer);
        }

        button.style.backgroundColor = "green";

    }

    else {

        if (score >= currentQuestion) {
            score--;
            count.value--;
        }

        updateScore(quizContainer);

        button.style.backgroundColor = "red";
    }

}


// Creates the quiz question
function create() {

    let answerCount = {
        value: 0
    };

    const quizContainer = document.createElement("div");
    quizContainer.classList.add("outer");

    document.body.append(quizContainer);

    const currentQuestionData =
        allQuestions["question" + currentQuestion];

    const answerOptions =
        createAnswerButtons(currentQuestionData);


    quizContainer.innerHTML = `
        <h3>${currentQuestionData.text}</h3>

        <div class="info">
            <p>
                Question ${currentQuestion} out of
                ${Object.keys(allQuestions).length}
            </p>

            <p class="mark">Score:${score}</p>
        </div>

        <hr>

        ${answerOptions}

        <div class="subButton">
            <button class="next nextQuestion">Next</button>
        </div>
    `;


    const answerButtons =
        quizContainer.querySelectorAll(".ans");


    answerButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            checkAnswer(
                button,
                currentQuestionData,
                answerButtons,
                quizContainer,
                answerCount
            );

        });

    });


    const nextButton =
        quizContainer.querySelector(".nextQuestion");


    nextButton.addEventListener("click", function () {

        currentQuestion++;

        if (
            currentQuestion <=
            Object.keys(allQuestions).length
        ) {

            quizContainer.style.display = "none";

            create();

        }

        else {

            quizContainer.innerHTML = `
                <div class="End">
                    <p>You got ${score} marks</p>
                    <h1>The End</h1>
                </div>
            `;

        }

    });

}


// Starts the quiz
startButton.addEventListener("click", function () {

    startButton.style.display = "none";

    create();

});

