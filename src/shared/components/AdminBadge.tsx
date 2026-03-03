import { UserType } from "@shared/mocks/mockAdminUsers";
import { cn } from "@shared/utils";

// 뱃지 또 추가할 것 있으면 추가하기
export interface AdminBadgeProps {
  variant: UserType;
  className?: string;
}

const variantStyle: Record<UserType, string> = {
  관리자: "bg-ot-primary-400 text-ot-text",
  사용자: "bg-ot-primary-500 text-ot-text",
  에디터: "bg-ot-primary-200 text-ot-background",
  중지됨: "bg-ot-gray-900 text-ot-text",
};

export function AdminBadge({ variant, className }: AdminBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center text-xs rounded-full px-3 py-1 font-semibold",
        variantStyle[variant],
        className,
      )}
    >
      {variant}
    </div>
  );
}
