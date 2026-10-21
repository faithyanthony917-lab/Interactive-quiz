// Each question: the text, four options, the index of the right answer (0-3), and an explanation.
const questions = [
  {
    question: "Which element loads an external JavaScript file?",
    options: ["<css>", "<script>", "<javascript>", "<code>"],
    answer: 1,
    why: "The script element loads or contains JavaScript."
  },
  {
    question: "Which keyword declares a reassignable block-scoped variable?",
    options: ["const", "static", "let", "define"],
    answer: 2,
    why: "let declares a block-scoped variable that can be reassigned."
  },
  {
    question: "Which array method adds an item to the end?",
    options: ["pop()", "push()", "shift()", "join()"],
    answer: 1,
    why: "push() adds items to the end of an array."
  },
  {
    question: "What does DOM stand for?",
    options: ["Data Object Mode", "Document Order Method", "Digital Ordinance Model", "Document Object Model"],
    answer: 3,
    why: "DOM stands for Document Object Model."
  },
  {
    question: "Which operator checks both value and type?",
    options: ["=", "==", "===", "!="],
    answer: 2,
    why: "=== is the strict equality operator."
  }
];

let current = 0;      // which question we are on
let score = 0;        // how many answers are correct
let answered = false; // has the user picked an answer for this question yet?

const $ = selector => document.querySelector(selector);

// Display the current question and its four options
function showQuestion() {
  answered = false;
  const q = questions[current];

  $("#number").textContent = "Question " + (current + 1) + " of " + questions.length;
  $("#score").textContent = "Score: " + score;
  $("#bar").style.width = (current / questions.length * 100) + "%";
  $("#question").textContent = q.question;
  $("#feedback").textContent = "";
  $("#next").disabled = true;
  $("#next").textContent = current === questions.length - 1 ? "See results" : "Next question";

  $("#options").innerHTML = "";
  q.options.forEach((text, index) => {
    const button = document.createElement("button");
    button.textContent = text;
    button.addEventListener("click", () => selectAnswer(index));
    $("#options").appendChild(button);
  });
}

// Called when the user clicks an option
function selectAnswer(chosen) {
  if (answered) return; // ignore extra clicks
  answered = true;
  const q = questions[current];

  // Colour the right answer green and a wrong choice red, and lock the buttons
  [...$("#options").children].forEach((button, index) => {
    button.disabled = true;
    if (index === q.answer) button.classList.add("correct");
    if (index === chosen && chosen !== q.answer) button.classList.add("wrong");
  });

  if (chosen === q.answer) {
    score++;
    $("#feedback").textContent = "Correct! " + q.why;
  } else {
    $("#feedback").textContent = "Not quite. " + q.why;
  }
  $("#score").textContent = "Score: " + score;
  $("#next").disabled = false;
}

// Result message depends on the final score
function resultMessage() {
  if (score === questions.length) return "Excellent, all answers correct!";
  if (score >= 3) return "Good effort. Review the explanations and try again.";
  return "Keep learning and try again.";
}

$("#next").addEventListener("click", function () {
  if (!answered) return;
  if (current < questions.length - 1) {
    current++;
    showQuestion();
  } else {
    $("#quiz").classList.add("hidden");
    $("#result").classList.remove("hidden");
    $("#final").textContent = "You scored " + score + " out of " + questions.length +
      " (" + (score / questions.length * 100) + "%).";
    $("#comment").textContent = resultMessage();
  }
});

$("#restart").addEventListener("click", function () {
  current = 0;
  score = 0;
  $("#result").classList.add("hidden");
  $("#quiz").classList.remove("hidden");
  showQuestion();
});

showQuestion();
