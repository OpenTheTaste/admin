"use client";

import { useEffect, useRef, useState } from "react";
import { Loader2, RotateCw } from "lucide-react";
import {
  INGEST_STATUS,
  INGEST_STATUS_LABEL,
  IngestStatus,
} from "@entities/monitoring/apis";
import { UploadStatusBadge } from "@entities/monitoring/components";
import { useIngestJobs } from "@entities/monitoring/hooks";
import { AdminSearch } from "@shared/components";
import { formatSize } from "@shared/lib";
import { cn } from "@shared/utils";

const STATUS_OPTIONS = ["전체", "대기", "작업 중", "부분 성공", "성공", "실패"];

const STATUS_LABEL_TO_VALUE: Record<string, IngestStatus | null> = {
  전체: null,
  대기: INGEST_STATUS.PENDING,
  "작업 중": INGEST_STATUS.PROCESSING,
  "부분 성공": INGEST_STATUS.PARTIAL_SUCCESS,
  성공: INGEST_STATUS.SUCCESS,
  실패: INGEST_STATUS.FAIL,
};

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
        {/* thead 고정 - 스크롤 밖 */}
        <table className="w-full table-fixed text-ot-text border-collapse">
          <colgroup>
            <col className="w-[55%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
            <col className="w-[15%]" />
          </colgroup>
          <thead className="bg-ot-gray-800 text-md font-bold">
            <tr>
              <th className="py-3">파일명</th>
              <th>크기</th>
              <th>업로더</th>
              <th>상태</th>
            </tr>
          </thead>
        </table>

        {/* tbody - 스크롤 안 */}
        <div
          ref={scrollRef}
          className="max-h-100 min-h-100 overflow-y-auto scrollbar-hide"
        >
          <table className="w-full table-fixed text-ot-text border-collapse">
            <colgroup>
              <col className="w-[55%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
              <col className="w-[15%]" />
            </colgroup>
            <tbody className="divide-y divide-ot-gray-800">
              {isPending && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-ot-placeholder"
                  >
                    불러오는 중...
                  </td>
                </tr>
              )}
              {isError && (
                <tr>
                  <td colSpan={4} className="text-center py-10 text-red-500">
                    데이터를 불러오지 못했습니다.
                  </td>
                </tr>
              )}
              {!isPending && !isError && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="text-center py-10 text-ot-placeholder"
                  >
                    검색 결과가 없습니다.
                  </td>
                </tr>
              )}
              {filtered.map((item) => (
                <tr
                  key={item.ingestJobId}
                  className="hover:bg-ot-gray-700/30 transition-colors"
                >
                  <td className="py-5 text-center truncate max-w-0 overflow-hidden">
                    {item.title}
                  </td>
                  <td className="py-5 text-center">
                    {formatSize(item.videoSize)}
                  </td>
                  <td className="py-5 text-center">{item.uploaderName}</td>
                  <td className="py-5 text-center">
                    <UploadStatusBadge
                      status={item.ingestStatus}
                      text={INGEST_STATUS_LABEL[item.ingestStatus]}
                    />
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan={4}>
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
  );
}
