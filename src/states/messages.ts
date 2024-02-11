import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export const [messages, setMessages] = createStore<Message[]>([]);

export const [isAILoading, setAILoading] = createSignal(false);