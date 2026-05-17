import { NextResponse } from "next/server";
import { isDbInitialized } from "@/lib/db";

export async function POST() {
  try {
    const wasInitialized = isDbInitialized();

    return NextResponse.json({
      success: true,
      data: {
        wasInitialized,
        isInitialized: true,
        message: wasInitialized
          ? "数据库已初始化"
          : "数据库初始化完成",
      },
    });
  } catch (error) {
    console.error("数据库初始化失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DB_INIT_ERROR",
          message: "数据库初始化失败",
        },
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const initialized = isDbInitialized();
    return NextResponse.json({
      success: true,
      data: {
        initialized,
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "DB_CHECK_ERROR",
          message: "数据库状态检查失败",
        },
      },
      { status: 500 }
    );
  }
}
