"use client";

import { useState } from "react";
import {
  AdminUploadStatusDropdown,
  UploadProgressBar,
  UploadStatusBadge,
} from "@entities/monitoring/components";
import { useIngestJobs } from "@entities/monitoring/hooks";
import { AdminSearch } from "@shared/components";
import { IngestStatus } from "@shared/types";

const formatSize = (mb: number) => {
  if (mb >= 1024) return `${(mb / 1024).toFixed(1)}GB`;
  return `${mb}MB`;
};

export function MonitoringContents() {
  const [searchUploadList, setSearchUploadList] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<IngestStatus | null>(null);

  const { data, isPending, isError } = useIngestJobs({
    page: 0,
    size: 10,
    searchWord: searchUploadList || undefined,
  });

  const filtered = (data?.dataList ?? []).filter((item) =>
    statusFilter ? item.ingestStatus === statusFilter : true,
  );

  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-ot-gray-700">
      <div className="bg-ot-gray-700">
        {/* 표 제목 영역 : "업로드 작업" 텍스트 + Input 입력칸 묶음 */}
        <div className="flex items-center gap-4 pl-4 pr-2 py-2">
          {/* Input 입력칸 */}
          <div className="flex-1">
            <AdminSearch
              placeholder="콘텐츠 제목을 입력해주세요."
              onSubmitSearch={(value) => setSearchUploadList(value || "")}
            />
          </div>
          {/* 드롭다운 */}
          <AdminUploadStatusDropdown
            value={statusFilter}
            onChange={setStatusFilter}
          />
        </div>

        {/* 구분선 */}
        <div className="border-b border-ot-gray-600 w-full" />
      </div>

      {/* 테이블 전체 */}
      <div className="w-full">
        <div className="max-h-100 min-h-100 overflow-y-auto scrollbar-hide">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 bg-ot-gray-700 z-10">
              <tr className=" text-ot-text text-center font-semibold bg-ot-gray-800">
                <th className="pl-8 py-3 w-[35%]">파일명</th>
                <th className="px-3 w-[15%]">크기</th>
                <th className="px-3 w-[15%]">업로더</th>
                <th className="px-3 w-[15%]">상태</th>
                <th className="pr-8 w-[20%]">진행률</th>
              </tr>
            </thead>

            {/* 리스트 목록 */}
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
              {filtered.map((item) => (
                <tr
                  key={item.ingestJobId}
                  className="hover:bg-ot-gray-700/50 transition-colors"
                >
                  <td className="pl-8 py-4 text-ot-text truncate text-center max-w-0 overflow-hidden">
                    {item.title}
                  </td>
                  <td className="px-3 py-4 text-ot-text text-center">
                    {formatSize(item.videoSize)}
                  </td>
                  <td className="px-3 py-4 text-ot-text text-center">
                    {item.uploaderName}
                  </td>
                  <td className="px-3 py-4 text-center">
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
                  <td className="pr-8 py-4 text-center">
                    <UploadProgressBar progress={item.progress} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
