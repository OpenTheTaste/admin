"use client";
// 콘텐츠 모달 내 시리즈 드롭다운
import { useRef, useState } from "react";
import { ChevronDown, Search } from "lucide-react";
import { SeriesListItem } from "@entities/series/apis";
import { useInfiniteSeriesList } from "@entities/series/hooks";
import { useOutsideClick } from "@shared/hooks";
import { cn } from "@shared/utils";

export interface AdminSeriesDropdownProps {
  value: number | null;
  onChange: (seriesId: number | null, item: SeriesListItem | null) => void;
  disabled?: boolean;
}

export function AdminSeriesDropdown({
  value,
  onChange,
  disabled = false,
}: AdminSeriesDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // FIXME: 추후 시리즈 제목 조회 api로 연동 필요 (백엔드 수정 완료 시)
  const { seriesList, observerRef, isFetchingNextPage } = useInfiniteSeriesList(
    { searchWord },
  );

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleSelect = (item: SeriesListItem | null) => {
    onChange(item ? item.mediaId : null, item);
    setIsOpen(false);
    setSearchWord("");
    if (searchInputRef.current) searchInputRef.current.value = "";
  };

  const selectedTitle = seriesList.find((s) => s.mediaId === value)?.title;

  return (
    <div>
      <p className="font-semibold text-lg mb-2">시리즈 선택</p>

      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          disabled={disabled}
          onClick={() => {
            setIsOpen((prev) => !prev);
            setSearchWord("");
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
            {selectedTitle ?? "시리즈 선택"}
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
                    setSearchWord(searchInputRef.current?.value ?? "");
                  }
                }}
                placeholder="시리즈 검색"
                className="flex-1 text-sm placeholder:text-ot-gray-600 outline-none text-ot-background"
              />
              <Search size={15} className="text-ot-gray-600 shrink-0" />
            </div>

            <div className="max-h-48 overflow-y-auto">
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className={cn(
                  "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                  value === null
                    ? "bg-ot-primary-gradient text-ot-text"
                    : "text-ot-background hover:bg-ot-gray-200",
                )}
              >
                시리즈 없음
              </button>

              {seriesList.length > 0 ? (
                seriesList.map((series) => (
                  <button
                    type="button"
                    key={series.mediaId}
                    onClick={() => handleSelect(series)}
                    className={cn(
                      "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                      value === series.mediaId
                        ? "bg-ot-primary-gradient text-ot-text"
                        : "text-ot-background hover:bg-ot-gray-200",
                    )}
                  >
                    {series.title}
                  </button>
                ))
              ) : (
                <p className="px-4 py-3 text-sm text-ot-gray-600">
                  검색 결과가 없습니다
                </p>
              )}

              <div ref={observerRef} className="py-1">
                {isFetchingNextPage && (
                  <p className="text-center text-xs text-ot-gray-600 py-1">
                    불러오는 중...
                  </p>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
