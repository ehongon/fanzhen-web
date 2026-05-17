import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    data: {
      message: "欢迎访问凡真API",
      version: "v1",
      endpoints: {
        auth: {
          register: "POST /api/auth/register",
          login: "POST /api/auth/login",
          logout: "POST /api/auth/logout",
          me: "GET /api/auth/me",
        },
        contents: {
          list: "GET /api/contents",
          detail: "GET /api/contents/[slug]",
          create: "POST /api/contents",
          update: "PUT /api/contents/[id]",
          delete: "DELETE /api/contents/[id]",
        },
        users: {
          me: "GET /api/users/me",
          update: "PATCH /api/users/me",
          progress: {
            list: "GET /api/users/me/progress",
            create: "POST /api/users/me/progress",
          },
          favorites: {
            list: "GET /api/users/me/favorites",
            add: "POST /api/users/me/favorites",
            remove: "DELETE /api/users/me/favorites/[contentId]",
          },
        },
      },
    },
  });
}
