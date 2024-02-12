import clsx from "clsx";
import { Motion } from "solid-motionone";
import { endMark } from "../../services/open-ai";
import { Message as MessageType } from "../../states/messages";

export const Message = ({ role, content }: MessageType) => {
  if (role === "system") return null;

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
        <p class="text-sm">
          {content.endsWith(endMark) ? content.replace(endMark, "") : content}
        </p>
      </div>
    </Motion.div>
  );
};
