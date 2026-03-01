// 콘텐츠 종류
export const CONTENT_TYPES = ["단편", "시리즈"] as const;

export type ContentType = (typeof CONTENT_TYPES)[number];

// 기본 contents 타입
export interface BaseContentType {
  id: number;
  thumbnailVertical: string | null;
  thumbnailHorizontal: string | null;
  title: string;
  seriesTitle: string | null;
}
