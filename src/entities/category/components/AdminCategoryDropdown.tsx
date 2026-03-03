"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { CategoryBadge } from "@entities/category/components";
import { useOutsideClick } from "@shared/hooks";
import { Category, TAGS } from "@shared/types";
import { cn } from "@shared/utils";

export interface AdminCategoryDropdownProps {
  value: Category | null;
  onChange: (category: Category | null) => void;
}

export function AdminCategoryDropdown({
  value,
  onChange,
}: AdminCategoryDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  return (
    <div>
      <p className="font-semibold text-lg mb-2">카테고리</p>

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((prev) => !prev)}
          className={cn(
            "w-full flex items-center justify-between border border-ot-gray-600 rounded-lg py-3 px-4 text-sm text-left bg-ot-text hover:bg-ot-gray-200 transition-colors cursor-pointer",
          )}
        >
          <span
            className={cn(value ? "text-ot-background" : "text-ot-gray-600")}
          >
            {value ?? "카테고리 선택"}
          </span>

          <ChevronDown
            size={16}
            className={cn(
              "text-ot-gray-600 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {value && (
          <div className="flex flex-wrap gap-1.5 mt-2">
            <CategoryBadge category={value} onRemove={() => onChange(null)} />
          </div>
        )}

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-ot-text rounded-lg shadow-lg border border-ot-gray-600 overflow-hidden">
            <div className="max-h-48 overflow-y-auto">
              {(Object.keys(TAGS) as Category[]).map((category) => {
                const isSelected = value === category;

                return (
                  <button
                    type="button"
                    key={category}
                    onClick={() => {
                      onChange(category);
                      setIsOpen(false);
                    }}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                      isSelected
                        ? "bg-ot-primary-gradient text-ot-text"
                        : "text-ot-background hover:bg-ot-gray-200",
                    )}
                  >
                    {category}
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
