import { cn } from "@shared/utils";

interface UploadProgressBarProps {
  progress: number;
  className?: string;
}

export default function UploadProgressBar({
  progress = 0,
  className,
}: UploadProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  return (
    <div
      className={cn("flex items-center w-full", className)}
      role="progressbar"
      aria-label="업로드 진행률"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeProgress}
    >
      <div className="relative w-full h-2 bg-ot-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-ot-primary-gradient rounded-full"
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}
