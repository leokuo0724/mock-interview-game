import { Component } from "solid-js";
import {
  InterviewReport,
  currentInterviewRound,
  interviewConfig,
  interviewReports,
} from "~/states/interview-config";
import { isReportDialogOpen } from "~/states/ui-states";
import { Badge } from "../ui/badge";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Timeline } from "../ui/timeline";

export const ReportDialog: Component = (props) => {
  // return null;
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
          <Card>
            <div class="flex">
              <CardHeader>
                <CardTitle>Interviewee: {interviewConfig.name}</CardTitle>
                <CardDescription class="pb-2">
                  You have been completed {currentInterviewRound() + 1}/
                  {interviewConfig.rounds.length} rounds of the interview.
                </CardDescription>
                <div class="flex gap-2">
                  <Badge variant="secondary" class="rounded-md">
                    {interviewConfig.level}
                  </Badge>
                  <Badge variant="secondary" class="rounded-md">
                    {interviewConfig.position}
                  </Badge>
                </div>
              </CardHeader>
              <div class="flex py-4 w-[1px]">
                <div class="w-full h-full bg-slate-200"></div>
              </div>
              <div class="basis-32 flex items-center justify-center">
                <div class="h-fit text-5xl text-muted-foreground">D-</div>
              </div>
            </div>
          </Card>
        </div>

        <div class="px-6">
          <Timeline
            items={interviewReports.map((report, index) => ({
              title: `Round ${index + 1}: ${report.interviewerPosition}`,
              children: <ReportDetails report={report} />,
            }))}
            activeItem={currentInterviewRound()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

const ReportDetails = ({ report }: { report: InterviewReport }) => {
  return (
    <div class="mt-2 flex flex-col gap-2">
      <h3 class="text-foreground font-medium">
        Rating: {report.rating}, {report.isPassed ? "Passed" : "No Passed"}
      </h3>
      <p>{report.summary}</p>
      <p>
        <strong>Suggestion:</strong> {report.suggestion}
      </p>
    </div>
  );
};
