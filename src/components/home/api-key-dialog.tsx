import { Component, createSignal } from "solid-js";
import { aiService } from "../../services/open-ai";
import { GameState, setGameState } from "../../states/game-state";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";

export const APIKeyDialog: Component = (props) => {
  const [isOpen, setOpen] = createSignal(false);

  return (
    <Dialog open={isOpen()} onOpenChange={setOpen}>
      {/* @ts-ignore */}
      <DialogTrigger as={Button} variant="outline" size="sm" {...props}>
        start
      </DialogTrigger>
      <DialogContent>
        <DialogHeader class="text-left gap-2">
          <DialogTitle>Setup OpenAI API Key</DialogTitle>
          <DialogDescription class="flex flex-col gap-2">
            The API key is only used for generating your response in this game.
            We won't store it anywhere.
          </DialogDescription>
        </DialogHeader>
        <form
          id="api-form"
          onsubmit={(event) => {
            event.preventDefault();
            const apiKeyValue = (event.target as any).elements.namedItem(
              "api-key"
            ).value;

            if (import.meta.env.DEV) {
              aiService.init(import.meta.env.VITE_OPENAI_API_KEY);
            } else {
              aiService.init(apiKeyValue);
            }

            setOpen(false);
            setGameState(GameState.START_TRANSITION);
          }}
        >
          <Input
            name="api-key"
            placeholder="Enter API Key Here."
            class="flex-1"
            required
          />
        </form>
        <DialogFooter>
          <Button form="api-form" type="submit" size="sm">
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
