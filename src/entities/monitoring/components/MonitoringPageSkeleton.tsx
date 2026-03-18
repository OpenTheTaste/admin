function SkeletonBox({
  className,
  style,
}: {
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`animate-pulse rounded bg-ot-gray-600 ${className ?? ""}`}
      style={style}
    />
  );
}

const BAR_HEIGHTS = ["35%", "55%", "45%", "70%", "40%", "60%", "30%"];

const CATEGORY_COUNT = 6;
const TABLE_ROW_COUNT = 6;

function MonitoringContentsSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* 검색바 + 드롭다운 */}
      <div className="flex gap-2">
        <SkeletonBox className="h-10 flex-1 rounded-lg" />
        <SkeletonBox className="h-10 w-24 rounded-lg" />
      </div>

      {/* 갱신 안내 텍스트 */}
      <div className="flex justify-end gap-1 items-center">
        <SkeletonBox className="h-3 w-20" />
        <SkeletonBox className="h-3 w-3 rounded-full" />
      </div>

      {/* 테이블 */}
      <div className="flex flex-col rounded-xl overflow-hidden bg-ot-gray-700">
        <div className="bg-ot-gray-800 grid grid-cols-[55%_15%_15%_15%] py-3">
          {["w-12", "w-8", "w-12", "w-8"].map((w, i) => (
            <div key={i} className="flex justify-center">
              <SkeletonBox className={`h-4 ${w}`} />
            </div>
          ))}
        </div>

        <div className="divide-y divide-ot-gray-800">
          {Array.from({ length: TABLE_ROW_COUNT }).map((_, i) => (
            <div key={i} className="grid grid-cols-[55%_15%_15%_15%] py-5">
              <div className="flex justify-center">
                <SkeletonBox className="h-4 w-40" />
              </div>
              <div className="flex justify-center">
                <SkeletonBox className="h-4 w-14" />
              </div>
              <div className="flex justify-center">
                <SkeletonBox className="h-4 w-16" />
              </div>
              <div className="flex justify-center">
                <SkeletonBox className="h-6 w-14 rounded-full" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function StatisticsSkeleton() {
  return (
    <div className="w-full flex flex-col">
      {/* 대시보드 타이틀 */}
      <section className="mt-10 mb-8">
        <SkeletonBox className="h-8 w-24 mb-2" />
        <SkeletonBox className="h-4 w-72" />
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-12 gap-6 items-start">
        {/* 왼쪽: 카테고리별 태그 시청 통계 그래프 */}
        <div className="xl:col-span-8 bg-ot-gray-700 rounded-xl p-8 h-90 flex flex-col">
          <SkeletonBox className="h-5 w-64 mb-3" />

          {/* 카테고리 버튼 모음 */}
          <div className="flex gap-3 mb-6">
            {Array.from({ length: CATEGORY_COUNT }).map((_, i) => (
              <SkeletonBox key={i} className="h-7 w-12 rounded-md" />
            ))}
          </div>

          {/* 그래프 박스 */}
          <div className="flex-1 flex items-end gap-3">
            {BAR_HEIGHTS.map((height, i) => (
              <div key={i} className="flex flex-col flex-1 items-center gap-1">
                <SkeletonBox className="w-full rounded-t" style={{ height }} />
                <SkeletonBox className="h-3 w-8 mt-1" />
              </div>
            ))}
          </div>
        </div>

        {/* 오른쪽: 숏폼 -> 콘텐츠 전환율 */}
        <div className="flex flex-col xl:col-span-4 rounded-xl p-6 h-90 bg-ot-gray-700">
          <SkeletonBox className="h-5 w-52 mb-6" />

          <div className="flex-1 flex items-center justify-center">
            <div className="w-full flex flex-col items-center justify-center py-10 border border-ot-gray-600 rounded-lg bg-ot-gray-800/50 gap-3">
              <SkeletonBox className="h-12 w-32" />
              <SkeletonBox className="h-5 w-16" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export function MonitoringPageSkeleton() {
  return (
    <>
      <MonitoringContentsSkeleton />
      <StatisticsSkeleton />
    </>
  );
}