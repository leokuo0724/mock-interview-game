import { createSignal } from "solid-js";

export enum GameState {
  HOME,
  START_TRANSITION,
}

export const [gameState, setGameState] = createSignal(GameState.HOME);
