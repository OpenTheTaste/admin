"use client";

import { useState } from "react";
import {
  AdminUploadStatusDropdown,
  UploadProgressBar,
  UploadStatusBadge,
} from "@entities/monitoring/components";
import { AdminSearch } from "@shared/components";
import {
  UploadStatus,
  mockAdminUploadStatus,
} from "@shared/mocks/mockAdminUploadStatus";

const formatSize = (bytes: number) => {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)}GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)}MB`;
  return `${(bytes / 1024).toFixed(1)}KB`;
};

export function MonitoringContents() {
  const uploadstatusdata = mockAdminUploadStatus;
  const [searchUploadList, setSearchUploadList] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<UploadStatus | null>(null);

  const filtered = uploadstatusdata.filter((item) => {
    const matchStatus = statusFilter ? item.status === statusFilter : true;
    const matchSearch = searchUploadList
      ? item.fileName.toLowerCase().includes(searchUploadList.toLowerCase())
      : true;
    return matchStatus && matchSearch;
  });

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
              {filtered.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-ot-gray-700/50 transition-colors"
                >
                  <td className="pl-8 py-4 text-ot-text truncate text-center max-w-0 overflow-hidden">
                    {item.fileName}
                  </td>
                  <td className="px-3 py-4 text-ot-text text-center">
                    {formatSize(item.fileSize)}
                  </td>
                  <td className="px-3 py-4 text-ot-text text-center">
                    {item.uploader}
                  </td>
                  <td className="px-3 py-4 text-center">
                    <UploadStatusBadge
                      status={item.status}
                      text={
                        item.status === "ORIGIN_UPLOADED"
                          ? "S3 업로드 완료"
                          : item.status === "TRANSCODING"
                            ? "트랜스코딩"
                            : item.status === "UPLOADING"
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
