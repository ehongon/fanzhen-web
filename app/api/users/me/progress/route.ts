import { NextRequest, NextResponse } from "next/server";
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

    const db = await getDB();

    const totalPracticeDaysStmt = db.prepare(
      "SELECT COUNT(DISTINCT date) as count FROM practice_records WHERE user_id = ?"
    );
    totalPracticeDaysStmt.bind([user.id]);
    const totalPracticeDaysRow = totalPracticeDaysStmt.step() ? totalPracticeDaysStmt.getAsObject() : { count: 0 };
    totalPracticeDaysStmt.free();
    const totalPracticeDays = totalPracticeDaysRow.count || 0;

    const totalPracticeMinutesStmt = db.prepare(
      "SELECT COALESCE(SUM(duration), 0) as total FROM practice_records WHERE user_id = ?"
    );
    totalPracticeMinutesStmt.bind([user.id]);
    const totalPracticeMinutesRow = totalPracticeMinutesStmt.step() ? totalPracticeMinutesStmt.getAsObject() : { total: 0 };
    totalPracticeMinutesStmt.free();
    const totalPracticeMinutes = totalPracticeMinutesRow.total || 0;

    const totalSessionsStmt = db.prepare(
      "SELECT COUNT(*) as count FROM practice_records WHERE user_id = ?"
    );
    totalSessionsStmt.bind([user.id]);
    const totalSessionsRow = totalSessionsStmt.step() ? totalSessionsStmt.getAsObject() : { count: 0 };
    totalSessionsStmt.free();
    const totalSessions = totalSessionsRow.count || 0;

    const recentRecordsStmt = db.prepare(
      `SELECT * FROM practice_records
       WHERE user_id = ?
       ORDER BY date DESC, created_at DESC
       LIMIT 10`
    );
    recentRecordsStmt.bind([user.id]);
    const recentRecords: any[] = [];
    while (recentRecordsStmt.step()) {
      recentRecords.push(recentRecordsStmt.getAsObject());
    }
    recentRecordsStmt.free();

    const expRecordsStmt = db.prepare(
      `SELECT * FROM exp_records
       WHERE user_id = ?
       ORDER BY created_at DESC
       LIMIT 20`
    );
    expRecordsStmt.bind([user.id]);
    const expRecords: any[] = [];
    while (expRecordsStmt.step()) {
      expRecords.push(expRecordsStmt.getAsObject());
    }
    expRecordsStmt.free();

    return NextResponse.json({
      success: true,
      data: {
        userId: user.id,
        currentLevel: user.currentLevel,
        totalExp: user.totalExp,
        streakDays: user.streakDays,
        maxStreakDays: user.maxStreakDays,
        totalPracticeDays,
        totalPracticeMinutes,
        totalSessions,
        recentRecords,
        expRecords,
      },
    });
  } catch (error) {
    console.error("获取用户进度失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取用户进度失败",
        },
      },
      { status: 500 }
    );
  }
}
