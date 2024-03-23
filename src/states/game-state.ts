import { createSignal } from "solid-js";

export enum GameState {
  PRELOAD,
  HOME,
  START_TRANSITION,
  PRE_SETTINGS,
  GAME_TRANSITION,
  INTERVIEWING,
  POST_INTERVIEW,
}

export const [gameState, setGameState] = createSignal(GameState.PRELOAD);
