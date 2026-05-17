import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getTokenFromRequest, authenticateUser } from "@/lib/auth-utils";
import { getDB } from "@/lib/db";

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

export async function PATCH(request: NextRequest) {
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

    const body = await request.json();
    const db = await getDB();

    const allowedFields: Record<string, string> = {
      name: "name",
      avatar: "avatar",
      currentStage: "current_stage",
      currentLevel: "current_level",
      constitution: "constitution",
    };

    const setClauses: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(body)) {
      const dbField = allowedFields[key];
      if (dbField && value !== undefined) {
        setClauses.push(`${dbField} = ?`);
        values.push(value);
      }
    }

    if (setClauses.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "没有可更新的字段",
          },
        },
        { status: 400 }
      );
    }

    values.push(user.id);
    db.run(
      `UPDATE users SET ${setClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      values
    );

    const stmt = db.prepare("SELECT * FROM users WHERE id = ?");
    stmt.bind([user.id]);
    const updatedUser = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    return NextResponse.json(
      {
        success: true,
        data: updatedUser,
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
