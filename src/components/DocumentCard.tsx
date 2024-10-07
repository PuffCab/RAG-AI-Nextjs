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
import { Eye } from "lucide-react";
import Link from "next/link";

type PropsType = {
  document: Doc<"documents">;
};

function DocumentCard({ document }: PropsType) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{document.title}</CardTitle>
        {/* <CardDescription>no description yet</CardDescription> */}
      </CardHeader>
      <CardContent>
        <p>Card Content</p>
      </CardContent>
      <CardFooter>
        <Link href={`/documents/${document._id}`}>
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
