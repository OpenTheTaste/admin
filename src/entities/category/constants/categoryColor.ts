import { Category } from "@shared/types";

export const CATEGORY_CONFIG_COLOR: Record<Category, { className: string }> = {
  영화: { className: "bg-ot-red text-ot-text" },
  드라마: { className: "bg-ot-pink text-ot-text" },
  예능: { className: "bg-ot-orange text-ot-text" },
  뉴스: { className: "bg-ot-green text-ot-text" },
  다큐: { className: "bg-ot-mint text-ot-text" },
  스포츠: { className: "bg-ot-blue text-ot-text" },
};
