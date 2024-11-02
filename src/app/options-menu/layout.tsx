import MenuBar from "./MenuBar";

export default function OptionsMenuLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex gap-14 container mx-auto pt-10">
      <MenuBar />
      {children}
    </div>
  );
}
