import { useState } from "react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useRouter } from "next/navigation";
import { useMutation } from "convex/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";

import { Trash2, Trash2Icon } from "lucide-react";
import ButtonWithLoader from "@/components/ButtonWithLoader";

type ComponentParams = {
  noteId: Id<"notes">;
};

function DeleteNoteButton({ noteId }: ComponentParams) {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const deleteNote = useMutation(api.notes.deleteNote);
  return (
    // <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
    <AlertDialog>
      <AlertDialogTrigger>
        <Button
          variant={"destructive"}
          className="absolute -top-0 -right-0 p-2"

          // asChild
        >
          <Trash2 />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your note
            and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <ButtonWithLoader
              isLoading={isLoading}
              loadingText="Deleting..."
              clickEvent={() => {
                setIsLoading(true);
                deleteNote({
                  noteId,
                })
                  .then(() => {
                    router.push("/options-menu/notes");
                  })
                  .finally(() => {
                    setIsLoading(false);
                  });
              }}
            >
              Delete
            </ButtonWithLoader>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
export default DeleteNoteButton;
