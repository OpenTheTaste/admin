import { Category } from "@shared/types";

export const CATEGORY_STYLE_MAP: Record<Category, string> = {
  영화: "bg-ot-secondary-600 text-ot-text",
  드라마: "bg-ot-primary-300 text-ot-background",
  예능: "bg-ot-secondary-400 text-ot-text",
  다큐: "bg-ot-secondary-700 text-ot-text",
  뉴스: "bg-ot-gray-800 text-ot-text",
  스포츠: "bg-ot-secondary-500 text-ot-text",
};

export const TAG_STYLE_MAP: Record<string, string> = {
  로맨스: "bg-ot-primary-200 text-ot-background",
  사극: "bg-ot-secondary-800 text-ot-text",
  액션: "bg-ot-primary-500 text-ot-text",
  코미디: "bg-ot-secondary-300 text-ot-background",
  호러: "bg-ot-gray-900 text-ot-text",
  SF: "bg-ot-secondary-600 text-ot-text",
  뮤지컬: "bg-ot-primary-100 text-ot-background",
  가족: "bg-ot-secondary-200 text-ot-background",
  의학: "bg-ot-secondary-500 text-ot-text",
  법정: "bg-ot-secondary-700 text-ot-text",
  역사: "bg-ot-secondary-800 text-ot-text",
  스릴러: "bg-ot-primary-700 text-ot-text",
  판타지: "bg-ot-primary-400 text-ot-text",
  리얼리티: "bg-ot-secondary-400 text-ot-text",
  토크쇼: "bg-ot-secondary-300 text-ot-background",
  서바이벌: "bg-ot-primary-600 text-ot-text",
  여행: "bg-ot-secondary-200 text-ot-background",
  연예: "bg-ot-primary-300 text-ot-background",
  과학: "bg-ot-secondary-600 text-ot-text",
  환경: "bg-ot-secondary-500 text-ot-text",
  사회: "bg-ot-gray-700 text-ot-text",
  정치: "bg-ot-gray-800 text-ot-text",
  국제: "bg-ot-secondary-700 text-ot-text",
  축구: "bg-ot-secondary-400 text-ot-text",
  야구: "bg-ot-secondary-500 text-ot-text",
  농구: "bg-ot-primary-500 text-ot-text",
  배구: "bg-ot-secondary-300 text-ot-background",
  골프: "bg-ot-secondary-600 text-ot-text",
  기타: "bg-ot-gray-600 text-ot-text",
};

export const badgeBase =
  "inline-flex items-center justify-center text-xs rounded-[1.25rem] px-3 py-0.5";
