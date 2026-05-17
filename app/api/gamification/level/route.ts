import { NextRequest, NextResponse } from "next/server";
import {
  LEVELS,
  getLevelByExp,
  getLevelProgress,
  getNextLevelExp,
  MOCK_USER_GAMIFICATION,
  type UserGamification,
} from "@/lib/gamification-data";

/**
 * GET /api/gamification/level
 * 获取等级信息
 *
 * Query 参数:
 * - userId: 用户ID（可选，默认返回模拟数据）
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId") || MOCK_USER_GAMIFICATION.userId;

    // TODO: 从数据库获取用户实际数据
    const userData: UserGamification = {
      ...MOCK_USER_GAMIFICATION,
      userId,
    };

    const currentLevel = getLevelByExp(userData.totalExp);
    const nextLevelExp = getNextLevelExp(userData.currentLevel);
    const progress = getLevelProgress(userData.currentLevel, userData.currentExp);

    return NextResponse.json({
      success: true,
      data: {
        user: userData,
        currentLevel: {
          id: currentLevel.id,
          name: currentLevel.name,
          stage: currentLevel.stage,
          stageCode: currentLevel.stageCode,
          description: currentLevel.description,
          benefits: currentLevel.benefits,
          icon: currentLevel.icon,
          color: currentLevel.color,
          gradient: currentLevel.gradient,
        },
        nextLevelExp,
        progress,
        allLevels: LEVELS.map((level) => ({
          id: level.id,
          name: level.name,
          stage: level.stage,
          stageCode: level.stageCode,
          requiredExp: level.requiredExp,
          description: level.description,
          benefits: level.benefits,
          icon: level.icon,
          color: level.color,
          gradient: level.gradient,
        })),
      },
    });
  } catch (error) {
    console.error("获取等级信息失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "获取等级信息失败",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/gamification/level
 * 更新等级（通常由经验值增加触发）
 *
 * Body 参数:
 * - userId: 用户ID
 * - newLevel: 新等级
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, newLevel } = body;

    if (!userId || !newLevel) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "缺少必要参数: userId 或 newLevel",
          },
        },
        { status: 400 }
      );
    }

    const levelData = LEVELS.find((l) => l.id === newLevel);
    if (!levelData) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "LEVEL_NOT_FOUND",
            message: "等级不存在",
          },
        },
        { status: 404 }
      );
    }

    // TODO: 更新数据库中的用户等级
    // const updatedUser = await db.userGamification.update({...})

    return NextResponse.json({
      success: true,
      data: {
        userId,
        newLevel,
        levelName: levelData.name,
        benefits: levelData.benefits,
        message: `恭喜升级到 ${levelData.name}！`,
      },
    });
  } catch (error) {
    console.error("更新等级失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "更新等级失败",
        },
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/gamification/level
 * 检查并更新用户等级（根据经验值自动计算）
 *
 * Body 参数:
 * - userId: 用户ID
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "缺少必要参数: userId",
          },
        },
        { status: 400 }
      );
    }

    // TODO: 从数据库获取用户实际数据
    const userData = { ...MOCK_USER_GAMIFICATION, userId };

    // 根据经验值计算当前等级
    const calculatedLevel = getLevelByExp(userData.totalExp);

    let levelUp = false;
    let previousLevel = userData.currentLevel;

    if (calculatedLevel.id > userData.currentLevel) {
      levelUp = true;
      // TODO: 更新数据库中的用户等级
      // await db.userGamification.update({...})
    }

    return NextResponse.json({
      success: true,
      data: {
        userId,
        currentLevel: calculatedLevel.id,
        levelName: calculatedLevel.name,
        levelUp,
        previousLevel: levelUp ? previousLevel : undefined,
        newBenefits: levelUp ? calculatedLevel.benefits : undefined,
      },
    });
  } catch (error) {
    console.error("检查等级失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "INTERNAL_ERROR",
          message: "检查等级失败",
        },
      },
      { status: 500 }
    );
  }
}
