"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { logoutApi } from "@entities/auth/apis";

export const AdminHeader = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logoutApi();
      router.push("/auth/login");
    } catch (error) {
      alert("로그아웃에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <header className="px-6 py-4 flex items-center justify-between bg-ot-gray-900">
      <p className="text-2xl font-semibold">관리자 페이지</p>
      <button className="cursor-pointer" onClick={handleLogout}>
        <LogOut className="stroke-ot-text hover:stroke-ot-gray-600" size={22} />
      </button>
    </header>
  );
};
