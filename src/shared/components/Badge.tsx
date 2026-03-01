import { X } from "lucide-react";

interface BadgeProps {
  text: string;
  onRemove?: () => void;
  variant?: "service" | "admin";
}

export const Badge = ({ text, onRemove, variant = "service" }: BadgeProps) => {
  return (
    <div
      className={`inline-flex items-center gap-1 text-xs border rounded-[1.25rem] px-3 py-[0.063rem] ${
        variant === "admin"
          ? "border-ot-background text-ot-background"
          : "border-ot-text text-ot-text"
      }`}
    >
      {text}
      {onRemove && (
        <button
          type="button"
          onClick={onRemove}
          className="cursor-pointer hover:text-ot-gray-800"
        >
          <X size={11} />
        </button>
      )}
    </div>
  );
};
