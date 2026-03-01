import { AdminTitle } from "@layouts";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="모니터링"
        description="실시간 콘텐츠 업로드 및 트랜스코딩 작업 현황을 파악합니다."
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
