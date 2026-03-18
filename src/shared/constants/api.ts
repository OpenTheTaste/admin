export const END_POINTS = {
  // 카테고리
  CATEGORIES: "/categories",

  // 시리즈 관리 페이지
  SERIES: "admin/series",
  SERIES_TITLES: "/admin/series/titles",
  SERIES_DETAIL: (mediaId: number) => `admin/series/${mediaId}`,
  SERIES_UPLOAD: "admin/series/upload",
  SERIES_FIX: (seriesId: number) => `admin/series/${seriesId}/upload`,

  // 콘텐츠 관리 페이지
  CONTENTS: "/admin/contents",
  CONTENTS_DETAIL: (mediaId: number) => `/admin/contents/${mediaId}`,
  CONTENTS_UPLOAD: "/admin/contents/upload",
  CONTENTS_UPDATE: (contentsId: number) =>
    `/admin/contents/${contentsId}/upload`,
  CONTENTS_MULTIPART_COMPLETE: (contentsId: number) =>
    `/admin/contents/${contentsId}/upload/complete`,

  // 숏폼 관리 페이지
  SHORT_FORMS: "/short-forms",
  SHORT_FORMS_DETAIL: (mediaId: number) => `/short-forms/${mediaId}`,
  SHORT_FORMS_UPLOAD: "/short-forms/upload",
  SHORT_FORMS_UPDATE: (shortformId: number) =>
    `/short-forms/${shortformId}/upload`,
  SHORT_FORMS_MULTIPART_COMPLETE: (shortformId: number) =>
    `/short-forms/${shortformId}/upload/complete`,
  SHORT_FORMS_ORIGIN_MEDIA: "/short-forms/origin-media",

  // 모니터링 페이지
  INGEST_JOBS: "/ingest-jobs",
  SHORT_FORM_CONVERSION: "/admin/short-form-conversion",
  TAGS_BY_CATEGORY: (categoryId: number) => `/admin/tags/${categoryId}`,
  TAG_STATS_BY_CATEGORY: (categoryId: number) =>
    `/admin/tags/stats/${categoryId}`,
} as const;
