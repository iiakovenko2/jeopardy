const categories = [
    { name: "არითმეტიკა", questions: [
        { question: "What is \\(2 + 2\\)?", answer: "4", value: 100 },
        { question: "What is \\(3 \\times 3\\)?", answer: "9", value: 200 },
        { question: "What is \\(\\sqrt{25}\\)?", answer: "5", value: 300 },
        { question: "What is \\(7^2\\)?", answer: "49", value: 400 },
        { question: "What is \\(\\frac{81}{9}\\)?", answer: "9", value: 500 }
    ]},
    { name: "Science", questions: [
        { question: "What planet is closest to the sun?", answer: "Mercury", value: 100 },
        { question: "What is H2O?", answer: "Water", value: 200 },
        { question: "What is the chemical symbol for gold?", answer: "Au", value: 300 },
        { question: "What gas do plants absorb from the atmosphere?", answer: "Carbon dioxide", value: 400 },
        { question: "What is the hardest natural substance on Earth?", answer: "Diamond", value: 500 }
    ]},
    { name: "History", questions: [
        { question: "Who was the first president of the USA?", answer: "George Washington", value: 100 },
        { question: "In what year did WW2 end?", answer: "1945", value: 200 },
        { question: "Who was the first emperor of Rome?", answer: "Augustus", value: 300 },
        { question: "What year did the Berlin Wall fall?", answer: "1989", value: 400 },
        { question: "Who was the British Prime Minister during WW2?", answer: "Winston Churchill", value: 500 }
    ]},
    { name: "Geography", questions: [
        { question: "What is the capital of France?", answer: "Paris", value: 100 },
        { question: "Which continent is Australia in?", answer: "Australia", value: 200 },
        { question: "What is the longest river in the world?", answer: "Nile", value: 300 },
        { question: "What is the largest desert in the world?", answer: "Sahara", value: 400 },
        { question: "What is the highest mountain in the world?", answer: "Mount Everest", value: 500 }
    ]},
    { name: "Literature", questions: [
        { question: "Who wrote 'Romeo and Juliet'?", answer: "Shakespeare", value: 100 },
        { question: "What is the main character in 'Moby Dick'?", answer: "Ishmael", value: 200 },
        { question: "Who wrote '1984'?", answer: "George Orwell", value: 300 },
        { question: "What is the first book in the 'Harry Potter' series?", answer: "Harry Potter and the Philosopher's Stone", value: 400 },
        { question: "Who wrote 'The Great Gatsby'?", answer: "F. Scott Fitzgerald", value: 500 }
    ]}
];

let score = 0;

const gameBoard = document.getElementById('game-board');
const questionModal = document.getElementById('question-modal');
const questionTitle = document.getElementById('question-title');
const questionText = document.getElementById('question-text');
const answerInput = document.getElementById('answer-input');
const submitAnswer = document.getElementById('submit-answer');
const closeModal = document.getElementById('close-modal');
const scoreDisplay = document.getElementById('score');

// Create the game board
categories.forEach(category => {
    const categoryDiv = document.createElement('div');
    categoryDiv.classList.add('category');
    categoryDiv.textContent = category.name;
    gameBoard.appendChild(categoryDiv);
});

for (let i = 0; i < 5; i++) {
    categories.forEach(category => {
        const question = category.questions[i];
        const questionDiv = document.createElement('div');
        questionDiv.classList.add('question');
        questionDiv.textContent = question.value;
        questionDiv.dataset.question = question.question;
        questionDiv.dataset.answer = question.answer;
        questionDiv.dataset.value = question.value;
        gameBoard.appendChild(questionDiv);
    });
}

gameBoard.addEventListener('click', event => {
    if (event.target.classList.contains('question')) {
        const question = event.target.dataset.question;
        const answer = event.target.dataset.answer;
        const value = event.target.dataset.value;

        questionTitle.textContent = `Question for ${value} points`;
        questionText.innerHTML = `\\(${question}\\)`;
        MathJax.typesetPromise([questionText]).then(() => {
            questionModal.dataset.answer = answer;
            questionModal.dataset.value = value;
            questionModal.style.display = 'flex';
        });
    }
});

submitAnswer.addEventListener('click', () => {
    const userAnswer = answerInput.value.trim().toLowerCase();
    const correctAnswer = questionModal.dataset.answer.toLowerCase();
    const value = parseInt(questionModal.dataset.value);

    if (userAnswer === correctAnswer) {
        score += value;
    } else {
        score -= value;
    }

    scoreDisplay.textContent = `Score: ${score}`;
    questionModal.style.display = 'none';
    answerInput.value = '';
});

closeModal.addEventListener('click', () => {
    questionModal.style.display = 'none';
    answerInput.value = '';
});
