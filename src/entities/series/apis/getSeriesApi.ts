import { api } from "@/shared/api";
import { END_POINTS } from "@shared/constants";
import {
  ApiResponse,
  BasePaginationParams,
  Category,
  PageInfo,
  PublicStatus,
} from "@shared/types";

export interface SeriesListItem {
  mediaId: number;
  thumbnailUrl: string;
  posterUrl: string;
  title: string;
  categoryName: Category;
  tagNameList: string[];
  publicStatus: PublicStatus;
}

export interface SeriesListResponse {
  pageInfo: PageInfo;
  dataList: SeriesListItem[];
}

export interface GetSeriesListParams extends BasePaginationParams {
  page: number;
  size: number;
  searchWord?: string;
}

export const getSeriesListApi = async (params: GetSeriesListParams) => {
  const res = await api.get<ApiResponse<SeriesListResponse>>(
    END_POINTS.SERIES,
    { params },
  );
  return res.data.data;
};
