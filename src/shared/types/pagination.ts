// 페이지네이션 관련 타입 정의
export interface PageInfo {
  currentPage: number;
  totalPage: number;
  pageSize: number;
}

// 공통으로 사용하는 pagination params
export interface BasePaginationParams {
  page: number;
  size: number;
  searchWord?: string;
}
