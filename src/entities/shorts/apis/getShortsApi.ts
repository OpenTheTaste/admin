import { api } from "@/shared/api";
import { OriginMediaType } from "@entities/originMedia/apis";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  Category,
  PageInfo,
  PublicStatus,
} from "@shared/types";

export interface ShortsListItem {
  mediaId: number;
  posterUrl: string;
  title: string;
  publicStatus?: PublicStatus;
  uploadedDate: string;
}

export interface ShortsListResponse {
  pageInfo: PageInfo;
  dataList: ShortsListItem[];
}

export interface GetShortsListParams extends BasePaginationParams {
  page: number;
  size: number;
  searchWord?: string;
  publicStatus?: PublicStatus;
}

// 숏폼 리스트 조회 API
export const getShortsListApi = async (params: GetShortsListParams) => {
  const res = await api.get<ApiResponse<ShortsListResponse>>(
    END_POINTS.SHORT_FORMS,
    { params },
  );
  return res.data.data;
};

export interface ShortsDetailResponse {
  shortFormId: number;
  posterUrl: string;
  title: string;
  description: string;
  originContentsTitle: string;
  originId: number;
  originType: OriginMediaType;
  uploaderNickname: string;
  duration: number;
  videoSize: number;
  categoryName: Category;
  tagNameList: string[];
  publicStatus: PublicStatus;
  bookmarkCount: number;
  uploadedDate: string;
}

// 숏폼 상세 조회 API
export const getShortsDetailApi = async (mediaId: number) => {
  const res = await api.get<ApiResponse<ShortsDetailResponse>>(
    END_POINTS.SHORT_FORMS_DETAIL(mediaId),
  );
  return res.data.data;
};
