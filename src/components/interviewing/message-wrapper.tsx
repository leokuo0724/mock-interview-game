import clsx from "clsx";
import { Motion } from "solid-motionone";
import { OpenAIMessage, ParsedAIContent } from "../../states/messages";

export const MessageWrapper = ({ role, content }: OpenAIMessage) => {
  if (role === "system") return null;

  const parsedContent = JSON.parse(content) as ParsedAIContent;
  if (parsedContent.type === "report") return null;

  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      class={clsx(
        "flex w-full px-8 snap-end",
        role === "user" ? "justify-start" : "justify-end"
      )}
    >
      <div class="w-2/6 no-scrollbar rounded-lg border shadow-sm p-2 break-words">
        <p class="text-sm">{parsedContent.body}</p>
      </div>
    </Motion.div>
  );
};
