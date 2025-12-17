import { BASE_URL } from "../config.js";

export async function getAllQuizzes() {
  const response = await fetch(`${BASE_URL}/quiz`);
  if (!response.ok) {
    throw new Error("Failed to load quizzes");
  }
  return response.json();
}
