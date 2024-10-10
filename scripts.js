const questions = [];
const quizPreviewContainer = document.getElementById('preview-container');
const questionInput = document.getElementById('question');
const optionAInput = document.getElementById('option-a');
const optionBInput = document.getElementById('option-b');
const optionCInput = document.getElementById('option-c');
const optionDInput = document.getElementById('option-d');
const correctOptionSelect = document.getElementById('correct-option');

document.getElementById('add-question').addEventListener('click', () => {
    const questionText = questionInput.value.trim();
    const options = {
        a: optionAInput.value.trim(),
        b: optionBInput.value.trim(),
        c: optionCInput.value.trim(),
        d: optionDInput.value.trim(),
    };
    const correctAnswer = correctOptionSelect.value;

    if (questionText && options.a && options.b && options.c && options.d && correctAnswer) {
        questions.push({ question: questionText, options, correct: correctAnswer });
        clearInputs();
        alert("Question added successfully!");
    } else {
        alert("Please fill in all fields.");
    }
});

document.getElementById('generate-quiz').addEventListener('click', () => {
    if (questions.length === 0) {
        alert("Please add at least one question.");
        return;
    }
    
    quizPreviewContainer.innerHTML = "";
    questions.forEach((q, index) => {
        const optionsHtml = Object.keys(q.options).map(option => {
            return `<div class="option">${option.toUpperCase()}: ${q.options[option]}</div>`;
        }).join('');
        
        quizPreviewContainer.innerHTML += `
            <div class="question">
                <h3>${index + 1}. ${q.question}</h3>
                ${optionsHtml}
                <div>Correct Answer: ${q.correct.toUpperCase()}</div>
            </div>
        `;
    });

    const quizData = JSON.stringify(questions);
    const quizLink = `data:text/json;charset=utf-8,${encodeURIComponent(quizData)}`;
    
    const linkElement = document.createElement("a");
    linkElement.setAttribute("href", quizLink);
    linkElement.setAttribute("download", "quiz.json");
    linkElement.textContent = "Download Quiz JSON";
    
    quizPreviewContainer.appendChild(linkElement);
    document.getElementById('quiz-preview').style.display = 'block';
});

function clearInputs() {
    questionInput.value = '';
    optionAInput.value = '';
    optionBInput.value = '';
    optionCInput.value = '';
    optionDInput.value = '';
    correctOptionSelect.selectedIndex = 0;
}

// Copy Quiz Link functionality
document.getElementById('copy-link').addEventListener('click', () => {
    const quizData = JSON.stringify(questions);
    const quizLink = `data:text/json;charset=utf-8,${encodeURIComponent(quizData)}`;
    
    navigator.clipboard.writeText(quizLink).then(() => {
        alert("Quiz link copied to clipboard!");
    }, () => {
        alert("Failed to copy quiz link.");
    });
});
