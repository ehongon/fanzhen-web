import { NextRequest, NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/lib/db-user-data";
import { hashPassword, validateEmail, validatePassword, generateToken } from "@/lib/auth-utils";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, name } = body;

    const errors: { field: string; message: string }[] = [];

    if (!name || name.trim().length < 2) {
      errors.push({ field: "name", message: "昵称至少需要2个字符" });
    }

    if (!email) {
      errors.push({ field: "email", message: "邮箱不能为空" });
    } else if (!validateEmail(email)) {
      errors.push({ field: "email", message: "邮箱格式不正确" });
    }

    if (!password) {
      errors.push({ field: "password", message: "密码不能为空" });
    } else {
      const passwordValidation = validatePassword(password);
      if (!passwordValidation.valid) {
        errors.push({ field: "password", message: passwordValidation.message });
      }
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

    const existingUser = await findUserByEmail(email);
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "EMAIL_EXISTS",
            message: "该邮箱已被注册",
            details: [{ field: "email", message: "该邮箱已被注册" }],
          },
        },
        { status: 409 }
      );
    }

    const hashedPassword = await hashPassword(password);
    const user = await createUser({
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      name: name.trim(),
      role: "user",
      status: "active",
      currentStage: "lianxing",
    });

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
      { status: 201 }
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
