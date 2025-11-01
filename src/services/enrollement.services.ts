import { request } from "./api";

export async function getEnrollment(id_teacher: string) {
  return request("get", `/enrollment?teacherId=${id_teacher}`);
}
