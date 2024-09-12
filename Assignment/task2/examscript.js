const easyQuestions = [
    "Describe your favorite season of the year. What do you like most about it? How does it affect your mood and activities?",
    "Write about a memorable vacation you had with your family. What made it special, and what did you do there?",
    "Explain how having a pet can impact a person's life. What are some benefits of having a pet?",
    "What are your favorite activities during the weekend?",
    "Discuss why going to school is important. What are some things you have learned in school that you think are valuable?"
];

const moderateQuestions = [
    "How does technology affect modern communication?",
    "Discuss the advantages of being bilingual. How does learning a second language benefit personal and professional growth?",
    "Evaluate how technology has changed the way we learn. What are some benefits and drawbacks of using technology in the classroom?",
    "Examine how different types of music can affect our mood and emotions. How does music influence your life personally?",
    "Explore the causes and consequences of climate change. What are some steps we can take to mitigate its impact?"
];

const hardQuestions = [
    "Analyze the impact of artificial intelligence on the workforce.",
    "Discuss how globalization affects cultural identity and traditions. What are the challenges and opportunities presented by globalization?",
    "Evaluate the role of government policies in addressing income inequality. What are some effective strategies for reducing the gap between different income groups?",
    "Explore different philosophical perspectives on happiness. Can true happiness be achieved, and if so, how?",
    "Assess the potential impacts of genetic engineering on future generations. What are the ethical and social implications of altering human genetics?"
];

let timer;
let maxWords, minWords, timeLimit, essayText, essayQuestion;
let selectedMode = '';

document.getElementById('startExam').addEventListener('click', startExam);
document.getElementById('toggleQuestion').addEventListener('click', toggleQuestion);

function startExam() {
    selectedMode = document.querySelector('input[name="mode"]:checked').value;

    if (!selectedMode) {
        alert('Please select a difficulty mode.');
        return;
    }

    document.getElementById('startExam').disabled = true;
    document.getElementById('toggleQuestion').classList.remove('hidden');
    document.getElementById('examSection').classList.remove('hidden');

    setQuestionAndTimer(selectedMode);
}

function setQuestionAndTimer(mode) {
    if (timer) clearInterval(timer);

    if (mode === 'easy') {
        essayQuestion = easyQuestions[Math.floor(Math.random() * easyQuestions.length)];
        timeLimit = 5 * 60;
        minWords = 100;
        maxWords = 150;
    } else if (mode === 'moderate') {
        essayQuestion = moderateQuestions[Math.floor(Math.random() * moderateQuestions.length)];
        timeLimit = 10 * 60;
        minWords = 150;
        maxWords = 200;
    } else if (mode === 'hard') {
        essayQuestion = hardQuestions[Math.floor(Math.random() * hardQuestions.length)];
        timeLimit = 15 * 60;
        minWords = 200;
        maxWords = 250;
    }

    document.getElementById('essayQuestion').innerText = essayQuestion;
    document.getElementById('essayInput').value = '';
    document.getElementById('wordCount').innerText = `Word count: 0/${maxWords}`;
    document.getElementById('remainingWords').innerText = `Remaining words: ${maxWords}`;

    startTimer(timeLimit);
}

function startTimer(duration) {
    let timerDisplay = document.getElementById('timer');
    let minutes, seconds;
    timer = setInterval(function () {
        minutes = parseInt(duration / 60, 10);
        seconds = parseInt(duration % 60, 10);
        timerDisplay.innerText = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

        if (--duration < 0) {
            clearInterval(timer);
            submitEssay();
        } else if (duration === 2 * 60) {
            alert('Warning! Only 2 minutes remaining.');
        }
    }, 1000);
}

function toggleQuestion() {
    setQuestionAndTimer(selectedMode);
}

document.getElementById('essayInput').addEventListener('input', function() {
    let essayInput = this.value.trim().split(/\s+/).filter(Boolean);
    let wordCount = essayInput.length;
    let remainingWords = Math.max(maxWords - wordCount, 0);

    document.getElementById('wordCount').innerText = `Word count: ${wordCount}/${maxWords}`;
    document.getElementById('remainingWords').innerText = `Remaining words: ${remainingWords}`;

    if (wordCount > maxWords) {
        // Highlight the extra words in red
        const wordsArray = essayInput.map((word, index) => {
            if (index >= maxWords) {
                return `<span style="color:red">${word}</span>`;
            }
            return word;
        });

        document.getElementById('essayInputContainer').innerHTML = `<div id="essayInput" contenteditable="true">${wordsArray.join(' ')}</div>`;
    } else {
        // Reset back to normal if the word count is within the limit
        document.getElementById('essayInputContainer').innerHTML = `<textarea id="essayInput" rows="10" placeholder="Write your essay here...">${this.value}</textarea>`;
    }
});

function submitEssay() {
    document.getElementById('essayInput').setAttribute('readonly', true);
    alert('Time is up! Your essay has been submitted.');
}
