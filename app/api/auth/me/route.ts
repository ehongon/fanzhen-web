import { NextRequest, NextResponse } from "next/server";
import { getTokenFromRequest, authenticateUser } from "@/lib/auth-utils";

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "未提供认证令牌",
          },
        },
        { status: 401 }
      );
    }

    const user = await authenticateUser(token);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "UNAUTHORIZED",
            message: "令牌无效或已过期",
          },
        },
        { status: 401 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: user,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "服务器错误",
        },
      },
      { status: 500 }
    );
  }
}
