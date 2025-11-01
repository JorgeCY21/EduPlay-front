import { request } from "./api";

export async function getTeacherUser(id_user: string) {
  return request("get", `/teacher/user/${id_user}`);
}

export async function getEmotionStats(teacher_id: string) {
  return request("get", `/teacher/${teacher_id}/emotion-stats`);
}

export async function getOverallStats(teacher_id: string) {
  return request("get", `/teacher/${teacher_id}/overall-stats`);
}