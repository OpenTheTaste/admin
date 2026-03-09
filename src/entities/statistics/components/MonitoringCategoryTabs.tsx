import { cn } from "@shared/utils";

interface Category {
  categoryId: number;
  categoryName: string;
}

interface MonitoringCategoryTabsProps {
  categories: Category[];
  activeCategory: number;
  onCategoryChange: (categoryId: number) => void;
}

export function MonitoringCategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: MonitoringCategoryTabsProps) {
  return (
    <div className="flex gap-3 mb-6">
      {categories.map((category) => (
        <button
          key={category.categoryId}
          onClick={() => onCategoryChange(category.categoryId)}
          className={cn(
            "px-4 py-1 rounded-md text-[14px] transition-all duration-200",
            activeCategory === category.categoryId
              ? "bg-ot-primary-400 text-ot-text"
              : "bg-ot-primary-200 text-ot-text hover:bg-ot-primary-400",
          )}
        >
          {category.categoryName}
        </button>
      ))}
    </div>
  );
}
