"use client";

import { X } from "lucide-react";
import { CATEGORY_DOT_COLOR } from "@entities/tag/constants";
import type { Category } from "@shared/types";

interface TagBadgeProps {
  label: string;
  category: Category;
  onRemove?: () => void;
}

export function TagBadge({ label, category, onRemove }: TagBadgeProps) {
  return (
    <span className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-ot-gray-800 text-ot-text text-xs font-semibold">
      <span
        className={`w-2 h-2 rounded-full ${CATEGORY_DOT_COLOR[category]}`}
      />

      {label}

      {onRemove && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="ml-1 hover:text-ot-gray-600 transition-colors"
        >
          <X size={10} strokeWidth={2} />
        </button>
      )}
    </span>
  );
}
