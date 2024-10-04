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
        <Button variant={"secondary"}>Show Doc</Button>
      </CardFooter>
    </Card>
  );
}

export default DocumentCard;
