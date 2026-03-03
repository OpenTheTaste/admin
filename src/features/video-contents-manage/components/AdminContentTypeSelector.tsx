"use client";

import { CONTENT_TYPES, ContentType } from "@shared/types";
import { cn } from "@shared/utils";

export interface AdminContentTypeSelectorProps {
  value: ContentType;
  onChange: (value: ContentType) => void;
}

export function AdminContentTypeSelector({
  value,
  onChange,
}: AdminContentTypeSelectorProps) {
  return (
    <div>
      <p className="font-semibold text-lg mb-2">콘텐츠 타입</p>

      <div className="grid grid-cols-2 gap-6">
        {CONTENT_TYPES.map((type) => {
          const selected = value === type;

          return (
            <button
              key={type}
              type="button"
              onClick={() => onChange(type)}
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-lg border text-sm font-medium transition-colors cursor-pointer",
                selected
                  ? "border-ot-primary-400 bg-ot-primary-50 text-ot-background"
                  : "border-ot-gray-600 bg-ot-text text-ot-gray-600 hover:bg-ot-gray-200",
              )}
            >
              <span
                className={cn(
                  "w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0",
                  selected ? "border-ot-primary-400" : "border-ot-gray-600",
                )}
              >
                {selected && (
                  <span className="w-2 h-2 rounded-full bg-ot-primary-400" />
                )}
              </span>

              {type}
            </button>
          );
        })}
      </div>
    </div>
  );
}
