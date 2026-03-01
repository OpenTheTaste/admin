"use client";

export interface ToggleProps {
  isOn: boolean;
  onToggle: (next: boolean) => void;
}

export const AdminPublicToggle = ({ isOn, onToggle }: ToggleProps) => {
  return (
    <button
      type="button"
      onClick={() => onToggle(!isOn)}
      className={`w-10 h-6 rounded-full transition-all flex items-center px-1 cursor-pointer ${
        isOn ? "bg-ot-primary-gradient" : "bg-ot-gray-400"
      }`}
    >
      <div
        className={`w-4 h-4 rounded-full bg-ot-text transition-all  ${
          isOn ? "translate-x-4" : "translate-x-0"
        }`}
      />
    </button>
  );
};
