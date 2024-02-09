import { Component } from "solid-js";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";

export const APIKeyDialog: Component = (props) => {
  return (
    <Dialog>
      {/* @ts-ignore */}
      <DialogTrigger as={Button} variant="outline" size="sm" {...props}>
        start
      </DialogTrigger>
      <DialogContent>
        <DialogHeader class="text-left gap-2">
          <DialogTitle>Setup OpenAI API Key</DialogTitle>
          <DialogDescription class="flex flex-col gap-2">
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
