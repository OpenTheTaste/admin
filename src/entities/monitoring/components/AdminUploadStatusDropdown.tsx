"use client";

import { useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useOutsideClick } from "@shared/hooks";
import { UploadStatus } from "@shared/mocks/mockAdminUploadStatus";
import { cn } from "@shared/utils";

const STATUS_OPTIONS: { label: string; value: UploadStatus | null }[] = [
  { label: "전체", value: null },
  { label: "S3 업로드 완료", value: "ORIGIN_UPLOADED" },
  { label: "트랜스코딩", value: "TRANSCODING" },
  { label: "업로드 중", value: "UPLOADING" },
  { label: "완료", value: "COMPLETED" },
];

export interface AdminUploadStatusDropdownProps {
  value: UploadStatus | null;
  onChange: (status: UploadStatus | null) => void;
}

export function AdminUploadStatusDropdown({
  value,
  onChange,
}: AdminUploadStatusDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const selectedLabel =
    STATUS_OPTIONS.find((opt) => opt.value === value)?.label ?? "업로드 상태";

  return (
    <div ref={dropdownRef} className="relative w-40">
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex items-center justify-between border border-ot-gray-700 bg-ot-gray-800 rounded-lg px-3 py-3 text-sm text-left transition-colors cursor-pointer"
      >
        <span className="text-ot-text">{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={cn(
            "text-ot-placeholder shrink-0 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 z-20 mt-1 w-full bg-ot-gray-800 rounded-lg shadow-lg border border-ot-gray-700 overflow-hidden">
          {STATUS_OPTIONS.map((opt) => {
            const isSelected = value === opt.value;
            return (
              <button
                type="button"
                key={opt.label}
                onClick={() => {
                  onChange(opt.value);
                  setIsOpen(false);
                }}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                  isSelected
                    ? "bg-ot-primary-gradient text-ot-text"
                    : "text-ot-text hover:bg-ot-gray-600",
                )}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
