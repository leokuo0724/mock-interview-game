import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type OpenAIMessage = {
  role: "system" | "user" | "assistant";
  content: string;
};
/** Parsed from open AI message's content */
export type ParsedAIContent = {
  body: string;
  type: "ongoing" | "finished" | "report";
  metadata?: any; // FIXME
};

export type InterviewState =
  | "idle"
  | "ai-responding"
  | "user-responding"
  | "finished"
  | "summarized";

export const [messages, setMessages] = createStore<OpenAIMessage[]>([]);

export const [interviewState, setInterviewState] =
  createSignal<InterviewState>("idle");
