import { AdminTitle } from "@layouts";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="사용자 관리"
        description="일반 사용자 및 에디터를 관리합니다."
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
