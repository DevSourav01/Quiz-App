const questionsObj = [
  {
    correctAnswer: "Cascading Style Sheets",
    options: [
      "Cascading Style Sheets",
      "Creative Style Sheets",
      "Colorful Style Sheets",
      "Computer Style Sheets",
    ],
    question: "What does CSS stand for?",
  },
  {
    correctAnswer: "<style>",
    options: ["<script>", "<style>", "<css>", "<link>"],
    question: "Which HTML tag is used to define an internal stylesheet?",
  },
  {
    correctAnswer: "<link rel='stylesheet' href='styles.css'>",
    options: [
      "<link rel='stylesheet' href='styles.css'>",
      "<style src='styles.css'>",
      "<stylesheet>styles.css</stylesheet>",
      "<css href='styles.css'>",
    ],
    question: "What is the correct syntax for linking an external stylesheet?",
  },
  {
    correctAnswer: "background-color",
    options: ["background-color", "color", "bgcolor", "background"],
    question: "Which CSS property is used to change the background color?",
  },
  {
    correctAnswer: "padding",
    options: ["padding", "margin", "border", "spacing"],
    question:
      "Which CSS property is used to add space inside an element, between its content and border?",
  },
  {
    correctAnswer: "push()",
    options: ["push()", "pop()", "shift()", "unshift()"],
    question:
      "Which JavaScript method is used to add an element to the end of an array?",
  },
  {
    correctAnswer: "box-shadow",
    options: ["box-shadow", "shadow-box", "text-shadow", "filter-shadow"],
    question: "Which CSS property is used to add shadows to an element's box?",
  },
  {
    correctAnswer: "transform",
    options: ["transform", "transition", "translate", "rotate"],
    question:
      "Which CSS property is used to apply 2D or 3D transformations to an element?",
  },
  {
    correctAnswer: "alert('Hello World');",
    options: [
      "alert('Hello World');",
      "msg('Hello World');",
      "console.log('Hello World');",
      "window('Hello World');",
    ],
    question: "How do you write 'Hello World' in an alert box in JavaScript?",
  },
  {
    correctAnswer: "To refer to the current object",
    options: [
      "To refer to the current object",
      "To declare a variable",
      "To define a new function",
      "To access the DOM",
    ],
    question: "What is the purpose of the 'this' keyword in JavaScript?",
  },
  {
    correctAnswer: "font-family",
    options: ["font-family", "font-style", "font-weight", "font-size"],
    question: "Which CSS property is used to change the font of an element?",
  },
  {
    correctAnswer: "type='text/javascript'",
    options: [
      "type='text/javascript'",
      "rel='javascript'",
      "src='javascript'",
      "lang='javascript'",
    ],
    question:
      "What is the correct way to specify the type of a JavaScript file in an HTML document?",
  },
  {
    correctAnswer: "let",
    options: ["let", "var", "const", "function"],
    question: "Which JavaScript keyword declares a block-scoped variable?",
  },
  {
    correctAnswer: "grid",
    options: ["grid", "flexbox", "table", "inline-block"],
    question:
      "Which CSS layout method is used for creating a two-dimensional layout with rows and columns?",
  },
  {
    correctAnswer: ".class",
    options: [".class", "#id", "*", "&"],
    question: "Which CSS selector is used to select elements by their class?",
  },
];

// Variables
let score = 0;
let currentQuestion = 0;

// Accessing DOM elements
const questionEl = document.querySelector("#question");
const optionEl = document.querySelector("#options");
const scoreEl = document.querySelector("#score");
const totalScore = questionsObj.length;
const questionCountEl = document.querySelector("#questionCount"); // New element for question count
const nextEl=document.querySelector('#next')

// Sound effects
const correctSound = new Audio("audio/correct-156911.mp3");
const wrongSound = new Audio("audio/wrong-answer-129254.mp3");
const quizCompleted = new Audio("audio/1-efek-sound-3-220030.mp3");


// Initial rendering
showQuestion();

// Function to show a question
function showQuestion() {
  // Destructure current question object
  const { correctAnswer, options, question } = questionsObj[currentQuestion];

  // Update question count
  questionCountEl.textContent = `Question ${currentQuestion + 1} of ${totalScore}`;

  // Render question
  questionEl.textContent = question;

  // Shuffle and render options
  const shuffledOptions = shuffleOptions(options);
  optionEl.textContent = ""; // Clear previous options
  shuffledOptions.forEach((opt) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    optionEl.appendChild(btn);

    // Add click event listener to each button
    btn.addEventListener("click", () => {
      // Disable all buttons after an answer is selected
      const buttons = optionEl.querySelectorAll("button");
      buttons.forEach((button) => (button.disabled = true));

      // Check if the selected answer is correct
      if (opt === correctAnswer) {
        score += 1; // Increase score by 1
        btn.style.backgroundColor = "green"; // Correct answer
        correctSound.play(); // Play correct sound
      } else {
        score -= 0.25; // Deduct 0.25 for wrong answer
        btn.style.backgroundColor = "red"; // Incorrect answer
        wrongSound.play(); // Play wrong sound
      }

      // Apply colors to all buttons
      buttons.forEach((button) => {
        if (button.textContent === correctAnswer) {
          button.style.backgroundColor = "green"; // Correct answer
        } else {
          button.style.backgroundColor = "red"; // Incorrect answer
        }
      });

      // Update the score on the DOM
      scoreEl.textContent = `Score: ${score}/${totalScore}`;

      // Automatically proceed to the next question after 1 second
      setTimeout(nextQuestion, 1000);
    });
  });
}

// Function to move to the next question
function nextQuestion() {
  currentQuestion++;
  if (currentQuestion >= questionsObj.length) {
    questionEl.textContent = "Quiz Completed";
    
    optionEl.textContent = ""; // Clear options
    nextEl.remove()
    quizCompleted.play()
  } else {
    showQuestion();
  }
}

//add a event  listner for next button

nextEl.addEventListener('click', nextQuestion)


// Function to shuffle options
function shuffleOptions(options) {
  for (let i = options.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [options[i], options[j]] = [options[j], options[i]]; // Swap elements
  }
  return options;
}
