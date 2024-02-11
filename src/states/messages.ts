import { createStore } from "solid-js/store";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const [messages, setMessages] = createStore<Message[]>([]);
