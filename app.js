const questions = [
    {
        question: "Who is the main character of 'Naruto'?",
        options: ["Naruto Uzumaki", "Sasuke Uchiha", "Sakura Haruno", "Kakashi Hatake"],
        answer: "Naruto Uzumaki",
        image: "img/naruto-logo.jpg"
    },
    {
        question: "What is the name of the city in 'Tokyo Ghoul'?",
        options: ["Tokyo", "Shinjuku", "Roppongi", "Nishiki"],
        answer: "Tokyo",
        image: "img/tokyoghoul.jpg"
    },
    {
        question: "Which anime features the character 'Luffy'?",
        options: ["Naruto", "One Piece", "Dragon Ball", "Attack on Titan"],
        answer: "One Piece",
        image: "img/luffy.jpg"
    },
    {
        question: "Which anime is known for the phrase 'I am gonna be king of the pirates!'?",
        options: ["One Piece", "Dragon Ball Z", "Naruto", "Bleach"],
        answer: "One Piece",
        image: "img/onepiece.jpg"
    },
    {
        question: "In 'Attack on Titan', who is the main protagonist?",
        options: ["Eren Yeager", "Levi Ackerman", "Mikasa Ackerman", "Armin Arlert"],
        answer: "Eren Yeager",
        image: "img/aot.jpg"
    },
    {
        question: "What is Goku's real name?",
        options: ["Vegeta", "Raditz", "Kakarot", "Roshi"],
        answer: "Kakarot",
        image: "img/goku.png"
    },
    {
        question: "Which anime is this character from?",
        options: ["Naruto", "Attack on Titan", "Soul Eater", "Dragon Ball Z"],
        answer: "Soul Eater",
        image: "img/soul.webp"
    },
    {
        question: "What species is Nezuko in Demon Slayer?",
        options: ["Human", "Demon", "Angel", "Cat"],
        answer: "Demon",
        image: "img/nezuko.webp"
    },
    {
        question: "What demon is sealed inside of Naruto?",
        options: ["Two-tailed tiger", "Four-tailed monkey", "Three-tailed turtle", "Nine-tailed fox"],
        answer: "Nine-tailed fox",
        image: "img/naruto.webp"
    },
    {
        question: "How many Dragon Balls are there?",
        options: ["Eight", "Seven", "Ten", "Nine"],
        answer: "Seven",
        image: "img/shenron.jpg"
    }
];

let currentQuestionIndex = 0;
let userAnswers = new Array(questions.length).fill(null);

function loadQuestion() {
    const questionData = questions[currentQuestionIndex];
    document.getElementById("question").textContent = questionData.question;

    const answersContainer = document.getElementById("answers");
    answersContainer.innerHTML = "";

    if (questionData.image) {
        const imgElement = document.createElement("img");
        imgElement.src = questionData.image;
        imgElement.alt = "Anime image";
        imgElement.style.width = "250px";
        imgElement.style.marginBottom = "20px";
        answersContainer.appendChild(imgElement);
    }

    questionData.options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.classList.add("answer-button");
        button.onclick = () => selectAnswer(option);

        if (userAnswers[currentQuestionIndex] === option) {
            button.classList.add("selected");
        }

        answersContainer.appendChild(button);
    });

    // Update button visibility and enable submit button on last question
    document.getElementById("prevButton").style.display = currentQuestionIndex > 0 ? "inline-block" : "none";
    document.getElementById("nextButton").style.display = currentQuestionIndex < questions.length - 1 ? "inline-block" : "none";
    document.getElementById("submitButton").style.display = currentQuestionIndex === questions.length - 1 ? "inline-block" : "none";
    document.getElementById("submitButton").disabled = currentQuestionIndex !== questions.length - 1; // Enable submit button on last question
    document.getElementById("restartButton").style.display = "none"; // Hide restart button
}

function selectAnswer(option) {
    userAnswers[currentQuestionIndex] = option;
    loadQuestion();
}

function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        loadQuestion();
    }
}

function prevQuestion() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        loadQuestion();
    }
}

function submitQuiz() {
    console.log("Submit Quiz triggered"); // Debugging log to see if the button triggers the function
    let score = userAnswers.reduce((acc, answer, index) => acc + (answer === questions[index].answer ? 1 : 0), 0);
    document.getElementById("question").textContent = "Quiz Completed!";
    document.getElementById("answers").innerHTML = `<h2>Your Score: ${score} / ${questions.length}</h2>`;
    document.getElementById("prevButton").style.display = "none";
    document.getElementById("nextButton").style.display = "none";
    document.getElementById("submitButton").style.display = "none";
    document.getElementById("restartButton").style.display = "inline-block"; // Show restart button at the end
}

function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers.fill(null); // Reset user answers
    loadQuestion();
}

// Attach button events
document.getElementById("nextButton").onclick = nextQuestion;
document.getElementById("prevButton").onclick = prevQuestion;
document.getElementById("submitButton").onclick = submitQuiz;
document.getElementById("restartButton").onclick = restartQuiz;

// Initialize the quiz
loadQuestion();