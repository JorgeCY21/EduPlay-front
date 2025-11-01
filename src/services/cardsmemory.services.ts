import { request } from "./api";

export async function getCardsMemory() {
  return request("get", `/cards-memory`);
}

export async function getCardsMemoryByActivityId(activity_id: string) {
  return request("get", `/cards-memory/activity/${activity_id}`);
}