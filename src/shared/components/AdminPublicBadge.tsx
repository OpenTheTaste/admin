import { cn } from "@shared/utils";

interface AdminPublicBadgeProps {
  isPublic: boolean;
  context?: "list" | "modal";
  className?: string;
}

export function AdminPublicBadge({
  isPublic,
  context = "list",
  className,
}: AdminPublicBadgeProps) {
  const textColor = context === "modal" ? "text-ot-background" : "text-ot-text";

  return (
    <div
      className={cn(
        "inline-flex items-center justify-center h-6 px-3 text-xs font-semibold rounded-full border",
        textColor,
        context === "modal" ? "border-ot-background" : "border-ot-text",
        className,
      )}
    >
      {isPublic ? "공개" : "비공개"}
    </div>
  );
}
