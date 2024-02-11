import clsx from "clsx";
import { Motion } from "solid-motionone";
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
      <div
        class={clsx(
          "w-2/6 max-h-32 overflow-y-auto no-scrollbar border border-slate-800 p-2 break-words",
          role === "user" ? "text-right" : "text-left"
        )}
      >
        <p class="text-sm">{content}</p>
      </div>
    </Motion.div>
  );
};
