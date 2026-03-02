"use client";

import { useState } from "react";
import { EmailField, PasswordField } from "@entities/auth/components";
import { CommonButton } from "@shared/components";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    console.log({ email, password });
    // 👉 여기서 API 호출
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

      <CommonButton className="w-95 py-2 font-semibold">로그인</CommonButton>
    </form>
  );
}
