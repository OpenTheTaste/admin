import { api } from "@shared/api";
import {
  ApiResponse,
  BasePaginationParams,
  PageInfo,
  PublicStatus,
} from "@shared/types";

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
  publicStatus?: PublicStatus;
}

export const getMemberListApi = async (params: GetMemberListParams) => { 
    const res = await api.get<ApiResponse<MemberListResponse>>(
        "/admin/members",
        { params },
    );
    return res.data.data;
}