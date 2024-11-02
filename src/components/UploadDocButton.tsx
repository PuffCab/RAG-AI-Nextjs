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
import { useState } from "react";
import { Upload } from "lucide-react";
import { buttonStyle, iconButtonStyle } from "@/styles/customStyles";

function UploadDocButton() {
  //   const createDocument = useMutation(api.documents.createDocument); //moved to form
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        {" "}
        {/* NOTE using button inside dialogTrigger , triggers error of button nested inside button, and using "asChild" as property for DIalogTrigger, triggers another error of cannot render child inside child */}
        <span
          //   onClick={() => {
          //     createDocument({ title: "My first document" });
          //   }}
          className={buttonStyle}
        >
          <Upload className={iconButtonStyle} />
          Open Form to add DOc
        </span>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Document to the DB</DialogTitle>
          <DialogDescription>
            Upload document with new information as source of information
          </DialogDescription>
          {/* <NewDocForm onUpload={() => setIsOpen(false)} /> */}
          <NewDocForm setIsOpen={setIsOpen} />
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UploadDocButton;
