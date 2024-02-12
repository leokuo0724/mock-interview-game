import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type InterviewState =
  | "idle"
  | "ai-responding"
  | "user-responding"
  | "finished";

export const [messages, setMessages] = createStore<Message[]>([]);

export const [interviewState, setInterviewState] =
  createSignal<InterviewState>("idle");
