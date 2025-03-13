export interface Message {
  role: string;
  content: string;
  isContinuation?: boolean; 
}

export type Role = "assistant" | "user";
