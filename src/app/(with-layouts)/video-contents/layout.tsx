import { AdminTitle } from "@layouts";
import { AdminVideoContentsUploadButton } from "@features/video-contents-manage/components";
import { RoleGuard } from "@shared/components";
import { ROLES } from "@shared/constants";

export default function VideoContentsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole={[ROLES.ADMIN]}>
      <AdminTitle
        title="콘텐츠 관리"
        description="콘텐츠(단편, 시리즈 에피소드 포함)를 관리합니다."
        action={<AdminVideoContentsUploadButton />}
      />
      <div className="px-12 pb-12">{children}</div>
    </RoleGuard>
  );
}
