import {
  UploadStatusBadge,
  UploadProgressBar,
} from "@entities/monitoring/components";
import { mockAdminUploadStatus } from "@shared/mocks/mockAdminUploadStatus";
import { AdminSearch } from "@shared/components";

const formatSize = (bytes: number) => {
  if (bytes >= 1024 ** 3) return `${(bytes / 1024 ** 3).toFixed(1)}GB`;
  if (bytes >= 1024 ** 2) return `${(bytes / 1024 ** 2).toFixed(1)}MB`;
  return `${(bytes / 1024).toFixed(1)}KB`;
};

export default function MonitoringContents() {
  const uploadstatusdata = mockAdminUploadStatus;

  return (
    <div className="flex flex-col rounded-xl overflow-hidden bg-ot-gray-700">
      <div className="bg-ot-gray-700">
        {/* 표 제목 영역 : "업로드 작업" 텍스트 + Input 입력칸 묶음 */}
        <div className="flex items-center gap-4 pl-4 pr-2 py-2">
          {/* "업로드 작업" 텍스트 */}
          <span className="text-ot-text font-semibold text-[16px] whitespace-nowrap">
            업로드 작업
          </span>
          {/* Input 입력칸 */}
          <div className="flex-1">
            <AdminSearch placeholder="콘텐츠 제목을 입력해주세요." />
          </div>
        </div>

        {/* 구분선 */}
        <div className="h-0.5 bg-ot-gray-600 w-full" />
      </div>

      {/* 테이블 전체 */}
      <div className="w-full">
        <div className="max-h-100 overflow-y-auto scrollbar-hide">
          <table className="w-full text-left border-collapse table-fixed">
            <thead className="sticky top-0 bg-ot-gray-700 z-10">
              <tr className="border-b border-ot-gray-600">
                <th className="pl-8 py-4 font-semibold text-ot-text w-[35%] text-center">
                  파일명
                </th>
                <th className="px-3 py-4 font-semibold text-ot-text w-[15%] text-center">
                  크기
                </th>
                <th className="px-3 py-4 font-semibold text-ot-text w-[15%] text-center">
                  업로더
                </th>
                <th className="px-3 py-4 font-semibold text-ot-text w-[15%] text-center">
                  상태
                </th>
                <th className="pr-8 py-4 font-semibold text-ot-text w-[20%] text-center">
                  진행률
                </th>
              </tr>
            </thead>

            {/* 리스트 목록 */}
            <tbody className="divide-y divide-ot-gray-800">
              {uploadstatusdata.map((item) => (
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
                          ? "s3 업로드 완료"
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
