import { ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

type ComponentProps = {
  isLoading: boolean;
  children: ReactNode;
  loadingText: string;
};

function ButtonWithLoader({
  isLoading,
  children,
  loadingText,
}: ComponentProps) {
  return (
    <Button
      className="flex gap-1 items-center"
      type="submit"
      disabled={isLoading}
    >
      {isLoading && <Loader className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}

export default ButtonWithLoader;
