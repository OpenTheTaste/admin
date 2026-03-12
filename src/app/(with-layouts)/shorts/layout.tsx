import { AdminTitle } from "@layouts";
import { AdminShortsUploadButton } from "@features/shorts-manage";

export default function ShortsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AdminTitle
        title="숏폼 관리"
        description="숏폼을 관리합니다."
        action={<AdminShortsUploadButton />}
      />

      <div className="px-12 pb-12">{children}</div>
    </>
  );
}
