import { createQuiz } from "../api/quizApi.js";
import { updateQuestion, deleteQuestion } from "../api/questionApi.js";

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

import { addQuestion } from "../api/questionApi.js";

const qForm = document.getElementById("questionForm");
const qStatus = document.getElementById("qStatus");

qForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const question = {
    questionTitle: document.getElementById("qTitle").value,
    category: document.getElementById("qCategory").value,
    option1: document.getElementById("opt1").value,
    option2: document.getElementById("opt2").value,
    option3: document.getElementById("opt3").value,
    option4: document.getElementById("opt4").value,
    rightAnswer: document.getElementById("answer").value,
    difficultyLevel: document.getElementById("difficulty").value
  };

  try {
    await addQuestion(question);
    qStatus.innerText = "Question added";
    qStatus.className = "text-green-600";
    qForm.reset();
  } catch (err) {
    qStatus.innerText = "Failed to add question";
    qStatus.className = "text-red-600";
    console.error(err);
  }
});


import {
  getAllQuestions,
  getQuestionById,
  getQuestionsByCategory,
  getQuestionsByDifficulty
} from "../api/questionApi.js";

const listDiv = document.getElementById("questionList");
const searchBtn = document.getElementById("searchBtn");

function renderQuestions(questions) {
  listDiv.innerHTML = "";

  if (!questions || questions.length === 0) {
    listDiv.innerHTML = "<p>No questions found</p>";
    return;
  }

  questions.forEach(q => {
    const div = document.createElement("div");
    div.className = "bg-white p-3 rounded shadow";

    div.innerHTML = `
      <p class="font-semibold">${q.id}. ${q.questionTitle}</p>
      <p class="text-sm text-gray-600">
        ${q.category} | ${q.difficultyLevel}
      </p>
    `;

    //div.addEventListener("click", () => showDetails(q));
    div.onclick = () => showDetails(q);
    listDiv.appendChild(div);
  });
}

async function loadAll() {
  const data = await getAllQuestions();
  renderQuestions(data);
}

searchBtn.addEventListener("click", async () => {
  const type = document.getElementById("searchType").value;
  const value = document.getElementById("searchValue").value;

  let result;

  if (type === "all") result = await getAllQuestions();
  else if (type === "id") result = [await getQuestionById(value)];
  else if (type === "category") result = await getQuestionsByCategory(value);
  else if (type === "difficulty") result = await getQuestionsByDifficulty(value);

  renderQuestions(result);
});

loadAll();

let openQuestionId = null;

function showDetails(q) {
  const box = document.getElementById("questionDetails");

  // If same question clicked again → close
  if (openQuestionId === q.id) {
    box.classList.add("hidden");
    box.innerHTML = "";
    openQuestionId = null;
    return;
  }

  // Otherwise → show / replace content
  openQuestionId = q.id;
  box.classList.remove("hidden");

  box.innerHTML = `
  <h3 class="text-lg font-bold mb-2">${q.questionTitle}</h3>

  <input id="editTitle" class="w-full p-2 border rounded mb-2"
         value="${q.questionTitle}" />

  <input id="editCategory" class="w-full p-2 border rounded mb-2"
         value="${q.category}" />

  <input id="editOpt1" class="w-full p-2 border rounded mb-1" value="${q.option1}" />
  <input id="editOpt2" class="w-full p-2 border rounded mb-1" value="${q.option2}" />
  <input id="editOpt3" class="w-full p-2 border rounded mb-1" value="${q.option3}" />
  <input id="editOpt4" class="w-full p-2 border rounded mb-2" value="${q.option4}" />

  <input id="editAnswer" class="w-full p-2 border rounded mb-2"
         value="${q.rightAnswer}" />

  <input id="editDifficulty" class="w-full p-2 border rounded mb-3"
         value="${q.difficultyLevel}" />

  <div class="flex gap-2">
    <button id="updateBtn"
            class="bg-blue-600 text-white px-4 py-2 rounded">
      Update
    </button>

    <button id="deleteBtn"
            class="bg-red-600 text-white px-4 py-2 rounded">
      Delete
    </button>
  </div>
`;
  document.getElementById("updateBtn").onclick = async () => {
    const updated = {
      questionTitle: document.getElementById("editTitle").value,
      category: document.getElementById("editCategory").value,
      option1: document.getElementById("editOpt1").value,
      option2: document.getElementById("editOpt2").value,
      option3: document.getElementById("editOpt3").value,
      option4: document.getElementById("editOpt4").value,
      rightAnswer: document.getElementById("editAnswer").value,
      difficultyLevel: document.getElementById("editDifficulty").value
    };

    await updateQuestion(q.id, updated);
    loadAll();           // refresh list
  };

  document.getElementById("deleteBtn").onclick = async () => {
    await deleteQuestion(q.id);
    openQuestionId = null;
    document.getElementById("questionDetails").classList.add("hidden");
    loadAll();           // refresh list
  };
}

