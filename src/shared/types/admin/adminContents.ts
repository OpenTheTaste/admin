import {
  BaseContentType,
  Category,
  ContentType,
  VideoFileMeta,
} from "@shared/types";

export type ContentFormat = "콘텐츠" | "숏폼";

// admin - 콘텐츠 관리 - 콘텐츠 타입
export interface AdminContentsType extends BaseContentType {
  isPublic: boolean;
  uploadDate: string;
  format: ContentFormat;
  type: ContentType;
}

export interface AdminContentsDetailType
  extends AdminContentsType, VideoFileMeta {
  description: string;
  cast: string[];
  category: Category;
  tags: string[];
  uploader: string;
  bookmarkCount: number;
}
