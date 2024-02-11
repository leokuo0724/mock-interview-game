import { createStore } from "solid-js/store";

type InterviewConfig = {
  name: string;
  gender: string;
  position: string;
  level: string;
  extraInfo?: string;
};

export const [interviewConfig, setInterviewConfig] =
  createStore<InterviewConfig>({
    name: "",
    gender: "Male",
    position: "Frontend Engineer",
    level: "Junior",
  });
