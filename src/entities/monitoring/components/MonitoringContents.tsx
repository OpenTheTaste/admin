"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/shared/utils";
import { Loader2, RotateCw } from "lucide-react";
import { IngestStatus } from "@entities/monitoring/apis";
import {
  UploadProgressBar,
  UploadStatusBadge,
} from "@entities/monitoring/components";
import { useIngestJobs } from "@entities/monitoring/hooks";
import { AdminSearch } from "@shared/components";

const formatSize = (mb: number) => {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)}GB`;
  return `${mb}MB`;
};

const STATUS_LABEL_TO_VALUE: Record<string, IngestStatus | null> = {
  전체: null,
  "S3 업로드 완료": "ORIGIN_UPLOADED",
  트랜스코딩: "TRANSCODING",
  "재업로드 중": "UPLOADING",
  완료: "COMPLETED",
};

// 상태 더 추가될 수 있다고 해주셨음
const STATUS_PROGRESS: Record<IngestStatus, number> = {
  ORIGIN_UPLOADED: 25,
  TRANSCODING: 50,
  UPLOADING: 75,
  COMPLETED: 100,
};

const STATUS_OPTIONS = Object.keys(STATUS_LABEL_TO_VALUE);

export function MonitoringContents() {
  const [searchUploadList, setSearchUploadList] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<IngestStatus | null>(null);

  const {
    ingestJobList,
    observerRef,
    isPending,
    isError,
    isFetchingNextPage,
    dataUpdatedAt,
  } = useIngestJobs({
    size: 10,
    searchWord: searchUploadList || undefined,
  });

  const [isSpinning, setIsSpinning] = useState(false);

  useEffect(() => {
    if (dataUpdatedAt) {
      setTimeout(() => setIsSpinning(true), 0);
      const timer = setTimeout(() => setIsSpinning(false), 500);
      return () => clearTimeout(timer);
    }
  }, [dataUpdatedAt]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const prevUpdatedAtRef = useRef(dataUpdatedAt);

  useEffect(() => {
    if (prevUpdatedAtRef.current !== dataUpdatedAt) {
      scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
      prevUpdatedAtRef.current = dataUpdatedAt;
    }
  }, [dataUpdatedAt]);

  const filtered = ingestJobList.filter((item) =>
    statusFilter ? item.ingestStatus === statusFilter : true,
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Input 입력칸 + 상태 필터 드롭다운 버튼 묶음 */}
      <div className="flex-1">
        <AdminSearch
          placeholder="콘텐츠 제목을 입력해주세요."
          options={STATUS_OPTIONS}
          onSubmitSearch={(value) => setSearchUploadList(value || "")}
          onSelect={(option) => setStatusFilter(STATUS_LABEL_TO_VALUE[option])}
        />
      </div>

      <div className="flex items-center gap-1 justify-end">
        <p className="text-ot-placeholder text-xs">20초마다 갱신</p>
        <RotateCw
          size={14}
          className={cn(
            "text-ot-placeholder",
            isSpinning && "animate-spin-once",
          )}
        />
      </div>

      <div className="flex flex-col rounded-xl overflow-hidden bg-ot-gray-700">
        <div className="w-full">
          {/* thead 고정 - 스크롤 밖 */}
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 bg-ot-gray-700 z-5">
              <tr className="text-ot-text text-center font-semibold bg-ot-gray-800">
                <th className="pl-8 py-3 w-[35%]">파일명</th>
                <th className="px-3 w-[15%]">크기</th>
                <th className="px-3 w-[15%]">업로더</th>
                <th className="px-3 w-[15%]">상태</th>
                <th className="pr-8 w-[20%]">진행률</th>
              </tr>
            </thead>
          </table>

          {/* tbody - 스크롤 안 */}
          <div
            ref={scrollRef}
            className={cn(
              "max-h-100 min-h-100 overflow-y-auto",
              "[&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent",
              "[&::-webkit-scrollbar-thumb]:bg-ot-gray-500 [&::-webkit-scrollbar-thumb]:rounded-full",
            )}
          >
            <table className="w-full text-left border-collapse table-fixed">
              <tbody className="divide-y divide-ot-gray-800">
                {isPending && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-10 text-ot-placeholder"
                    >
                      불러오는 중...
                    </td>
                  </tr>
                )}
                {isError && (
                  <tr>
                    <td colSpan={5} className="text-center py-10 text-red-500">
                      데이터를 불러오지 못했습니다.
                    </td>
                  </tr>
                )}
                {!isPending && !isError && filtered.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="text-center py-10 text-ot-placeholder"
                    >
                      검색 결과가 없습니다.
                    </td>
                  </tr>
                )}
                {filtered.map((item) => (
                  <tr
                    key={item.ingestJobId}
                    className="hover:bg-ot-gray-700/50 transition-colors"
                  >
                    <td className="pl-8 py-4 text-ot-text truncate text-center max-w-0 overflow-hidden w-[35%]">
                      {item.title}
                    </td>
                    <td className="px-3 py-4 text-ot-text text-center w-[15%]">
                      {formatSize(item.videoSize)}
                    </td>
                    <td className="px-3 py-4 text-ot-text text-center w-[15%]">
                      {item.uploaderName}
                    </td>
                    <td className="px-3 py-4 text-center w-[15%]">
                      <UploadStatusBadge
                        status={item.ingestStatus}
                        text={
                          item.ingestStatus === "ORIGIN_UPLOADED"
                            ? "S3 업로드 완료"
                            : item.ingestStatus === "TRANSCODING"
                              ? "트랜스코딩"
                              : item.ingestStatus === "UPLOADING"
                                ? "재업로드 중"
                                : "완료"
                        }
                      />
                    </td>
                    <td className="pr-8 py-4 text-center w-[20%]">
                      <UploadProgressBar
                        progress={STATUS_PROGRESS[item.ingestStatus]}
                      />
                    </td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={5}>
                    <div className="py-1 flex justify-center">
                      {isFetchingNextPage && (
                        <Loader2
                          className="animate-spin text-ot-placeholder"
                          size={20}
                        />
                      )}
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div ref={observerRef} className="h-1" />
          </div>
        </div>
      </div>
    </div>
  );
}
