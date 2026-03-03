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
    ORIGIN_UPLOADED: "bg-ot-green",
    TRANSCODING: "bg-ot-orange",
    UPLOADING: "bg-ot-blue",
    COMPLETED: "bg-ot-pink",
  };

  return (
    <div className="flex justify-center">
      <span
        className={cn(
          "inline-flex justify-center items-center px-4 py-1 text-ot-text",
          "rounded-full text-xs font-bold whitespace-nowrap transition-all",
          statusStyles[status],
          className,
        )}
      >
        {text}
      </span>
    </div>
  );
}
