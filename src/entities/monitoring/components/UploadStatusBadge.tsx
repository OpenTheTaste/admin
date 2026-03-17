import { INGEST_STATUS, IngestStatus } from "@entities/monitoring/apis";
import { cn } from "@shared/utils";

interface UploadStatusBadgeProps {
  text: string;
  status: IngestStatus;
  className?: string;
}

export function UploadStatusBadge({
  text,
  status = INGEST_STATUS.PENDING,
  className,
}: UploadStatusBadgeProps) {
  const statusStyles: Record<IngestStatus, string> = {
    PENDING: "bg-ot-green",
    PROCESSING: "bg-ot-blue",
    PARTIAL_SUCCESS: "bg-ot-orange",
    SUCCESS: "bg-ot-pink",
    FAIL: "bg-red-600",
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
