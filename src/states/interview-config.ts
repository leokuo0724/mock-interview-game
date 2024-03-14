import { createSignal } from "solid-js";
import { createStore } from "solid-js/store";

type InterviewConfig = {
  name: string | null;
  gender: string | null;
  position: string | null;
  level: string | null;
  rounds: string[];
  extraInfo?: string;
};

export const [interviewConfig, setInterviewConfig] =
  // createStore<InterviewConfig>({
  //   name: null,
  //   gender: null,
  //   position: null,
  //   level: null,
  //   rounds: [],
  // });
  createStore<InterviewConfig>({
    name: "Leo Kuo",
    gender: "Male",
    position: "Frontend Engineer",
    level: "Senior",
    rounds: ["HR", "Tech Lead / CTO"],
  });

export const [currentInterviewRound, setCurrentInterviewRound] =
  createSignal(0);

type InterviewRating =
  | "A+"
  | "A"
  | "A-"
  | "B+"
  | "B"
  | "B-"
  | "C+"
  | "C"
  | "C-"
  | "D+"
  | "D"
  | "D-";
export type InterviewReport = {
  interviewerPosition: string;
  isPassed: boolean;
  rating: InterviewRating;
  summary: string;
  suggestion: string;
};

export const [interviewReports, setInterviewReports] = createStore<
  InterviewReport[]
>([
  {
    interviewerPosition: "CTO",
    isPassed: true,
    rating: "A",
    summary:
      "The interviewee shows the understanding of the company's vision and mission. He also has a good understanding of the technology stack that we are using.",
    suggestion:
      "Keep the momentum and continue to learn and grow. We are looking forward to seeing you in the next round.",
  },
]);
