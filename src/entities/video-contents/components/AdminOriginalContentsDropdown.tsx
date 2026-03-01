"use client";

import { useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useOutsideClick } from "@shared/hooks";

export interface AdminOriginalContentsDropdownProps {
  originalList: string[];
  value: string | null;
  onChange: (original: string | null) => void;
}

export default function AdminOriginalContentsDropdown({
  value,
  onChange,
  originalList,
}: AdminOriginalContentsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const filtered = originalList.filter((s) => s.includes(search));

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleSelect = (original: string) => {
    onChange(original);
    setIsOpen(false);
    setSearch("");
    if (searchInputRef.current) searchInputRef.current.value = "";
  };

  return (
    <div>
      <p className="font-semibold text-lg mb-2">원본 콘텐츠 선택</p>
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => {
            setIsOpen((prev) => !prev);
            setSearch("");
          }}
          className="w-full flex items-center justify-between border border-ot-gray-600 rounded-lg py-3 px-4 text-sm text-left bg-ot-text hover:bg-ot-gray-200 transition-colors cursor-pointer"
        >
          <span className={value ? "text-ot-background" : "text-ot-gray-600"}>
            {value ?? "원본 콘텐츠 선택"}
          </span>
          <ChevronDown
            size={16}
            className={`text-ot-gray-600 shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
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
                placeholder="원본 콘텐츠 검색"
                className="flex-1 text-sm placeholder:text-ot-gray-600 outline-none text-ot-background"
              />
              <Search size={15} className="text-ot-gray-600 shrink-0" />
            </div>
            <div className="max-h-48 overflow-y-auto">
              {filtered.length > 0 ? (
                filtered.map((original) => (
                  <button
                    type="button"
                    key={original}
                    onClick={() => handleSelect(original)}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer ${
                      value === original
                        ? "bg-ot-primary-gradient text-ot-text"
                        : "text-ot-background hover:bg-ot-gray-200"
                    }`}
                  >
                    {original}
                  </button>
                ))
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
