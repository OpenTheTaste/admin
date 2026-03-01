export type UserType = "사용자" | "에디터" | "관리자" | "중지됨";

export interface AdminUser { 
    id: number;
    name: string;
    email: string;
    type: UserType;
    signupDate: string;
}

export const mockAdminUsers: AdminUser[] = [
    {
        id: 1,
        name: "강현우",
        email: "vpffp368@naver.com",
        type: "사용자",
        signupDate: "2026-02-24",
    },
    {
        id: 2,
        name: "강승우",
        email: "vpffp368@naver.com",
        type: "관리자",
        signupDate: "2026-02-24",
    },
    {
        id: 3,
        name: "김주희",
        email: "vpffp368@naver.com",
        type: "관리자",
        signupDate: "2026-02-24",
    },
    {
        id: 4,
        name: "박유빈",
        email: "vpffp368@naver.com",
        type: "관리자",
        signupDate: "2026-02-24",
    },
    {
        id: 5,
        name: "박준희",
        email: "vpffp368@naver.com",
        type: "에디터",
        signupDate: "2026-02-24",
    },
    {
        id: 6,
        name: "이창기",
        email: "vpffp368@naver.com",
        type: "관리자",
        signupDate: "2026-02-24",
    },
    {
        id: 7,
        name: "유재휘",
        email: "vpffp368@naver.com",
        type: "에디터",
        signupDate: "2026-02-24",
    },
    {
        id: 8,
        name: "강현우",
        email: "vpffp368@naver.com",
        type: "중지됨",
        signupDate: "2026-02-24",
    },
    {
        id: 9,
        name: "강현우",
        email: "vpffp368@naver.com",
        type: "에디터",
        signupDate: "2026-02-24",
    },
    {
        id: 10,
        name: "강현우",
        email: "vpffp368@naver.com",
        type: "사용자",
        signupDate: "2026-02-24",
    },
]