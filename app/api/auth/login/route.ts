import { NextRequest, NextResponse } from "next/server";
import { findUserByEmail } from "@/lib/db-user-data";
import { verifyPassword, validateEmail, generateToken } from "@/lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password } = body;

    const errors: { field: string; message: string }[] = [];

    if (!email) {
      errors.push({ field: "email", message: "邮箱不能为空" });
    } else if (!validateEmail(email)) {
      errors.push({ field: "email", message: "邮箱格式不正确" });
    }

    if (!password) {
      errors.push({ field: "password", message: "密码不能为空" });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "VALIDATION_ERROR",
            message: "输入信息有误，请检查",
            details: errors,
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
            code: "INVALID_CREDENTIALS",
            message: "邮箱或密码错误",
          },
        },
        { status: 401 }
      );
    }

    if (user.status === "banned") {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "ACCOUNT_BANNED",
            message: "账户已被禁用",
          },
        },
        { status: 403 }
      );
    }

    const isPasswordValid = await verifyPassword(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_CREDENTIALS",
            message: "邮箱或密码错误",
          },
        },
        { status: 401 }
      );
    }

    const token = generateToken(user);

    const { password: _, ...safeUser } = user;

    return NextResponse.json(
      {
        success: true,
        data: {
          user: safeUser,
          token,
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
          message: "服务器错误，请稍后重试",
        },
      },
      { status: 500 }
    );
  }
}
