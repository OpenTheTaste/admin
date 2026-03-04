import { api } from "@shared/api";
import {
  ApiResponse,
  BasePaginationParams,
  Category,
  PageInfo,
  PublicStatus,
} from "@shared/types";

export interface ContentListItem {
  mediaId: number;
  posterUrl: string;
  title: string;
  publicStatus?: PublicStatus;
  uploadedDate: string;
}

export interface ContentListResponse {
  pageInfo: PageInfo;
  dataList: ContentListItem[];
}

export interface GetContentListParams extends BasePaginationParams {
  page: number;
  size: number;
  searchWord?: string;
  publicStatus?: PublicStatus;
}

// 콘텐츠 리스트 조회 API
export const getContentListApi = async (params: GetContentListParams) => {
  const res = await api.get<ApiResponse<ContentListResponse>>(
    "admin/contents",
    { params },
  );
  return res.data.data;
};

export interface ContentDetailResponse {
  contentId: number;
  posterUrl: string;
  thumbnailUrl: string;
  title: string;
  description: string;
  actors: string;
  seriesTitle: string | null;
  uploaderNickname: string;
  duration: number;
  videoSize: number;
  categoryName: Category;
  tagNameList: string[];
  publicStatus: PublicStatus;
  bookmarkCount: number;
  uploadedDate: string;
}

// 콘텐츠 상세 조회 API
export const getContentDetailApi = async (mediaId: number) => {
  const res = await api.get<ApiResponse<ContentDetailResponse>>(
    `admin/contents/${mediaId}`,
  );

  return res.data.data;
};
