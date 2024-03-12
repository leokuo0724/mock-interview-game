import OpenAI from "openai";
import { produce } from "solid-js/store";
import {
  OpenAIMessage,
  ParsedAIContent,
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

  private createGPT3Completion(messages: OpenAIMessage[]) {
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
    const message = res.choices[0]?.message as OpenAIMessage;
    if (!message) throw new Error("No message returned from OpenAI");

    setMessages(produce((prev) => prev.push(message)));
    const parsed = JSON.parse(message.content) as ParsedAIContent;
    switch (parsed.type) {
      case "ongoing":
        setInterviewState("user-responding");
        break;
      case "finished":
        setInterviewState("finished");
        break;
      case "report":
        setInterviewState("summarized");
        break;
      default:
        break;
    }
  }

  // TODO: function that simply get response but not set message
}
export const aiService = new AIService();

export const generateAIStartingSystemMessage = ({
  companyDetails,
  jobLevel,
  jobPosition,
}: {
  companyDetails: string;
  jobLevel: string;
  jobPosition: string;
}): OpenAIMessage => {
  return {
    role: "system",
    content: `Your are a CTO from a ${companyDetails} company. User is a ${jobLevel} ${jobPosition} candidate. Start with greeting and then ask 3 depth questions to interview the user gradually. Response whole message by json format. There are two props -- body and type.Body is the message you sent to the user, and type is "ongoing" or "finished". Do not make message with type "finished" if body contain any further question. Only end the interview with "finished" type of message after you are done`,
  };
};

export const generateAIEndingSystemMessage = (): OpenAIMessage => {
  return {
    role: "system",
    content: `The interview has been finished. Sent a message with "report" type. Body is brief of the whole interview. Besides type and body props in json, add new prop call metadata which contains result and rating. Based on interviewee's performance and job position. Result is Y or N, indicates user is pass or not. Rating is from A+ to F-. Suggestion is a sentence to give some advice to the interviewee.`,
  };
};
