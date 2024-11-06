import { MouseEvent, ReactNode } from "react";
import { Button } from "./ui/button";
import { Loader } from "lucide-react";

type ComponentProps = {
  isLoading: boolean;
  children: ReactNode;
  loadingText: string;
  clickEvent?: (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => void;
};

function ButtonWithLoader({
  isLoading,
  children,
  loadingText,
  clickEvent,
}: ComponentProps) {
  return (
    <Button
      className="flex gap-1 items-center"
      type="submit"
      disabled={isLoading}
      onClick={(e) => {
        clickEvent?.(e);
      }}
    >
      {isLoading && <Loader className="animate-spin" />}
      {isLoading ? loadingText : children}
    </Button>
  );
}

export default ButtonWithLoader;
