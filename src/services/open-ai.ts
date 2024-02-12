import OpenAI from "openai";
import { produce } from "solid-js/store";
import {
  Message,
  messages,
  setInterviewState,
  setMessages,
} from "../states/messages";

class AIService {
  public openai: OpenAI | null = null;

  public init(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  public async chat() {
    if (!this.openai) throw new Error("OpenAI not initialized");

    setInterviewState("ai-responding");
    const res = await this.openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 256,
    });
    const message = res.choices[0]?.message as Message;
    if (!message) throw new Error("No message returned from OpenAI");
    setMessages(produce((prev) => prev.push(message)));
    setInterviewState(
      message.content.endsWith(endMark) ? "finished" : "user-responding"
    );
  }
}

export const aiService = new AIService();

export const endMark = "#finish#";
