import OpenAI from "openai";

class AIService {
  public openai: OpenAI | null = null;

  public init(apiKey: string) {
    this.openai = new OpenAI({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }

  public chat(content: string) {
    if (!this.openai) throw new Error("OpenAI not initialized");

    return this.openai.chat.completions.create({
      messages: [{ role: "user", content }],
      model: "gpt-3.5-turbo",
    });
  }
}

export const aiService = new AIService();
