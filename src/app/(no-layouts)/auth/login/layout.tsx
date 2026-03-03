export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen text-ot-text bg-ot-background">
      <main className="flex-1">{children}</main>
    </div>
  );
}
