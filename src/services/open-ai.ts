import OpenAI from "openai";
import { Message, messages, setMessages } from "../states/messages";

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

    const res = await this.openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 256,
    });
    const message = res.choices[0]?.message as Message;
    if (!message) return;
    setMessages((prev) => [message, ...prev]);
  }
}

export const aiService = new AIService();
