"use client";
// 콘텐츠 모달 내 시리즈 드롭다운
import { useRef, useState } from "react";
import { ChevronDown, Loader2, Search } from "lucide-react";
import { SeriesTitleItem } from "@entities/video-contents/apis";
import { useInfiniteSeriesTitle } from "@entities/video-contents/hooks";
import { useOutsideClick } from "@shared/hooks";
import { cn } from "@shared/utils";

export interface AdminSeriesDropdownProps {
  value: number | null;
  selectedTitle?: string | null;
  onChange: (seriesId: number | null, item: SeriesTitleItem | null) => void;
  disabled?: boolean;
}

export function AdminSeriesDropdown({
  value,
  selectedTitle: initialTitle,
  onChange,
  disabled = false,
}: AdminSeriesDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchWord, setSearchWord] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { seriesTitles, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteSeriesTitle({ searchWord });

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleSelect = (item: SeriesTitleItem | null) => {
    onChange(item ? item.seriesId : null, item);
    setIsOpen(false);
    setSearchWord("");
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearchWord(inputValue);
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
  };

  const displayTitle =
    initialTitle ?? seriesTitles.find((s) => s.seriesId === value)?.title;

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
            setInputValue("");
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
            {displayTitle ?? "시리즈 선택"}
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
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="시리즈 검색 (Enter)"
                className="flex-1 text-sm placeholder:text-ot-gray-600 outline-none text-ot-background"
              />
              <button
                type="button"
                onClick={() => setSearchWord(inputValue)}
                className="cursor-pointer"
              >
                <Search size={15} className="text-ot-gray-600 shrink-0" />
              </button>
            </div>

            <div className="max-h-48 overflow-y-auto" onScroll={handleScroll}>
              {seriesTitles.length > 0 ? (
                <>
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
                  {seriesTitles.map((series) => (
                    <button
                      type="button"
                      key={series.seriesId}
                      onClick={() => handleSelect(series)}
                      className={cn(
                        "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                        value === series.seriesId
                          ? "bg-ot-primary-gradient text-ot-text"
                          : "text-ot-background hover:bg-ot-gray-200",
                      )}
                    >
                      {series.title}
                    </button>
                  ))}
                  <div className="py-1 flex justify-center">
                    {isFetchingNextPage && (
                      <Loader2
                        className="animate-spin text-ot-placeholder"
                        size={20}
                      />
                    )}
                  </div>
                </>
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
