"use client";

import { LogOut } from "lucide-react";

export const AdminHeader = () => {
  const handleLogout = () => {
    console.log("로그아웃 성공");
  };

  return (
    <header className="px-6 py-4 flex items-center justify-between bg-ot-gray-900">
      <p className="text-2xl font-semibold">관리자 페이지</p>
      {/* 추후 로그아웃 연결 */}
      <button className="cursor-pointer" onClick={handleLogout}>
        <LogOut className="stroke-ot-text" size={22} />
      </button>
    </header>
  );
};
