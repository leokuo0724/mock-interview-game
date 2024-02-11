import clsx from "clsx";
import { Motion } from "solid-motionone";

type MessageProps = {
  fromUser: boolean;
  content: string;
};

export const Message = ({ fromUser, content }: MessageProps) => {
  return (
    <Motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      class={clsx(
        "flex w-full px-8 snap-end",
        fromUser ? "justify-start" : "justify-end"
      )}
    >
      <div
        class={clsx(
          "w-2/6 max-h-32 overflow-y-auto no-scrollbar border border-slate-800 p-2 break-words",
          fromUser ? "text-right" : "text-left"
        )}
      >
        <p class="text-sm">{content}</p>
      </div>
    </Motion.div>
  );
};
