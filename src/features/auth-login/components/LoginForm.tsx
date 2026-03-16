"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { loginApi } from "@entities/auth/apis";
import { EmailField, PasswordField } from "@entities/auth/components";
import { CommonButton } from "@shared/components";
import { useAuthStore } from "@shared/store";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const setAuth = useAuthStore((s) => s.setAuth);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const {
        memberId,
        role,
        email: userEmail,
        nickname,
      } = await loginApi({ email, password });
      setAuth(memberId, role, userEmail, nickname); // auth 상태 저장

      router.push("/");
    } catch (error) {
      alert("로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-y-6 items-center"
    >
      <EmailField value={email} onChange={setEmail} />

      <PasswordField
        value={password}
        onChange={setPassword}
        show={showPassword}
        onToggle={() => setShowPassword((p) => !p)}
      />

      <CommonButton type="submit" className="w-95 py-2 font-semibold">
        로그인
      </CommonButton>
    </form>
  );
}
