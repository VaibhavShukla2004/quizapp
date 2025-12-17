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
