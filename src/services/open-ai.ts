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

  private createGPT3Completion(messages: Message[]) {
    if (!this.openai) throw new Error("OpenAI not initialized");
    return this.openai.chat.completions.create({
      messages,
      model: "gpt-3.5-turbo",
      max_tokens: 256,
    });
  }

  public async chat() {
    setInterviewState("ai-responding");
    const res = await this.createGPT3Completion(messages);
    const message = res.choices[0]?.message as Message;
    if (!message) throw new Error("No message returned from OpenAI");

    setMessages(produce((prev) => prev.push(message)));
    setInterviewState(
      message.content.endsWith(END_MARK) ? "finished" : "user-responding"
    );
  }

  // TODO: function that simply get response but not set message
}
export const aiService = new AIService();

export const END_MARK = "#finish#";

export const generateAIStartingSystemMessage = ({
  companyDetails,
  jobLevel,
  jobPosition,
}: {
  companyDetails: string;
  jobLevel: string;
  jobPosition: string;
}): Message => {
  return {
    role: "system",
    content: `Your are a CTO from a ${companyDetails} company. User is a ${jobLevel} ${jobPosition} candidate. Start with greeting and then ask a question to interview the user. Do not make message end with ${END_MARK} until user answered 2 questions. After that, you can end the conversation by sending a message ends with ${END_MARK}.`,
  };
};

export const generateAIEndingSystemMessage = (): Message => {
  return {
    role: "system",
    content: `The interview has been finished. Generate a feedback message based on interviewee's answer and job position. The message format constructed by three parts: #result# which Y(pass) or N(no pass), #rating# which from A+ to F-, #feedback# which is a sentence to describe the interviewee's performance, and #suggestion# which is a sentence to give some advice to the interviewee.`,
  };
};
