import { request } from "./api";

export async function getStudentUser(id_user: string) {
  return request("get", `/student/user/${id_user}`);
}

export async function getStudentsClassroom(classroomId:string) {
  return request("get", `/student?classroomId=${classroomId}`);
}