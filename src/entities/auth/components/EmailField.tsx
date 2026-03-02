"use client";

import { Mail } from "lucide-react";

interface EmailFieldProps {
  value: string;
  onChange: (v: string) => void;
}

export function EmailField({ value, onChange }: EmailFieldProps) {
  return (
    <div>
      <label htmlFor="email" className="flex items-center text-sm mb-2">
        <Mail className="mr-2 text-ot-gray-600" size={18} />
        이메일
      </label>
      <input
        type="email"
        id="email"
        name="email"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="이메일을 입력해주세요"
        className="w-95 px-3 py-2 border border-ot-gray-600 rounded-lg text-sm"
      />
    </div>
  );
}
