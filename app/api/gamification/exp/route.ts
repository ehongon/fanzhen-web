import { NextRequest, NextResponse } from "next/server";
import { getDB, generateId } from "@/lib/db";
import {
  EXP_RULES,
  calculatePracticeExp,
  getLevelByExp,
  type ExpSource,
} from "@/lib/gamification-data";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");
    const limit = parseInt(searchParams.get("limit") || "20");
    const offset = parseInt(searchParams.get("offset") || "0");

    const db = await getDB();

    const stmt = db.prepare(
      `SELECT * FROM exp_records WHERE user_id = ? ORDER BY created_at DESC LIMIT ? OFFSET ?`
    );
    stmt.bind([userId || "", limit, offset]);
    const records: any[] = [];
    while (stmt.step()) {
      records.push(stmt.getAsObject());
    }
    stmt.free();

    const countStmt = db.prepare("SELECT COUNT(*) as total FROM exp_records WHERE user_id = ?");
    countStmt.bind([userId || ""]);
    const countRow = countStmt.step() ? countStmt.getAsObject() : { total: 0 };
    countStmt.free();
    const total = countRow.total || 0;

    return NextResponse.json({
      success: true,
      data: {
        records: records.map((record) => ({
          id: record.id,
          amount: record.amount,
          source: record.source,
          description: record.description,
          timestamp: record.created_at,
        })),
        pagination: {
          total,
          limit,
          offset,
          hasMore: offset + limit < total,
        },
      },
    });
  } catch (error) {
    console.error("获取经验记录失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "获取经验记录失败",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, amount, source, description, metadata } = body;

    if (!userId || !source) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "缺少必要参数: userId 或 source",
          },
        },
        { status: 400 }
      );
    }

    let expAmount = amount;

    if (!expAmount) {
      switch (source as ExpSource) {
        case "daily_practice":
          if (metadata?.minutes && metadata?.gongfaType) {
            const result = calculatePracticeExp(
              metadata.minutes,
              metadata.gongfaType,
              metadata.isFirstPractice || false,
              metadata.streakDays || 0
            );
            expAmount = result.totalExp;
          } else {
            expAmount = 10;
          }
          break;
        case "first_practice":
          expAmount = 0;
          break;
        case "streak_bonus":
          expAmount = metadata?.streakDays
            ? metadata.streakDays * EXP_RULES.STREAK_BONUS_PER_DAY
            : EXP_RULES.STREAK_BONUS_PER_DAY;
          break;
        case "daily_goal":
          expAmount = EXP_RULES.DAILY_GOAL_EXP;
          break;
        case "weekly_goal":
          expAmount = EXP_RULES.WEEKLY_GOAL_EXP;
          break;
        case "monthly_goal":
          expAmount = EXP_RULES.MONTHLY_GOAL_EXP;
          break;
        case "breakthrough_small":
          expAmount = EXP_RULES.BREAKTHROUGH_SMALL_EXP;
          break;
        case "breakthrough_medium":
          expAmount = EXP_RULES.BREAKTHROUGH_MEDIUM_EXP;
          break;
        case "breakthrough_large":
          expAmount = EXP_RULES.BREAKTHROUGH_LARGE_EXP;
          break;
        case "post_insight":
          expAmount = EXP_RULES.POST_INSIGHT_EXP;
          break;
        case "receive_like":
          expAmount = EXP_RULES.RECEIVE_LIKE_EXP * (metadata?.count || 1);
          break;
        case "answer_question":
          expAmount = EXP_RULES.ANSWER_QUESTION_EXP;
          break;
        case "best_answer":
          expAmount = EXP_RULES.BEST_ANSWER_EXP;
          break;
        case "read_classic":
          expAmount = EXP_RULES.READ_CLASSIC_EXP * (metadata?.count || 1);
          break;
        case "complete_gongfa":
          expAmount = EXP_RULES.COMPLETE_GONGFA_EXP;
          break;
        case "stage_assessment":
          expAmount = EXP_RULES.STAGE_ASSESSMENT_EXP;
          break;
        default:
          expAmount = 10;
      }
    }

    const db = await getDB();

    db.run(
      `
      INSERT INTO exp_records (id, user_id, amount, source, description, created_at)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [
        generateId(),
        userId,
        expAmount,
        source,
        description || "",
        new Date().toISOString(),
      ]
    );

    db.run(
      "UPDATE users SET total_exp = total_exp + ? WHERE id = ?",
      [expAmount, userId]
    );

    const userStmt = db.prepare("SELECT * FROM users WHERE id = ?");
    userStmt.bind([userId]);
    const user = userStmt.step() ? userStmt.getAsObject() : null;
    userStmt.free();

    const newLevel = getLevelByExp((user?.total_exp || 0) + expAmount);
    const levelUp = newLevel.id > (user?.current_level || 1);

    if (levelUp) {
      db.run("UPDATE users SET current_level = ? WHERE id = ?", [
        newLevel.id,
        userId,
      ]);
    }

    return NextResponse.json({
      success: true,
      data: {
        userId,
        amount: expAmount,
        source,
        description,
        newTotalExp: (user?.total_exp || 0) + expAmount,
        levelUp,
        newLevel: levelUp ? newLevel.id : undefined,
        newLevelName: levelUp ? newLevel.name : undefined,
        message: levelUp
          ? `获得 ${expAmount} 经验值，恭喜升级到 ${newLevel.name}！`
          : `获得 ${expAmount} 经验值`,
      },
    });
  } catch (error) {
    console.error("增加经验值失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "增加经验值失败",
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const body = await request.json();
    const { recordId } = body;

    if (!recordId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "缺少必要参数: recordId",
          },
        },
        { status: 400 }
      );
    }

    const db = await getDB();
    const recordStmt = db.prepare("SELECT * FROM exp_records WHERE id = ?");
    recordStmt.bind([recordId]);
    const record = recordStmt.step() ? recordStmt.getAsObject() : null;
    recordStmt.free();

    if (record) {
      db.run(
        "UPDATE users SET total_exp = total_exp - ? WHERE id = ?",
        [record.amount, record.user_id]
      );

      db.run("DELETE FROM exp_records WHERE id = ?", [recordId]);
    }

    return NextResponse.json({
      success: true,
      data: {
        recordId,
        message: "经验记录已撤销",
      },
    });
  } catch (error) {
    console.error("撤销经验值失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "撤销经验值失败",
        },
      },
      { status: 500 }
    );
  }
}
