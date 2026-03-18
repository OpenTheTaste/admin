import { api } from "@shared/api";
import { END_POINTS } from "@shared/constants";
import { ApiResponse, BasePaginationParams, PageInfo } from "@shared/types";

export interface MemberListItem {
  memberId: number;
  nickname: string;
  email: string;
  role: string;
  createdDate: string;
}

export interface MemberListResponse {
  pageInfo: PageInfo;
  dataList: MemberListItem[];
}

export interface GetMemberListParams extends BasePaginationParams {
  page: number;
  size: number;
  searchWord?: string;
  role?: string;
}

export const getMemberListApi = async (params: GetMemberListParams) => {
  const res = await api.get<ApiResponse<MemberListResponse>>(
    END_POINTS.MEMBERS,
    { params },
  );
  return res.data.data;
};
