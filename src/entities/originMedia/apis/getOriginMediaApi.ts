import { api } from "@/shared/api";
import { ApiResponse, BasePaginationParams, PageInfo } from "@/shared/types";
import { END_POINTS } from "@shared/constants";

export type OriginMediaType = "CONTENTS" | "SERIES";

export interface OriginMediaItem {
  originId: number;
  title: string;
  mediaType: OriginMediaType;
}

export interface OriginMediaResponse {
  pageInfo: PageInfo;
  dataList: OriginMediaItem[];
}

// 원본콘텐츠 조회 API
export const getOriginMediaApi = async (params: BasePaginationParams) => {
  const res = await api.get<ApiResponse<OriginMediaResponse>>(
    END_POINTS.SHORT_FORMS_ORIGIN_MEDIA,
    { params },
  );
  return res.data.data;
};
