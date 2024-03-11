import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

export type Message = {
  role: "system" | "user" | "assistant";
  content: string;
};

export type InterviewState =
  | "idle"
  | "ai-responding"
  | "user-responding"
  | "finished";

// export const [messages, setMessages] = createStore<Message[]>([
//   {
//     role: "system",
//     content:
//       "Your are a CTO from a startup, about 10 engineers, focused on UX company. User is a Junior Frontend Engineer candidate. Start with greeting and then ask a question to interview the user. Do not make message end with #finish# until user answered 2 questions. After that, you can end the conversation by sending a message ends with #finish#.",
//   },
//   {
//     role: "assistant",
//     content:
//       "Hello and welcome to our team! We're excited to learn more about you. \n\nCan you tell us about a recent project you worked on where you focused on improving the user experience for the frontend?",
//   },
//   {
//     role: "user",
//     content:
//       "I made a RWD website for users. Also, did SEO for that by reducing time of page renders.",
//   },
//   {
//     role: "assistant",
//     content:
//       "That sounds like a great project! How did you approach optimizing the page load time for better SEO performance?",
//   },
//   {
//     role: "user",
//     content:
//       "Bundle optimization for tech parts and keywords fine-tune experiments.",
//   },
//   {
//     role: "assistant",
//     content:
//       "It's great to hear about your approach to optimization! Can you also share any specific tools or techniques you used to measure the impact of your optimization efforts on the website's SEO performance?",
//   },
//   {
//     role: "user",
//     content: "I'm not sure about that. Could you give me some hints?",
//   },
//   {
//     role: "assistant",
//     content:
//       "Of course! Some common tools for measuring SEO performance include Google Search Console, Google Analytics, SEMrush, Moz, and Ahrefs. These tools can provide insights into keyword rankings, organic traffic, backlinks, and more. It's always valuable to track and analyze the impact of your optimization efforts using these tools. Thank you for sharing your experience with us! #finish#",
//   },
// ]);
export const [messages, setMessages] = createStore<Message[]>([]);

export const [interviewState, setInterviewState] =
  createSignal<InterviewState>("idle");
