"use client";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import NewDocForm from "./NewDocForm";

function CreateDocButton() {
  //   const createDocument = useMutation(api.documents.createDocument); //moved to form
  return (
    <Dialog>
      <DialogTrigger>
        {" "}
        {/* NOTE using button inside dialogTrigger , triggers error of button nested inside button, and using "asChild" as property for DIalogTrigger, triggers another error of cannot render child inside child */}
        <span
        //   onClick={() => {
        //     createDocument({ title: "My first document" });
        //   }}
        >
          Open Form to add DOc
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Document to the DB</DialogTitle>
          <DialogDescription>
            Upload document with new information as source of information
          </DialogDescription>
          <NewDocForm />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default CreateDocButton;
