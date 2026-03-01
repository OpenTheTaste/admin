import { cn } from "@shared/utils";

interface UploadStatusBadgeProps {
  text: string;
  status: "ORIGIN_UPLOADED" | "TRANSCODING" | "UPLOADING" | "COMPLETED";
  className?: string;
}

export function UploadStatusBadge({
  text,
  status = "ORIGIN_UPLOADED",
  className,
}: UploadStatusBadgeProps) {
  const statusStyles = {
    ORIGIN_UPLOADED: "bg-[#A885F6] text-ot-secondary-800",
    TRANSCODING: "bg-[#F59E0B] text-ot-text",
    UPLOADING: "bg-[#6EA3F8] text-ot-secondary-900",
    COMPLETED: "bg-ot-primary-200 text-ot-primary-700",
  };

  return (
    <div className="flex justify-center">
      <span
        className={cn(
          "w-25 inline-flex justify-center items-center h-7",
          "rounded-md text-[14px] font-bold whitespace-nowrap transition-all",
          statusStyles[status],
          className,
        )}
      >
        {text}
      </span>
    </div>
  );
}
