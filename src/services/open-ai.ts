import OpenAI from "openai";
import { batch } from "solid-js";
import { produce } from "solid-js/store";
import {
  currentInterviewRound,
  setInterviewReports,
} from "~/states/interview-config";
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
        batch(() => {
          setInterviewReports(currentInterviewRound(), "summary", parsed.body);
          setInterviewReports(
            currentInterviewRound(),
            "isPassed",
            parsed.metadata.result === "Y"
          );
          setInterviewReports(
            currentInterviewRound(),
            "rating",
            parsed.metadata.rating
          );
          setInterviewReports(
            currentInterviewRound(),
            "suggestion",
            parsed.metadata.suggestion
          );
          setInterviewState("summarized");
        });
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
  interviewerPosition,
}: {
  companyDetails: string;
  jobLevel: string;
  jobPosition: string;
  interviewerPosition: string;
}): OpenAIMessage => {
  return {
    role: "system",
    content: `Your are a ${interviewerPosition} from a ${companyDetails} company. User is a ${jobLevel} ${jobPosition} candidate. Start with greeting and explain who you are and then start asking questions to interview the user (Focused point, HR: personality, CTO: technical, CEO: behavioral). Response whole message by json format. There are two props -- body and type.Body is the message you sent to the user, and type is "ongoing" or "finished". Do not mark as "finished" if there is any further question in message. After user answered 3 depth questions, send a "finished" message (should not include any question in the message)`,
  };
};

export const generateAIEndingSystemMessage = (): OpenAIMessage => {
  return {
    role: "system",
    content: `The interview has been finished. Sent a message with "report" type. Body is brief of the whole interview. Besides type and body props in json, add new prop call metadata which contains result and rating. Based on interviewee's performance and job position. Result is Y or N, indicates user is pass or not. Rating is from A+ to D-. Suggestion is a sentence to give some advice to the interviewee.`,
  };
};
