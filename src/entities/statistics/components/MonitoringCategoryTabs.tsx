import {
  CATEGORIES,
  CategoryType,
} from "@shared/mocks/mockAdminCategoryStatistics";
import { cn } from "@shared/utils";

interface MonitoringCategoryTabsProps {
  activeCategory: CategoryType;
  onCategoryChange: (category: CategoryType) => void;
}

export default function MonitoringCategoryTabs({
  activeCategory,
  onCategoryChange,
}: MonitoringCategoryTabsProps) {
  return (
    <div className="flex gap-3 mb-6">
      {CATEGORIES.map((category) => (
        <button
          key={category}
          onClick={() => onCategoryChange(category)}
          className={cn(
            "px-4 py-1 rounded-md text-[14px] transition-all duration-200",
            activeCategory === category
              ? "bg-ot-primary-400 text-ot-text"
              : "bg-ot-primary-200 text-ot-text hover:bg-ot-primary-400",
          )}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
