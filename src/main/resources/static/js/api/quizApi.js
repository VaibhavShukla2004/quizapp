import { BASE_URL } from "../config.js";

export async function getAllQuizzes() {
  const response = await fetch(`${BASE_URL}/quiz`);
  if (!response.ok) {
    throw new Error("Failed to load quizzes");
  }
  return response.json();
}

export async function getQuizQuestions(quizId) {
  const res = await fetch(`${BASE_URL}/quiz/questions/${quizId}`);
  if (!res.ok) throw new Error("Failed to load quiz questions");
  return res.json();
}

export async function submitQuiz(quizId, responses) {
  const res = await fetch(`${BASE_URL}/quiz/submit/${quizId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(responses)
  });

  if (!res.ok) throw new Error("Failed to submit quiz");
  return res.json(); // score (int)
}

export async function createQuiz(data) {
  const params = new URLSearchParams(data).toString();

  const res = await fetch(`${BASE_URL}/quiz?${params}`, {
    method: "POST"
  });

  if (!res.ok) throw new Error("Failed to create quiz");
  return res.text();
}
