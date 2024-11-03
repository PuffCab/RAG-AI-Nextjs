"use client";
import NewNoteForm from "./NewNoteForm";
import { useState } from "react";
import { Upload } from "lucide-react";
import { buttonStyle, iconButtonStyle } from "@/styles/customStyles";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

function UploadNoteButton() {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {/* NOTE using button inside dialogTrigger , triggers error of button nested inside button, and using "asChild" as property for DIalogTrigger, triggers another error of cannot render child inside child */}
        <Button className={buttonStyle}>
          <Upload className={iconButtonStyle} />
          Note Upload
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add a new Note to the DB</DialogTitle>
          <DialogDescription>
            Create a note and find information in it later with our search
          </DialogDescription>
          <NewNoteForm
            handleCloseOnCreateNote={() => {
              setIsOpen(false);
              toast({
                title: "Note created!",
                description:
                  "Your note has being created and submitted succesfully",
                variant: "default",
              });
            }}
          />
          {/* <NewNoteForm setIsOpen={setIsOpen} /> */}
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default UploadNoteButton;
