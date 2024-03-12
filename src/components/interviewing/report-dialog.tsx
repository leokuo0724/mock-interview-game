import { Component } from "solid-js";
import { isReportDialogOpen } from "~/states/ui-states";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Timeline } from "../ui/timeline";

export const ReportDialog: Component = (props) => {
  return null;
  // if (interviewState() !== "summarized") return null;
  return (
    <Dialog open={isReportDialogOpen()}>
      <DialogContent class="px-0">
        <DialogHeader class="px-6 ">
          <DialogTitle>Interview Result</DialogTitle>
          <DialogDescription>
            The overall result of the entire interview process.
          </DialogDescription>
        </DialogHeader>
        <div class="px-6">
          <Timeline
            items={[
              {
                title: "Round 1:",
                // description: "This is the first event of the timeline.",
                children: <Test />,
              },
            ]}
            activeItem={1}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const Test = () => {
  return <></>;
};
