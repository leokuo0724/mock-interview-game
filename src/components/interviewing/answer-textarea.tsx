import { VsDiscard, VsSend } from "solid-icons/vs";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type AnswerTextareaProps = {
  handleCancel: () => void;
};

export const AnswerTextarea = ({ handleCancel }: AnswerTextareaProps) => {
  return (
    <div class="flex flex-col md:flex-row w-3/4 gap-2 items-end">
      <Textarea class="resize-none" placeholder="Enter your message here." />
      <div class="flex flex-col gap-2">
        <Button
          class="flex-shrink-0"
          size="sm"
          variant="outline"
          onclick={handleCancel}
        >
          <VsDiscard />
        </Button>
        <Button class="flex-shrink-0" size="sm">
          <VsSend />
        </Button>
      </div>
    </div>
  );
};
