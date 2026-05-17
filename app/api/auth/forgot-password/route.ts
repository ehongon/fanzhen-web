import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db-user-data";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "邮箱不能为空",
          },
        },
        { status: 400 }
      );
    }

    const user = await findUserByEmail(email);
    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "USER_NOT_FOUND",
            message: "该邮箱未注册",
          },
        },
        { status: 404 }
      );
    }

    // TODO: 发送重置密码邮件
    // 这里仅返回成功，实际项目中需要实现邮件发送逻辑

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "重置密码邮件已发送，请查收",
        },
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
