"use client";

import { useRef, useState } from "react";
import { ChevronDown, Loader2, Search } from "lucide-react";
import { OriginMediaItem } from "@entities/originMedia/apis";
import { useInfiniteOriginMedia } from "@entities/originMedia/hooks";
import { useOutsideClick } from "@shared/hooks";
import { cn } from "@shared/utils";

export interface AdminOriginalContentsDropdownProps {
  value: OriginMediaItem | null;
  onChange: (original: OriginMediaItem) => void;
}

export function AdminOriginalContentsDropdown({
  value,
  onChange,
}: AdminOriginalContentsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [inputValue, setInputValue] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { originMediaList, hasNextPage, isFetchingNextPage, fetchNextPage } =
    useInfiniteOriginMedia({
      size: 10,
      searchWord: search || undefined,
    });

  useOutsideClick(dropdownRef, () => setIsOpen(false), isOpen);

  const handleSelect = (item: OriginMediaItem) => {
    onChange(item);
    setIsOpen(false);
    setSearch("");
    setInputValue("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      setSearch(inputValue);
    }
  };

  // 스크롤 핸들러: 스크롤이 바닥에 가까워지면 다음 페이지를 불러옴
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 10) {
      if (hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    }
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
            setInputValue("");
          }}
          className="w-full flex items-center justify-between border border-ot-gray-600 rounded-lg py-3 px-4 text-sm text-left bg-ot-text hover:bg-ot-gray-200 transition-colors cursor-pointer"
        >
          <span
            className={cn(value ? "text-ot-background" : "text-ot-gray-600")}
          >
            {value?.title ?? "원본 콘텐츠 선택"}
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
            {/* 검색창 */}
            <div className="flex items-center gap-2 px-3 py-2 border border-ot-gray-600 rounded-lg m-1">
              <input
                type="text"
                autoFocus
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="원본 콘텐츠 검색 (Enter)"
                className="flex-1 text-sm placeholder:text-ot-gray-600 outline-none text-ot-background"
              />
              <button
                type="button"
                onClick={() => setSearch(inputValue)}
                className="cursor-pointer"
              >
                <Search size={15} className="text-ot-gray-600 shrink-0" />
              </button>
            </div>

            {/* 목록 + 무한스크롤 */}
            <div className="max-h-48 overflow-y-auto" onScroll={handleScroll}>
              {originMediaList.length > 0 ? (
                <>
                  {originMediaList.map((item) => (
                    <button
                      type="button"
                      key={item.originId}
                      onClick={() => handleSelect(item)}
                      className={cn(
                        "w-full text-left px-4 py-3 text-sm transition-colors cursor-pointer",
                        value?.originId === item.originId
                          ? "bg-ot-primary-gradient text-ot-text"
                          : "text-ot-background hover:bg-ot-gray-200",
                      )}
                    >
                      {item.title}
                    </button>
                  ))}
                  {/* 무한스크롤 트리거 */}
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
