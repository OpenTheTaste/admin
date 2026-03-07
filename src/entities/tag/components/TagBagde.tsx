"use client";

import { X } from "lucide-react";
import { CATEGORY_DOT_COLOR } from "@entities/tag/constants";
import { cn } from "@shared/utils";

interface TagBadgeProps {
  label: string;
  category: number;
  onRemove?: () => void;
}

export function TagBadge({ label, category, onRemove }: TagBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ot-gray-800 text-ot-text text-xs font-semibold",
      )}
    >
      <span
        className={cn("w-2 h-2 rounded-full", CATEGORY_DOT_COLOR[category])}
      />

      {label}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn("ml-1 transition-colors hover:text-ot-gray-600")}
        >
          <X size={10} strokeWidth={2} />
        </button>
      )}
    </span>
  );
}
