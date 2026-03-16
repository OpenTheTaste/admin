import { AdminTitle } from "@layouts";
import { AdminSeriesUploadButton } from "@features/series-manage/components";
import { RoleGuard } from "@shared/components";
import { ROLES } from "@shared/constants";

export default function SeriesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole={[ROLES.ADMIN]}>
      <AdminTitle
        title="시리즈 관리"
        description="콘텐츠 시리즈를 관리합니다."
        action={<AdminSeriesUploadButton />}
      />
      <div className="px-12 pb-12">{children}</div>
    </RoleGuard>
  );
}
