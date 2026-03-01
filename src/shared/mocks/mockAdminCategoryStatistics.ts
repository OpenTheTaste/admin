export const CATEGORIES = ["영화", "드라마", "예능", "다큐", "뉴스", "스포츠"] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export interface CategoryStatistic {
  labels: string[];
  data: number[];
}

export const mockAdminCategoryStatistics: Record<CategoryType, CategoryStatistic> = {
  영화: {
    labels: ["로맨스", "사극", "액션", "코미디", "SF", "호러", "뮤지컬"],
    data: [52, 84, 5, 32, 38, 21, 10],
  },
  드라마: {
    labels: ["로맨스", "코미디", "가족", "의학", "법정", "스릴러", "역사", "판타지"],
    data: [70, 45, 30, 60, 25, 80, 40, 55],
  },
  예능: {
    labels: ["토크쇼", "리얼리티", "여행", "서바이벌", "코미디", "연예"],
    data: [40, 90, 65, 50, 75, 30],
  },
  다큐: {
    labels: ["사회", "환경", "과학", "역사"],
    data: [20, 15, 45, 60],
  },
  뉴스: {
    labels: ["정치", "사회", "국제", "연예"],
    data: [85, 70, 40, 30],
  },
  스포츠: {
    labels: ["축구", "야구", "농구", "배구", "골프", "기타"],
    data: [95, 80, 50, 30, 25, 15],
  },
};
