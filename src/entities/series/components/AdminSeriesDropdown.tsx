"use client";

import { useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useOutsideClick } from "@shared/hooks";
import { cn } from "@shared/utils";

export interface AdminSeriesDropdownProps {
  seriesList: string[];
  value: string | null;
  onChange: (series: string | null) => void;
  disabled?: boolean;
}

export function AdminSeriesDropdown({
  seriesList,
  value,
  onChange,
  disabled = false,
}: AdminSeriesDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filtered = seriesList.filter((s) => s.includes(search));

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleSelect = (series: string) => {
    onChange(series === "시리즈 없음" ? null : series);
    setIsOpen(false);
    setSearch("");
    if (searchInputRef.current) searchInputRef.current.value = "";
  };

  return (
    <div>
      <p className="font-semibold text-lg mb-2">시리즈 선택</p>

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setSearch("");
          }}
          className={cn(
            "w-full flex items-center justify-between border rounded-lg py-3 px-4 text-sm text-left transition-colors",
            disabled
              ? "bg-ot-gray-200 border-ot-gray-400 text-ot-gray-600 cursor-not-allowed"
              : "border-ot-gray-600 bg-ot-text hover:bg-ot-gray-200 cursor-pointer",
          )}
        >
          <span
            className={cn(value ? "text-ot-background" : "text-ot-gray-600")}
          >
            {value ?? "시리즈 선택"}
          </span>

          <ChevronDown
            size={16}
            className={cn(
              "text-ot-gray-600 shrink-0 transition-transform duration-200",
              isOpen && "rotate-180",
            )}
          />
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-ot-text rounded-lg shadow-lg">
            <div className="flex items-center gap-2 px-3 py-2 border border-ot-gray-600 rounded-lg m-1">
              <input
                type="text"
                autoFocus
                ref={searchInputRef}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    setSearch(searchInputRef.current?.value ?? "");
                  }
                }}
                placeholder="시리즈 검색"
                className="flex-1 text-sm placeholder:text-ot-gray-600 outline-none text-ot-background"
              />
              <Search size={15} className="text-ot-gray-600 shrink-0" />
            </div>

            <div className="max-h-48 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((series) => {
                  const isSelected =
                    value === series ||
                    (series === "시리즈 없음" && value === null);

                  return (
                    <button
                      type="button"
                      key={series}
                      onClick={() => handleSelect(series)}
                      className={cn(
                        "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                        isSelected
                          ? "bg-ot-primary-gradient text-ot-text"
                          : "text-ot-background hover:bg-ot-gray-200",
                      )}
                    >
                      {series}
                    </button>
                  );
                })
              ) : (
                <p className="px-4 py-3 text-sm text-ot-gray-600">
                  검색 결과가 없습니다
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
