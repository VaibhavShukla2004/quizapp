import { getQuizQuestions } from "../api/quizApi.js";

const quizForm = document.getElementById("quizForm");
const quizTitle = document.getElementById("quizTitle");

const params = new URLSearchParams(window.location.search);
const quizId = params.get("id");

if (!quizId) {
  quizForm.innerHTML = "<p class='text-red-500'>Invalid quiz</p>";
  throw new Error("Quiz ID missing");
}

async function loadQuiz() {
  try {
    const questions = await getQuizQuestions(quizId);
    quizTitle.innerText = `Quiz #${quizId}`;

    questions.forEach((q, index) => {
      const div = document.createElement("div");
      div.className = "question-block bg-white p-4 rounded shadow";


      div.innerHTML = `
        <p class="font-semibold mb-2">
          ${index + 1}. ${q.questionTitle}
        </p>

        ${[q.option1, q.option2, q.option3, q.option4]
          .map(
            (opt, i) => `
            <label class="block">
              <input type="radio"
                     name="q${q.id}"
                     value="${opt}"
                     class="mr-2">
              ${opt}
            </label>`
          )
          .join("")}
      `;

      quizForm.appendChild(div);
    });
  } catch (e) {
    quizForm.innerHTML =
      "<p class='text-red-500'>Failed to load quiz</p>";
    console.error(e);
  }
}

loadQuiz();

import { submitQuiz } from "../api/quizApi.js";

const submitBtn = document.getElementById("submitBtn");
const resultPara = document.getElementById("result");

submitBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const responses = [];

  document.querySelectorAll(".question-block").forEach(div => {
    const checked = div.querySelector("input[type='radio']:checked");
    if (checked) {
      const questionId = checked.name.substring(1); // q{id}
      responses.push({
        questionId: parseInt(questionId),
        response: checked.value
      });
    }
  });

  try {
    const score = await submitQuiz(quizId, responses);
    resultPara.innerText = `Your score: ${score}`;
  } catch (err) {
    resultPara.innerText = "Submission failed";
    console.error(err);
  }
});
