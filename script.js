const questionContainer = document.getElementById('question-container');
const questionElement = document.getElementById('question');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const scoreContainer = document.getElementById('score-container');
const scoreElement = document.getElementById('score');
const progressCheckbox = document.getElementById('progress-checkbox');

const questions = [
    {
        question: 'What is the capital of France?',
        answers: [
            { text: 'Berlin', correct: false },
            { text: 'Madrid', correct: false },
            { text: 'Paris', correct: true },
            { text: 'Lisbon', correct: false }
        ]
    },
    {
        question: 'Which planet is known as the Red Planet?',
        answers: [
            { text: 'Earth', correct: false },
            { text: 'Mars', correct: true },
            { text: 'Jupiter', correct: false },
            { text: 'Saturn', correct: false }
        ]
    },
    {
        question: 'Which ocean is the largest?',
        answers: [
            { text: 'Atlantic Ocean', correct: false },
            { text: 'Indian Ocean', correct: false },
            { text: 'Arctic Ocean', correct: false },
            { text: 'Pacific Ocean', correct: true }
        ]
    }
];

let currentQuestionIndex = 0;
let score = 0;

function startGame() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.style.display = 'none';
    scoreContainer.style.display = 'none';
    questionContainer.style.display = 'block';
    setNextQuestion();
}

function setNextQuestion() {
    resetState();
    showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
    questionElement.innerText = question.question;
    question.answers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer.text;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

function resetState() {
    nextButton.style.display = 'none';
    while (answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(answer) {
    const correct = answer.correct;
    if (correct) {
        score++;
        markButton(answerButtons.children[0], 'correct');
    } else {
        markButton(answerButtons.children[0], 'wrong');
    }
    
    Array.from(answerButtons.children).forEach(button => {
        if (button.innerText === answer.text) {
            markButton(button, correct ? 'correct' : 'wrong');
        } else {
            button.disabled = true;
        }
    });
    
    nextButton.style.display = 'block';
}

function markButton(button, type) {
    button.classList.add(type);
}

nextButton.addEventListener('click', () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        setNextQuestion();
    } else {
        questionContainer.style.display = 'none';
        scoreContainer.style.display = 'block';
        scoreElement.innerText = `${score} out of ${questions.length}`;
    }
});

startGame();