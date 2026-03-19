import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, Category, PublicStatus } from "@shared/types";

export interface SeriesDetail {
  seriesId: number;
  title: string;
  description: string;
  categoryName: Category;
  tagNameList: string[];
  publicStatus: PublicStatus;
  uploaderNickname: string;
  bookmarkCount: number;
  actors: string;
  posterUrl: string;
  thumbnailUrl: string;
}

export const getSeriesDetailApi = async (mediaId: number) => {
  const res = await api.get<ApiResponse<SeriesDetail>>(
    END_POINTS.SERIES_DETAIL(mediaId),
  );
  return res.data.data;
};
