import { request } from "./api";

export async function createActividadesAI(activity_id: string, { topic, context, minItems }: { topic: string, context: string, minItems: number }) {
  return request("post", `/ai/generate-content/${activity_id}`, { topic, context, minItems });
}

export async function chatBot(student_id: string, activity_id: string, message: string, conversation_history: Array<{ role: string, text: string }>) {
  return request("post", `/ai/chat`, { student_id, activity_id, message, conversation_history });
}