import OpenAI from "openai";
import { produce } from "solid-js/store";
import {
  Message,
  messages,
  setAILoading,
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

    setAILoading(true);
    const res = await this.openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 256,
    });
    const message = res.choices[0]?.message as Message;
    if (!message) throw new Error("No message returned from OpenAI");
    setMessages(produce((prev) => prev.push(message)));
    setAILoading(false);
  }
}

export const aiService = new AIService();
