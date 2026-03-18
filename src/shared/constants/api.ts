export const END_POINTS = {
  // 카테고리
  CATEGORIES: "/categories",

  // 시리즈
  SERIES: "admin/series",
  SERIES_DETAIL: (mediaId: number) => `admin/series/${mediaId}`,
  SERIES_UPLOAD: "admin/series/upload",
  SERIES_FIX: (seriesId: number) => `admin/series/${seriesId}/upload`,

  // 모니터링 페이지
  INGEST_JOBS: "/ingest-jobs",
  SHORT_FORM_CONVERSION: "/admin/short-form-conversion",
  TAGS_BY_CATEGORY: (categoryId: number) => `/admin/tags/${categoryId}`,
  TAG_STATS_BY_CATEGORY: (categoryId: number) =>
    `/admin/tags/stats/${categoryId}`,
} as const;
