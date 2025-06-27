import {
  Card,
  CardContent,
  // CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Doc } from "../../convex/_generated/dataModel";
import { Button } from "./ui/button";
import { Eye, Loader, Loader2 } from "lucide-react";
import Link from "next/link";

type PropsType = {
  document: Doc<"documents">;
};

function DocumentCard({ document }: PropsType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle title={document.title}>{document.title}</CardTitle>
        {/* <CardDescription>no description yet</CardDescription> */}
      </CardHeader>
      <CardContent>
        {!document.description ? (
          <div className="flex justify-center">
            <Loader className="animate-spin" />
          </div>
        ) : (
          document.description
        )}
      </CardContent>
      <CardFooter>
        <Link href={`/options-menu/documents/${document._id}`}>
          <Button variant={"secondary"} className="flex items-center gap-1">
            <Eye className="w-4 h-4" />
            Show Doc
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}

export default DocumentCard;
