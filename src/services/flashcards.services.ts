import { request } from "./api";

export async function getFlashcard() {
  return request("get", `/flashcards`);
}

export async function getFlashcardByActivityId(activity_id: string) {
  return request("get", `/flashcards/activity/${activity_id}`);
}