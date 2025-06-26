import MenuBar from "./MenuBar";

export default function OptionsMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // <div className="flex gap-14 container mx-auto pt-10">
    <div className="container mx-auto pt-10 flex flex-col md:flex-row gap-14">
      <MenuBar />
      <div className="w-full">{children}</div>
    </div>
  );
}
