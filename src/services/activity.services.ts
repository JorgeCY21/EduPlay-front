import { request } from "./api";

export async function getActivityRecently(id_teacher: string) {
  return request("get", `/activity/recently/${id_teacher}`);
}

export async function getActivityComing(id_teacher: string) {
  return request("get", `/activity/upcoming/${id_teacher}`);
}

export async function createActivity({title, description, hasIntroduction, enrollment_id}: {title:string, description:string, hasIntroduction:boolean, enrollment_id:string}) {
  const start_time = new Date().toISOString();
  const end_time = new Date(Date.now() + 60 * 60 * 1000).toISOString();
  return request("post", `/activity`, {title, description, hasIntroduction, enrollment_id, start_time, end_time});
}