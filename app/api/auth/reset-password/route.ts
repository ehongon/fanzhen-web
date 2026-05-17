import { NextRequest, NextResponse } from "next/server";
import { hashPassword } from "@/lib/auth-utils";
import { getDB } from "@/lib/db";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { token, password } = body;

    if (!token || !password) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "缺少必要参数",
          },
        },
        { status: 400 }
      );
    }

    const db = await getDB();

    const stmt = db.prepare(
      "SELECT * FROM users WHERE reset_token = ? AND reset_token_expiry > CURRENT_TIMESTAMP"
    );
    stmt.bind([token]);
    const user = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!user) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_TOKEN",
            message: "重置链接已过期或无效",
          },
        },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);
    db.run(
      "UPDATE users SET password = ?, reset_token = NULL, reset_token_expiry = NULL WHERE id = ?",
      [hashedPassword, user.id]
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          message: "密码重置成功",
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
