import { redirect } from "next/navigation";

export default function OptionsMenuPage() {
  // TODO create a view that puts the options from the panel in the center, or something like that
  redirect("/options-menu/documents");
}
