import { Message } from "./message";

export const Interviewing = () => {
  return (
    <div class="flex w-full h-2/5 max-h-[40%]">
      <div class="w-full overflow-y-auto no-scrollbar flex flex-col-reverse gap-2 snap-y">
        <Message fromUser={false} content="Hi, I'm a interviewer" />
      </div>
    </div>
  );
};
