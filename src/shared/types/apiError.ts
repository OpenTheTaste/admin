/** 공통 에러 응답 */
export interface ApiError {
  success: false;
  code: string;
  message: string;
  status: number;
  timestamp: string;
  errors: {
    field: string;
    value: string;
    reason: string;
  }[];
  detail: string;
}
