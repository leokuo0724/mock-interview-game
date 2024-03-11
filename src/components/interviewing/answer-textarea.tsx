import { VsDiscard, VsSend } from "solid-icons/vs";
import { JSX } from "solid-js";
import { produce } from "solid-js/store";
import { aiService } from "../../services/open-ai";
import { ParsedAIContent, setMessages } from "../../states/messages";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

type AnswerTextareaProps = {
  handleCancel: () => void;
};

export const AnswerTextarea = ({ handleCancel }: AnswerTextareaProps) => {
  const handleSubmit: JSX.EventHandlerUnion<
    HTMLFormElement,
    Event & {
      submitter: HTMLElement;
    }
  > = async (event) => {
    event.preventDefault();
    const answer = (event.target as any).elements.namedItem("answer").value;
    setMessages(
      produce((prev) =>
        prev.push({ role: "user", content: stringifyUserContent(answer) })
      )
    );
    await aiService.chat();
    handleCancel();
  };

  return (
    <form
      id="answer-textarea"
      class="flex flex-col md:flex-row w-full gap-2 items-end"
      onsubmit={handleSubmit}
    >
      <Textarea
        name="answer"
        class="resize-none"
        placeholder="Enter your message here."
        maxLength="512"
        required
      />
      <div class="flex flex-col gap-2">
        <Button
          class="flex-shrink-0"
          size="sm"
          variant="outline"
          onclick={handleCancel}
        >
          <VsDiscard />
        </Button>
        <Button
          class="flex-shrink-0"
          size="sm"
          type="submit"
          form="answer-textarea"
        >
          <VsSend />
        </Button>
      </div>
    </form>
  );
};

const stringifyUserContent = (body: string) => {
  const data: ParsedAIContent = {
    type: "ongoing",
    body,
  };
  return JSON.stringify(data);
};
