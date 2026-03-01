import { UserType } from "@/shared/mocks/mockAdminUsers";
import { cn } from "@shared/utils";

type AdminBadgeVariant = "공개" | "비공개" | UserType;

// 뱃지 또 추가할 것 있으면 추가하기
export interface AdminBadgeProps {
  variant: AdminBadgeVariant;
  className?: string;
}

const variantStyle: Record<AdminBadgeVariant, string> = {
  공개: "bg-[#CCFBF1] text-[#298880]",
  비공개: "bg-ot-primary-100 text-[#882929]",
  관리자: "bg-ot-primary-400 text-ot-text",
  사용자: "bg-ot-primary-500 text-ot-text",
  에디터: "bg-ot-primary-200 text-ot-background",
  중지됨: "bg-ot-gray-900 text-ot-text",
};

export default function AdminBadge({ variant, className }: AdminBadgeProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center justify-center text-xs rounded-[1.25rem] px-3 py-0.5",
        variantStyle[variant],
        className,
      )}
    >
      {variant}
    </div>
  );
}
