function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-ot-gray-600 ${className ?? ""}`}
    />
  );
}

const ROW_COUNT = 7;

export function AdminShortsPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* 검색바 + 드롭다운 */}
      <div className="flex gap-4">
        <div className="flex-1 flex items-center gap-2 bg-ot-gray-800 px-3 border border-ot-gray-700 rounded-lg">
          <SkeletonBox className="flex-1 h-10" />
        </div>
        <SkeletonBox className="h-11 w-36 rounded-lg" />
      </div>

      {/* 테이블 */}
      <div className="mt-4 rounded-lg overflow-hidden">
        <table className="w-full text-ot-text">
          <colgroup>
            <col className="w-1/9" />
            <col className="w-5/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
          </colgroup>

          {/* thead */}
          <thead className="bg-ot-gray-800">
            <tr>
              {["w-10", "w-8", "w-14", "w-14", "w-8"].map((w, i) => (
                <th key={i} className="py-3">
                  <div className="flex justify-center">
                    <SkeletonBox className={`h-4 ${w}`} />
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          {/* tbody */}
          <tbody className="bg-ot-gray-700 divide-y divide-ot-gray-800">
            {Array.from({ length: ROW_COUNT }).map((_, i) => (
              <tr key={i}>
                {/* 썸네일 - 세로형 (aspect-5/7) */}
                <td className="py-3">
                  <SkeletonBox className="aspect-5/7 max-w-12 w-full mx-auto rounded-md" />
                </td>

                {/* 제목 */}
                <td className="py-3 text-center">
                  <div className="flex justify-center">
                    <SkeletonBox className="h-4 w-40" />
                  </div>
                </td>

                {/* 공개 여부 */}
                <td className="py-3 text-center">
                  <div className="flex justify-center">
                    <SkeletonBox className="h-6 w-12 rounded-full" />
                  </div>
                </td>

                {/* 업로드일 */}
                <td className="py-3 text-center">
                  <div className="flex justify-center">
                    <SkeletonBox className="h-4 w-20" />
                  </div>
                </td>

                {/* 수정 아이콘 */}
                <td className="py-3 text-center">
                  <div className="flex justify-center">
                    <SkeletonBox className="h-5 w-5 rounded" />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
