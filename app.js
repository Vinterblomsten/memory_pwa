// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(registration => {
        console.log('ServiceWorker registration successful');
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
      });
  });
}

let questionIndex = 0;
let score = 0;
let shuffledQuestions = [];
let numQuestions = 0;
let answered = false;

const questionEl = document.getElementById('questionText');
const imageEl = document.getElementById('questionImage');
const choicesGrid = document.getElementById('choicesGrid');
const continueBtn = document.getElementById('continueBtn');
const returnBtn = document.getElementById('returnBtn');
//const progressEl = document.getElementById('progress');

function shuffle(array) {
    const result = [...array];
    for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
}

function generateWrongAnswers(correct, answers, num) {
    let pool = answers.filter(a => a !== correct);
    return shuffle(pool).slice(0, num);
}

function initializeQuestion() {

    let q = shuffledQuestions[questionIndex];

    continueBtn.hidden = true;
    questionEl.textContent = q.question;

    if (q.image) {
        imageEl.src = q.image;
        imageEl.alt = q.question;
        imageEl.hidden = false;
    } else {
        imageEl.hidden = true;
    }


    const choices = shuffle([...q.wrong, q.correct]);
    choicesGrid.innerHTML = '';
    choices.forEach(choiceText => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choiceText;
        btn.addEventListener('click', () => selectAnswer(choiceText, q.correct));
        choicesGrid.appendChild(btn);
    });

    answered = false

}

function selectAnswer(selected, correct) {
    const buttons = document.querySelectorAll(".choice-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.style.backgroundColor = "#2ecc71"; // Green for correct
        } else if (btn.textContent === selected) {
            btn.style.backgroundColor = "#e74c3c"; // Red for wrong
        }
    });
    if (selected === correct) {
        if (!answered) score += 1;
    }
    continueBtn.hidden = false;
    answered = true
}

function results() {
    continueBtn.hidden = true;
    choicesGrid.hidden = true;
    imageEl.hidden = true;

    questionEl.textContent = `You got ${score} out of ${numQuestions} correct!`;
    returnBtn.hidden = false

}

function nextQuestion() {
    questionIndex += 1
    if (questionIndex < numQuestions) {
        initializeQuestion()
    } else {
        results()
    }
}

function startQuiz(quizData) {
    
    returnBtn.hidden = true

    const questions = quizData.questions.map(q => ({
        question: q.question,
        image: q.image,
        correct: q.correct,
        wrong: generateWrongAnswers(q.correct, quizData.validAnswers, 3)
    }));

    shuffledQuestions = shuffle(questions);
    numQuestions = quizData.numQuestions;

    initializeQuestion();

}

function selectQuiz(choice) {
    sessionStorage.setItem('selectedQuiz', choice);
    window.location.href = "question.html";
}

function returnToMenu() {
    window.location.href = "index.html";
}

document.addEventListener('DOMContentLoaded', () => {
    if (!questionEl) return; // not on the quiz page
    const choice = sessionStorage.getItem('selectedQuiz');
    if (choice && allQuestions[choice]) {
        startQuiz(allQuestions[choice]);
    } else {
        questionEl.textContent = 'No quiz selected — go back and pick one.';
    }
});
