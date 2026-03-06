import { AdminTitle } from "@layouts";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="전체 유저 관리"
        description="일반 사용자 및 에디터를 관리합니다. (역할 변경은 에디터 <-> 중지됨만 가능합니다)"
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
