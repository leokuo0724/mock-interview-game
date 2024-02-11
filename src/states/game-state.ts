import { createSignal } from "solid-js";

export enum GameState {
  PRELOAD,
  HOME,
  START_TRANSITION,
  PRE_SETTINGS,
  GAME_TRANSITION,
  INTERVIEWING,
}

export const [gameState, setGameState] = createSignal(GameState.PRELOAD);
