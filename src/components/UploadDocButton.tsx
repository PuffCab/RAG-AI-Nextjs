"use client";
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
import { Button } from "./ui/button";

function UploadDocButton() {
  //   const createDocument = useMutation(api.documents.createDocument); //moved to form
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* NOTE using button inside dialogTrigger , triggers error of button nested inside button, and using "asChild" as property for DIalogTrigger, triggers another error of cannot render child inside child */}
        <Button className={buttonStyle}>
          <Upload className={iconButtonStyle} />
          Document Upload
        </Button>
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
