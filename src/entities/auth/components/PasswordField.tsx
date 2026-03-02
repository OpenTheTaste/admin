"use client";

import { Eye, EyeOff, Lock } from "lucide-react";

interface PasswordFieldProps {
  value: string;
  onChange: (v: string) => void;
  show: boolean;
  onToggle: () => void;
}

export function PasswordField({
  value,
  onChange,
  show,
  onToggle,
}: PasswordFieldProps) {
  return (
    <div className="w-95">
      <label className="flex items-center text-sm mb-2">
        <Lock className="mr-2 text-ot-gray-600" size={18} />
        비밀번호
      </label>

      <div className="relative">
        <input
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="비밀번호를 입력해주세요"
          className="w-full px-3 py-2 pr-10 border border-ot-gray-600 rounded-lg text-sm"
        />

        <button
          type="button"
          onClick={onToggle}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-ot-gray-600 hover:text-ot-text transition-colors"
        >
          {show ? (
            <EyeOff size={16} strokeWidth={1} />
          ) : (
            <Eye size={16} strokeWidth={1} />
          )}
        </button>
      </div>
    </div>
  );
}
