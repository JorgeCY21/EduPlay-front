import { request } from "./api";

export async function login(email: string, password: string) {
  return request("post", "/auth/login", { email, password });
}