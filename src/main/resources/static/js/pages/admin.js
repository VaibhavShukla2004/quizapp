import { createQuiz } from "../api/quizApi.js";

const form = document.getElementById("quizForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const data = {
    title: document.getElementById("title").value,
    category: document.getElementById("category").value,
    numberOfQuestions: document.getElementById("count").value,
    marksForCorrectAnswer: document.getElementById("correct").value,
    marksForWrongAnswer: document.getElementById("wrong").value
  };

  try {
    await createQuiz(data);
    status.innerText = "Quiz created successfully";
    status.className = "text-green-600";
    form.reset();
  } catch (err) {
    status.innerText = "Failed to create quiz";
    status.className = "text-red-600";
    console.error(err);
  }
});
