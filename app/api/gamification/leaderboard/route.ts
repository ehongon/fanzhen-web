import { NextRequest, NextResponse } from "next/server";
import {
  MOCK_LEADERBOARD,
  MOCK_USER_GAMIFICATION,
  type LeaderboardType,
} from "@/lib/gamification-data";

/**
 * GET /api/gamification/leaderboard
 * 获取排行榜数据
 *
 * Query 参数:
 * - type: 排行榜类型 (global | friends | weekly | monthly)
 * - limit: 返回数量（默认50）
 * - offset: 偏移量（默认0）
 * - userId: 当前用户ID（用于标记当前用户）
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = (searchParams.get("type") || "global") as LeaderboardType;
    const limit = parseInt(searchParams.get("limit") || "50");
    const offset = parseInt(searchParams.get("offset") || "0");
    const userId = searchParams.get("userId") || MOCK_USER_GAMIFICATION.userId;

    // TODO: 根据类型从数据库获取实际排行榜数据
    // const entries = await db.leaderboard.get({ type, limit, offset });

    // 使用模拟数据，根据类型做简单筛选
    let entries = [...MOCK_LEADERBOARD];

    switch (type) {
      case "weekly":
        // 模拟周榜数据（经验值少一些）
        entries = entries.map((e) => ({
          ...e,
          totalExp: Math.floor(e.totalExp * 0.1),
        }));
        break;
      case "monthly":
        // 模拟月榜数据（经验值中等）
        entries = entries.map((e) => ({
          ...e,
          totalExp: Math.floor(e.totalExp * 0.3),
        }));
        break;
      case "friends":
        // 模拟好友榜（只返回部分数据）
        entries = entries.slice(0, 5);
        break;
      default:
        // global 使用完整数据
        break;
    }

    // 重新排序
    entries.sort((a, b) => b.totalExp - a.totalExp);

    // 重新计算排名
    entries = entries.map((e, index) => ({
      ...e,
      rank: index + 1,
      isCurrentUser: e.userId === userId,
    }));

    // 分页
    const paginatedEntries = entries.slice(offset, offset + limit);

    // 获取当前用户排名
    const currentUserEntry = entries.find((e) => e.isCurrentUser);

    return NextResponse.json({
      success: true,
      data: {
        type,
        entries: paginatedEntries.map((entry) => ({
          rank: entry.rank,
          userId: entry.userId,
          name: entry.name,
          avatar: entry.avatar,
          level: entry.level,
          totalExp: entry.totalExp,
          streakDays: entry.streakDays,
          isCurrentUser: entry.isCurrentUser,
        })),
        currentUser: currentUserEntry
          ? {
              rank: currentUserEntry.rank,
              level: currentUserEntry.level,
              totalExp: currentUserEntry.totalExp,
              streakDays: currentUserEntry.streakDays,
            }
          : null,
        pagination: {
          total: entries.length,
          limit,
          offset,
          hasMore: offset + limit < entries.length,
        },
      },
    });
  } catch (error) {
    console.error("获取排行榜失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "获取排行榜失败",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gamification/leaderboard/refresh
 * 刷新排行榜（通常由定时任务触发）
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type } = body;

    // TODO: 重新计算排行榜数据
    // 1. 获取所有用户的经验值
    // 2. 按类型（周/月/总）计算排名
    // 3. 更新排行榜缓存

    return NextResponse.json({
      success: true,
      data: {
        type: type || "all",
        message: "排行榜已刷新",
        refreshedAt: new Date().toISOString(),
      },
    });
  } catch (error) {
    console.error("刷新排行榜失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "刷新排行榜失败",
        },
      },
      { status: 500 }
    );
  }
}
