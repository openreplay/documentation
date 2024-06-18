export interface Message {
  role: Role;
  content: string;
  isContinuation?: boolean; 
}

export type Role = "assistant" | "user";
