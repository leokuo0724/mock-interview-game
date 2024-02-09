import { createSignal } from "solid-js";

export enum GameState {
  PRELOAD,
  HOME,
  START_TRANSITION,
}

export const [gameState, setGameState] = createSignal(GameState.PRELOAD);
