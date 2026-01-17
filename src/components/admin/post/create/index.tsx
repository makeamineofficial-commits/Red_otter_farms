"use client";

import * as React from "react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CreateCollectionForm from "./form";
import { Button } from "@/components/ui/button";

export default function CreateCollection() {
  const [open, setOpen] = React.useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>Create Collection</Button>
      </DialogTrigger>

      <DialogContent className="w-[95%] sm:min-w-150">
        <DialogHeader>
          <DialogTitle>Create New Collection</DialogTitle>
        </DialogHeader>
        <CreateCollectionForm />
      </DialogContent>
    </Dialog>
  );
}
