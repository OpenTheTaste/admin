"use client";

import { useEffect, useState } from "react";
import { cn } from "@shared/utils";

interface UploadProgressBarProps {
  progress: number;
  className?: string;
}

export function UploadProgressBar({
  progress = 0,
  className,
}: UploadProgressBarProps) {
  const safeProgress = Math.min(100, Math.max(0, progress));
  const [displayProgress, setDisplayProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDisplayProgress(safeProgress);
    }, 100);
    return () => clearTimeout(timer);
  }, [safeProgress]);

  return (
    <div
      className={cn("flex items-center gap-3 w-full", className)}
      role="progressbar"
      aria-label="업로드 진행률"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={safeProgress}
    >
      <div className="relative w-full h-2 bg-ot-gray-600 rounded-full overflow-hidden">
        <div
          className="h-full bg-ot-primary-gradient rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${displayProgress}%` }}
        />
      </div>
      <span className="text-ot-text text-sm shrink-0">{displayProgress}%</span>
    </div>
  );
}
