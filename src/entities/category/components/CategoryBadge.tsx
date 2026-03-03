"use client";

import { X } from "lucide-react";
import { CATEGORY_CONFIG_COLOR } from "@entities/category/constants";
import type { Category } from "@shared/types";
import { cn } from "@shared/utils";

interface CategoryBadgeProps {
  category: Category;
  onRemove?: () => void;
}

export function CategoryBadge({ category, onRemove }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG_COLOR[category];
  if (!config) return null;

  return (
    <span
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold",
        config.className,
      )}
    >
      {category}

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
