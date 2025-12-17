// js/api/quizApi.js
import { BASE_URL } from "../config.js";

export async function getAllQuizzes() {
  const res = await fetch(`${BASE_URL}/quiz`);
  if (!res.ok) throw new Error("Failed to fetch quizzes");
  return res.json();
}

export async function getQuizQuestions(id) {
  const res = await fetch(`${BASE_URL}/quiz/questions/${id}`);
  if (!res.ok) throw new Error("Failed to fetch quiz questions");
  return res.json();
}

export async function addQuestion(question) {
  const res = await fetch(`${BASE_URL}/question`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(question)
  });

  if (!res.ok) throw new Error("Failed to add question");
  return res.text();
}

export async function getAllQuestions() {
  const res = await fetch(`${BASE_URL}/question`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function getQuestionById(id) {
  const res = await fetch(`${BASE_URL}/question/${id}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function getQuestionsByCategory(category) {
  const res = await fetch(`${BASE_URL}/question/category/${category}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function getQuestionsByDifficulty(level) {
  const res = await fetch(`${BASE_URL}/question/difficulty/${level}`);
  if (!res.ok) throw new Error("Failed");
  return res.json();
}

export async function updateQuestion(id, question) {
  const res = await fetch(`${BASE_URL}/question/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(question)
  });
  if (!res.ok) throw new Error("Update failed");
  return res.text();
}

export async function deleteQuestion(id) {
  const res = await fetch(`${BASE_URL}/question/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Delete failed");
  return res.text();
}
