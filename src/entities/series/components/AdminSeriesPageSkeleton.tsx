function SkeletonBox({ className }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded bg-ot-gray-600 ${className ?? ""}`}
    />
  );
}

const ROW_COUNT = 7;

// 태그 개수 고정값 (행마다 다르게)
const TAG_COUNTS = [2, 1, 3, 2, 1, 2, 3];

export function AdminSeriesPageSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* 검색바 (드롭다운 없음) */}
      <div className="flex items-center gap-2 bg-ot-gray-800 px-3 border border-ot-gray-700 rounded-lg">
        <SkeletonBox className="flex-1 h-10" />
      </div>

      {/* 테이블 */}
      <div className="mt-4 rounded-lg overflow-hidden">
        <table className="w-full text-ot-text">
          <colgroup>
            <col className="w-1/9" />
            <col className="w-4/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
            <col className="w-1/9" />
          </colgroup>

          {/* thead */}
          <thead className="bg-ot-gray-800">
            <tr>
              {["w-10", "w-16", "w-14", "w-8", "w-14", "w-8"].map((w, i) => (
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
                {/* 썸네일 */}
                <td className="py-3">
                  <SkeletonBox className="aspect-4/3 max-w-22 w-full mx-auto rounded-md" />
                </td>

                {/* 시리즈 제목 */}
                <td className="py-3 text-center">
                  <div className="flex justify-center">
                    <SkeletonBox className="h-4 w-36" />
                  </div>
                </td>

                {/* 카테고리 */}
                <td className="py-3 text-center">
                  <div className="flex justify-center">
                    <SkeletonBox className="h-6 w-14 rounded-full" />
                  </div>
                </td>

                {/* 태그 */}
                <td className="py-3 text-center">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {Array.from({ length: TAG_COUNTS[i] }).map((_, j) => (
                      <SkeletonBox key={j} className="h-5 w-10 rounded-full" />
                    ))}
                  </div>
                </td>

                {/* 공개 여부 */}
                <td className="py-3 text-center">
                  <div className="flex justify-center">
                    <SkeletonBox className="h-6 w-12 rounded-full" />
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
