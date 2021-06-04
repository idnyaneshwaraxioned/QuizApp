
// Data array 
let qData = [
	{
		question: "What is capital of INDIA ?",
		options: [
			"Delhi", "Mumbai", "Chennai", "Haryana"
		],
		answer: 1,
	},
	{
		question: "What does CSS stand for ?",
		options: [
			"Creative Style Sheets",
			"Cascading Style Sheets",
			"Colorful Style Sheet",
			"Computer Style Sheet"
		],
		answer: 2,
	},
	{
		question: "Which of the following property specifies the width of a border?",
		options: [
			"border-bottom-style",
			"border-top-style",
			"border-left-style",
			"border-right-style"
		],
		answer: 1,
	},
	{
		question: "Which of the following selector matches a element based on its id",
		options: [
			"The Universal Selector",
			"The Descendant Selector",
			"The Id Selector",
			"The Class Selector"
		],
		answer: 3,
	},
	{
		question: "Inside which HTML element do we put the JavaScript?",
		options: [
			"<js>",
			"<scripting>",
			"<javascript>",
			"<script>"
		],
		answer: 4,
	},
];

let quizContainer = document.querySelector('.quiz-container');
let next = document.querySelector('.next');
let result = document.querySelector('.result');
let option = document.querySelectorAll('.options');
let ansOptions = document.querySelector('.ans-options');
let quizquestion = document.querySelector(".Quizquestion");
let startQuiz = document.querySelector('.start');
let welcome = document.querySelector('.welcome');
let count = document.querySelector('.count');
let resultShow = document.querySelector('.resultShow');
let qno = 0;
let correctAns = 0;
let wrongAns = 0;
let attempt = 0;
let min;
let sec;

// Select option
option.forEach(elem => {
	elem.addEventListener('click', (e) => {
		e.preventDefault();
		let arrData = qData[qno];
		elem.classList.add("correct");
		option.forEach(freez => {
			freez.classList.add("freez");
		});
		let opIndex = Number(elem.getAttribute('data-opt'));
		if (opIndex === arrData.answer) {
			correctAns++;
		}
		attempt++;
	});
});

const showQuiz = (qData) => {
	let arrData = qData[qno];
	count.textContent = qno + 1;
	quizquestion.textContent = arrData.question;
	let quizOption = arrData.options;
	option[0].textContent = quizOption[0];
	option[1].textContent = quizOption[1];
	option[2].textContent = quizOption[2];
	option[3].textContent = quizOption[3];
}

// Change question
next.addEventListener('click', (e) => {
	e.preventDefault();
	qno++;
	if (qno === qData.length - 1) {
		next.classList.add('active');
	}
	showQuiz(qData);
	option.forEach(rem => {
		rem.classList.remove('correct');
		rem.classList.remove('freez');
	});
});

// Result 
let resultCount = document.querySelector('.rightcount');
let wrongcount = document.querySelector('.wrongcount');
let attemptCount = document.querySelector('.attemptCount');
let resultScore = document.querySelector('.result-score');

const showResult = () => {
	resultCount.textContent = correctAns;
	wrongcount.textContent = qData.length - correctAns;
	attemptCount.textContent = attempt;
	resultScore.textContent = `Your Score is: ${correctAns}`;
}

result.addEventListener('click', (e) => {
	e.preventDefault();
	showResult();
	clearInterval(countDown);
	quizContainer.classList.remove("active");
	resultShow.classList.add('active');
});

const stoptWatch = () => {
	let quizCounter = document.querySelector('.quizCounter');
	sec--;
	if (sec === -1) {
		min--;
		sec = 60;
	}
	if (min === 0 && sec === 0) {
		min = 0;
		sec = 0;
		clearInterval(countDown);
		quizContainer.classList.remove('active');
		resultShow.classList.add("active");
		showResult();
	}
	quizCounter.textContent = `0${min}:${sec}`;
}

// Set Interval
let countDown = setInterval(stoptWatch, 1000);

// Restart 
let restart = document.querySelector('.restart');
restart.addEventListener('click', () => {
	resultCount.textContent = "";
	wrongcount.textContent = "";
	attemptCount.textContent = "";
	resultScore.textContent = "";
	welcome.style.display = "block";
	resultShow.classList.remove("active");
	quizContainer.classList.remove("active");
})

// Start Quiz
startQuiz.addEventListener('click', (e) => {
	e.preventDefault();
	welcome.classList.add("active");
	quizContainer.classList.add("active");
	min = 2;
	sec = 60;
	qno = 0;
	correctAns = 0;
	wrongAns = 0;
	attempt = 0;
	option.forEach(rem => {
		rem.classList.remove('correct');
		rem.classList.remove('freez');
	})
	next.classList.remove("active");
	showQuiz(qData);
	setInterval(stoptWatch, 1000);
})