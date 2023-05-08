//by storing these references in variables, the code can manipulate the elements on the page more easily, such as by adding or removing CSS classes or updating the text content.
const startButton = document.getElementById('start-btn')
const nextButton = document.getElementById('next-btn')
const questionContainerElement = document.getElementById('question-container')
const questionElement = document.getElementById('question')
const answerButtonsElement = document.getElementById('answer-buttons')

//holds an array of questions that have been shuffled randomly, and holds the index of the current question being displayed or answered.
let shuffledQuestions, currentQuestionIndex

//these event listeners are used to respond to user interactions with the startButton and nextButton elements and trigger the right actions in the quiz game.
startButton.addEventListener('click', startGame)
nextButton.addEventListener('click', () => {
    currentQuestionIndex++
    setNextQuestion()
})

//this function sets up the initial state of the quiz game by hiding the start button, shuffling the quiz questions, setting the current question index to 0, and showing the container for the quiz questions. Then, it moves forward to display the first question by calling the setNextQuestion function.
function startGame() {
    startButton.classList.add('hide')
    shuffledQuestions = questions.sort(() => Math.random() - .5)
    currentQuestionIndex = 0
    questionContainerElement.classList.remove('hide')
    setNextQuestion()
}

//this function sets up the next question of the quiz by resetting the state of the quiz elements and displaying the next question using the showQuestion function with the current question from the shuffledQuestions array.
function setNextQuestion() {
    resetState()
    showQuestion(shuffledQuestions[currentQuestionIndex])
}

//this function sets up and displays the answer choices for a single quiz question by creating a button element for each answer choice, setting the appropriate properties and event listeners, and appending them to the answer button container on the screen.
function showQuestion(question) {
    questionElement.innerText = question.question
    question.answers.forEach(answer => {
        const button = document.createElement('button')
        button.innerText = answer.text
        button.classList.add('btn')
        if (answer.correct) {
            button.dataset.correct = answer.correct
        }
        button.addEventListener('click', selectAnswer)
        answerButtonsElement.appendChild(button)
    })
}

//this function prepares the quiz or game for a new question to be displayed, by clearing any previous feedback, hiding the "Next" button, and removing any answer choices from the previous question.
function resetState() {
    clearStatusClass(document.body)
    nextButton.classList.add('hide')
    while (answerButtonsElement.firstChild) {
        answerButtonsElement.removeChild(answerButtonsElement.firstChild)
    }
}

//The selectAnswer function is used to handle the event of selecting an answer to a multiple-choice quiz question. It sets the background color of the page and the styling of each answer button based on whether the selected answer is correct or not, and shows the next question button if there are more questions left in the quiz, or shows the restart button if all the questions have been answered.
function selectAnswer(e) {
    const selectedButton = e.target
    const correct = selectedButton.dataset.correct
    setStatusClass(document.body, correct)
    Array.from(answerButtonsElement.children).forEach(button => {
        setStatusClass(button, button.dataset.correct)
    })
    if (shuffledQuestions.length > currentQuestionIndex + 1) {
        nextButton.classList.remove('hide')
    } else {
        startButton.innerText = 'Restart'
        startButton.classList.remove('hide')
    }
}

//this function is used to add a CSS class to an HTML element to show whether a certain condition is correct or not.
function setStatusClass(element, correct) {
    clearStatusClass(element)
    if (correct) {
        element.classList.add('correct')
    } else {
        element.classList.add('wrong')
    }
}

//This function is used in scenarios where an element's class needs to be updated based on user input or some other event. For example, if a quiz question is answered correctly, the correct class could be added to the element to show the correct answer, and then the clearStatusClass function would be called to remove the correct class when the user moves on to the next question.
function clearStatusClass(element) {
    element.classList.remove('correct')
    element.classList.remove('wrong')
}

//these are the questions that will appear to the user.
const questions = [
    {
        question: 'Inside which HTML element do we put the JavaScript?',
        answers: [
            { text: '<scripting>', correct: false },
            { text: '<script>', correct: true },
            { text: '<javascript>', correct: false },
            { text: '<js>', correct: false }
        ]
    },
    {
        question: 'How can you add a comment in a JavaScript?',
        answers: [
            { text: '<!--This is a comment-->', correct: false },
            { text: 'This is a comment', correct: false },
            { text: '//This is a comment', correct: true }
        ]
    },
    {
        question: 'JavaScript is the same as Java.',
        answers: [
            { text: 'True', correct: false },
            { text: 'False', correct: true }
        ]
    },
    {
        question: 'How do you declare a JavaScript variable?',
        answers: [
            { text: 'v carName', correct: false },
            { text: 'variable carName', correct: false },
            { text: 'var carName', correct: true }
        ]
    },
    {
        question: 'Which operator is used to assign a value to a variable?',
        answers: [
            { text: '=', correct: true },
            { text: '*', correct: false },
            { text: 'x', correct: false },
            { text: '-', correct: false }
        ]
    },
    {
        question: 'How does a FOR loop start?',
        answers: [
            { text: 'for (i <= 5; i++)', correct: false },
            { text: 'for i = 1 to 5', correct: false },
            { text: 'for (i = 0; i <= 5; i++)', correct: true },
            { text: 'for (i = 0; i <= 5)', correct: false }
        ]
    },
] 