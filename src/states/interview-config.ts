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
  createStore<InterviewConfig>({
    name: null,
    gender: null,
    position: null,
    level: null,
    rounds: [],
  });

export const [currentInterviewRound, setCurrentInterviewRound] =
  createSignal(0);
