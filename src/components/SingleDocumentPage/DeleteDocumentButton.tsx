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
import { Button } from "../ui/button";
import { buttonStyle, iconButtonStyle } from "@/styles/customStyles";
import { Trash2Icon } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import ButtonWithLoader from "../ButtonWithLoader";
import { useState } from "react";
import { useRouter } from "next/navigation";

type ComponentParams = {
  docId: Id<"documents">;
};

function DeleteDocumentButton({ docId }: ComponentParams) {
  const [isLoading, setIsLoading] = useState(false);
  //when we click in delete, the alertDialog will close (was the "continue" button, and we wont see whats going on with the delete)we setup a a sistem to keep it open while the delete mutation happens
  // const [isOpen, setIsOpen] = useState(false); //we finally don't use it, but leave as a reference.
  //redirect user after deleting
  const router = useRouter();
  const deleteDocument = useMutation(api.documents.deleteDocument);
  return (
    // <AlertDialog open={isOpen} onOpenChange={(open) => setIsOpen(open)}>
    <AlertDialog>
      <AlertDialogTrigger>
        <Button className={buttonStyle} variant={"destructive"}>
          <Trash2Icon className={iconButtonStyle} /> Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            document and remove it from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <ButtonWithLoader
              isLoading={isLoading}
              loadingText="Deleting..."
              onClick={() => {
                setIsLoading(true);
                deleteDocument({
                  docId,
                })
                  .then(() => {
                    router.push("/");
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
export default DeleteDocumentButton;
