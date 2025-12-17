import { getAllQuizzes } from "../api/quizApi.js";

const quizListDiv = document.getElementById("quizList");

async function loadQuizzes() {
  try {
    const quizzes = await getAllQuizzes();

    if (quizzes.length === 0) {
      quizListDiv.innerHTML = "<p>No quizzes available</p>";
      return;
    }

    quizzes.forEach(quiz => {
      const div = document.createElement("div");
      div.className =
        "bg-white p-4 rounded shadow cursor-pointer hover:bg-gray-100";

      div.innerHTML = `
        <h2 class="text-xl font-semibold">${quiz.title}</h2>
        <p class="text-sm text-gray-600">Quiz ID: ${quiz.id}</p>
      `;

      div.onclick = () => {
        window.location.href = `quiz.html?id=${quiz.id}`;
      };

      quizListDiv.appendChild(div);
    });
  } catch (err) {
    quizListDiv.innerHTML = "<p class='text-red-500'>Error loading quizzes</p>";
    console.error(err);
  }
}

loadQuizzes();
