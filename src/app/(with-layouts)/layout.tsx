import { AdminSideBar } from "@layouts";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen text-ot-text bg-ot-background">
      <AdminSideBar />
      <div className="flex-1 flex flex-col">
        <main className="flex-1 overflow-auto">{children}</main>
      </div>
    </div>
  );
}
