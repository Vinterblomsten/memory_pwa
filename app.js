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
let answered = false;
let shuffledQuestions = [];
let numQuestions = 0;

const questionEl = document.getElementById('questionText');
const imageEl = document.getElementById('questionImage');
const choicesGrid = document.getElementById('choicesGrid');
const continueBtn = document.getElementById('continuebtn');
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
    let wrongAnswers = [];
    while (wrongAnswers.length < num) {
        let i = Math.floor(Math.random() * answers.length);
        if (answers[i] != correct) {
            wrongsAnswers.append(answers[i]);
        }
    }
    return wrongAnswers;
}

function initializeQuestion() {

    question = shuffledQuestions[questionIndex];

    continueBtn.hidden = TRUE;
    let wrongOptions = question.wrong;

    questionEl.textContent = question.question;

    const choices = shuffle(wrongOptions.append(question.correct));
    choicesGrid.innerHTML = '';
    choices.forEach(choiceText => {
        const btn = document.createElement('button');
        btn.className = 'choice-btn';
        btn.textContent = choiceText;
        btn.addEventListener('click', () => selectAnswer(choiceText, question.correct));
        choicesGrid.appendChild(btn);
    });

}

function selectAnswer(selected, correct) {
    const buttons = document.querySelectorAll(".choice-btn");

    buttons.forEach(btn => {
        btn.disabled = true;
        if (btn.textContent === correct) {
            btn.style.backgroundColor = "#2ecc71"; // Green for correct
            score += 1
        } else if (btn.textContent === selected) {
            btn.style.backgroundColor = "#e74c3c"; // Red for wrong
        }
    });

    continueBtn.hidden = FALSE;
    
}

function results() {
    continueBtn.hidden = TRUE;
    choicesGrid.hidden = TRUE;
    imageEl.hidden = TRUE;

    questionEl.textContent = `You got ${score} out of ${numQuestions} correct!`;

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
    
    let questions = []

    for (let i = 0; i<quizData.numQuestions; i++) {
        let questionData = quizData.questions[i]
        let wrongAnswers = generateWrongAnswers(questionData.correct, quizData.validAnswers, 3)
        if (quizData.images) {
            questions.append({
                question: questionData.questions,
                correct: questionData.correct,
                wrong: wrongAnswers
            })
        }
    }

    shuffledQuestions = shuffle(questions)
    numQuestions = quizData.numQuestions

    initializeQuestions()

}
