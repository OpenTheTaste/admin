import { LoginForm } from "@features/auth-login/components";

export default function LoginPage() {
  return (
    <>
      <header className="w-full text-ot-text px-11 py-4">
        <h1 className="text-4xl font-bold">O+T</h1>
      </header>

      <main className="h-[70vh] flex items-center justify-center px-6">
        <div className="flex flex-col items-center">
          <div className="flex flex-col items-center gap-4 mb-6">
            <h1 className="text-4xl font-bold">관리자 / 에디터 로그인</h1>
            <h2 className="text-ot-gray-600 font-semibold">
              계정이 없다면, 관리자에게 문의해주세요
            </h2>
          </div>

          <LoginForm />
        </div>
      </main>
    </>
  );
}
