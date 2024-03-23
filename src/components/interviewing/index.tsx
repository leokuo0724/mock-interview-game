import { For, createSignal, onMount } from "solid-js";
import { produce } from "solid-js/store";
import { Motion } from "solid-motionone";
import { setShowReport } from "~/states/ui";
import {
  aiService,
  generateAIEndingSystemMessage,
} from "../../services/open-ai";
import { interviewState, messages, setMessages } from "../../states/messages";
import { Button } from "../ui/button";
import { AnswerTextarea } from "./answer-textarea";
import { MessageWrapper } from "./message-wrapper";
import { ReportDialog } from "./report-dialog";

export const Interviewing = () => {
  const [isUserTyping, setIsUserTyping] = createSignal(false);

  const handleSummarizeClick = async () => {
    setMessages(produce((prev) => prev.push(generateAIEndingSystemMessage())));
    await aiService.chat();
  };

  onMount(() => {
    aiService.chat();
  });

  return (
    <>
      <div class="flex w-full h-1/2 max-h-[50%]">
        <div class="w-full overflow-y-auto no-scrollbar flex flex-col-reverse gap-2 snap-y pt-6">
          {interviewState() === "ai-responding" && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 1, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 2, repeat: Infinity }}
              class="flex w-full px-8 snap-end justify-end"
            >
              <div class="w-2/6 max-h-32">
                <div class="w-fit border border-slate-800 p-2 text-left">
                  <p class="text-sm">...</p>
                </div>
              </div>
            </Motion.div>
          )}
          {interviewState() === "user-responding" && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              class="flex w-full px-8 snap-end justify-start pb-2"
            >
              <div class="flex justify-end w-2/6 max-h-32">
                {isUserTyping() ? (
                  <AnswerTextarea handleCancel={() => setIsUserTyping(false)} />
                ) : (
                  <Button size="sm" onclick={() => setIsUserTyping(true)}>
                    Answer
                  </Button>
                )}
              </div>
            </Motion.div>
          )}
          {interviewState() === "finished" && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              class="flex w-full snap-end justify-center"
            >
              <Button size="sm" onclick={handleSummarizeClick}>
                Summarize
              </Button>
            </Motion.div>
          )}
          {interviewState() === "summarized" && (
            <Motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              class="flex w-full snap-end justify-center"
            >
              <Button size="sm" onclick={() => setShowReport(true)}>
                Report
              </Button>
            </Motion.div>
          )}

          <For each={messages.toReversed()}>
            {(m) => <MessageWrapper role={m.role} content={m.content} />}
          </For>
        </div>
      </div>
      <ReportDialog />
    </>
  );
};
