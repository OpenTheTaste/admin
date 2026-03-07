"use client";

import { X } from "lucide-react";
import { CATEGORY_CONFIG_COLOR } from "@entities/category/constants";
import { cn } from "@shared/utils";

interface CategoryBadgeProps {
  category: number;
  label: string;
  onRemove?: () => void;
}

export function CategoryBadge({
  category,
  label,
  onRemove,
}: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG_COLOR[category];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        config.className,
      )}
    >
      {label}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className={cn("ml-1 transition-opacity hover:opacity-70")}
        >
          <X size={12} strokeWidth={2} />
        </button>
      )}
    </span>
  );
}
