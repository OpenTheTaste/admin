"use client";

import { useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { useOutsideClick } from "@shared/hooks";
import { cn } from "@shared/utils";

interface AdminSearchProps {
  placeholder?: string;
  options?: string[];
  onSearch?: (value: string) => void;
  onSelect?: (value: string) => void;
}

export function AdminSearch({
  placeholder = "검색어를 입력하세요",
  options,
  onSearch,
  onSelect,
}: AdminSearchProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>(options?.[0] ?? "");
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleSelect = (option: string) => {
    setSelected(option);
    setIsOpen(false);
    onSelect?.(option);
  };

  return (
    <div className="flex gap-4">
      <div className="flex-1 flex items-center gap-2 bg-ot-gray-800 px-3 border border-ot-gray-700 rounded-lg">
        <input
          type="text"
          className="flex-1 bg-transparent py-3 text-ot-text placeholder:text-ot-placeholder outline-none text-sm"
          placeholder={placeholder}
          onChange={(e) => onSearch?.(e.target.value)}
        />
        <button className="cursor-pointer ">
          <Search
            size={18}
            className="stroke-ot-text hover:stroke-ot-gray-600 shrink-0"
          />
        </button>
      </div>

      {options && (
        <div ref={dropdownRef} className="relative w-36">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex items-center justify-between bg-ot-gray-800 px-3 py-3 border border-ot-gray-700 rounded-lg text-ot-text cursor-pointer"
          >
            <span className="text-sm">{selected}</span>
            <ChevronDown
              size={16}
              className={cn(
                "stroke-ot-placeholder transition-transform duration-200",
                isOpen && "rotate-180",
              )}
            />
          </button>

          {isOpen && (
            <ul className="absolute top-full mt-1 w-full bg-ot-gray-800 border border-ot-gray-700 rounded-lg overflow-hidden z-10 shadow-2xl">
              {options.map((option) => (
                <li key={option}>
                  <button
                    onClick={() => handleSelect(option)}
                    className={cn(
                      "w-full text-left px-3 py-2 text-sm text-ot-text hover:bg-ot-gray-700 transition-colors cursor-pointer",
                      selected === option &&
                        "bg-ot-primary-gradient text-ot-text",
                    )}
                  >
                    {option}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
