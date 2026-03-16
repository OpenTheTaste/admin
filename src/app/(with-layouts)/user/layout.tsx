import { AdminTitle } from "@layouts";
import { RoleGuard } from "@shared/components";
import { ROLES } from "@shared/constants";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <RoleGuard allowedRole={[ROLES.ADMIN]}>
      <AdminTitle
        title="전체 유저 관리"
        description="일반 사용자 및 에디터를 관리합니다. (역할 변경은 에디터 ↔ 중지됨만 가능합니다)"
      />
      <div className="px-12 pb-12">{children}</div>
    </RoleGuard>
  );
}
