"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { TagBadge } from "@entities/tag/components";
import { useOutsideClick } from "@shared/hooks";
import { Category, TAGS } from "@shared/types";
import { cn } from "@shared/utils";

export interface AdminTagDropdownProps {
  category: Category | null;
  value: string[];
  onChange: (tags: string[]) => void;
}

export function AdminTagDropdown({
  category,
  value,
  onChange,
}: AdminTagDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleToggle = (tag: string) => {
    onChange(
      value.includes(tag) ? value.filter((t) => t !== tag) : [...value, tag],
    );
  };

  const summaryText =
    value.length > 0
      ? `${value[0]}${value.length > 1 ? ` 외 ${value.length - 1}개` : ""}`
      : "태그 선택";

  return (
    <div>
      <p className="font-semibold text-lg mb-2">태그</p>

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          disabled={!category}
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "w-full flex items-center justify-between border rounded-lg py-3 px-4 text-sm text-left transition-colors",
            !category
              ? "bg-ot-gray-200 border-ot-gray-400 text-ot-gray-600 cursor-not-allowed"
              : "border-ot-gray-600 bg-ot-text hover:bg-ot-gray-200 cursor-pointer",
          )}
        >
          <span
            className={cn(
              value.length > 0 ? "text-ot-background" : "text-ot-gray-600",
            )}
          >
            {summaryText}
          </span>

          <ChevronDown
            size={16}
            className={cn(
              "text-ot-gray-600 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {value.length > 0 && category && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            {value.map((tag) => (
              <TagBadge
                key={tag}
                label={tag}
                category={category}
                onRemove={() => handleToggle(tag)}
              />
            ))}
          </div>
        )}

        {isOpen && category && (
          <div className="absolute top-full left-0 right-0 z-20 mt-2 bg-ot-text rounded-lg shadow-lg overflow-hidden border border-ot-gray-600">
            <div className="max-h-48 overflow-y-auto">
              {TAGS[category].map((tag) => {
                const isSelected = value.includes(tag);

                return (
                  <button
                    type="button"
                    key={tag}
                    onClick={() => handleToggle(tag)}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                      isSelected
                        ? "bg-ot-primary-gradient text-ot-text"
                        : "text-ot-background hover:bg-ot-gray-200",
                    )}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
