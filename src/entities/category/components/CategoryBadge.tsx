"use client";

import { X } from "lucide-react";
import { CATEGORY_CONFIG_COLOR } from "@entities/category/constants";
import type { Category } from "@shared/types";

interface CategoryBadgeProps {
  category: Category;
  onRemove?: () => void;
}

export function CategoryBadge({ category, onRemove }: CategoryBadgeProps) {
  const config = CATEGORY_CONFIG_COLOR[category];
  if (!config) return null;

  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${config.className}`}
    >
      {category}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:opacity-70 transition-opacity"
        >
          <X size={12} strokeWidth={2} />
        </button>
      )}
    </span>
  );
}
