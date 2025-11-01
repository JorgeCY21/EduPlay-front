import { request } from "./api";

export async function getPlayRelations() {
  return request("get", `/play-relation`);
}

export async function getPlayRelationsByActivityId(activity_id: string) {
  return request("get", `/play-relation/activity/${activity_id}`);
}