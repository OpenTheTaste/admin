export const END_POINTS = {
  // 모니터링 페이지
  INGEST_JOBS: "/ingest-jobs",
  SHORT_FORM_CONVERSION: "/admin/short-form-conversion",
  TAGS_BY_CATEGORY: (categoryId: number) => `/admin/tags/${categoryId}`,
  TAG_STATS_BY_CATEGORY: (categoryId: number) =>
    `/admin/tags/stats/${categoryId}`,
} as const;
