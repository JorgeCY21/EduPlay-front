import { request } from "./api";

export async function getQuiz() {
  return request("get", `/quiz`);
}

export async function getQuizByActivityId(activity_id: string) {
  return request("get", `/quiz/activity/${activity_id}`);
}