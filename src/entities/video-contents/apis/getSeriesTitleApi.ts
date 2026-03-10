import { api } from "@/shared/api";
import { ApiResponse, BasePaginationParams, PageInfo } from "@shared/types";

export interface SeriesTitleItem {
  seriesId: number;
  title: string;
  categoryName: string;
  tagNameList: string[];
}

export interface SeriesTitleResponse {
  pageInfo: PageInfo;
  dataList: SeriesTitleItem[];
}

export interface GetSeriesTitleParams extends BasePaginationParams {
  page: number;
  size: number;
  searchWord?: string;
}

export const getSeriesTitleApi = async (params: GetSeriesTitleParams) => {
  const res = await api.get<ApiResponse<SeriesTitleResponse>>(
    "/admin/series/titles",
    {
      params,
    },
  );
  return res.data.data;
};
