import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, authenticateUser } from '@/lib/auth-utils';
import { getDB, generateId } from '@/lib/db';
import { formatDate } from '@/lib/db-utils';
import {
  DAILY_TASKS,
  WEEKLY_TASKS,
  MONTHLY_TASKS,
} from '@/lib/daily-task-data';

function getUserTaskProgress(db: any, userId: string): any[] {
  const stmt = db.prepare('SELECT * FROM task_progress WHERE user_id = ?');
  stmt.bind([userId]);
  const results: any[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function addTaskProgress(db: any, progress: any): void {
  const existingStmt = db.prepare('SELECT * FROM task_progress WHERE user_id = ? AND task_id = ? AND date = ?');
  existingStmt.bind([progress.userId, progress.taskId, progress.date]);
  const existing = existingStmt.step() ? existingStmt.getAsObject() : null;
  existingStmt.free();

  if (existing) {
    db.run(
      'UPDATE task_progress SET status = ?, progress = ?, completed_at = ? WHERE id = ?',
      [
        progress.status,
        progress.progress,
        progress.completedAt || null,
        existing.id,
      ]
    );
  } else {
    db.run(
      `
      INSERT INTO task_progress (id, user_id, task_id, task_type, status, progress, completed_at, date, reward_exp, reward_badge)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        generateId(),
        progress.userId,
        progress.taskId,
        progress.taskType,
        progress.status,
        progress.progress,
        progress.completedAt || null,
        progress.date,
        progress.rewardExp || 0,
        progress.rewardBadge || null,
      ]
    );
  }
}

function getTodayProgress(db: any, userId: string): any[] {
  const today = formatDate(new Date());
  const stmt = db.prepare('SELECT * FROM task_progress WHERE user_id = ? AND date = ?');
  stmt.bind([userId, today]);
  const results: any[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function getWeeklyProgress(db: any, userId: string): any[] {
  const now = new Date();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - now.getDay());
  startOfWeek.setHours(0, 0, 0, 0);

  const stmt = db.prepare('SELECT * FROM task_progress WHERE user_id = ? AND date >= ?');
  stmt.bind([userId, formatDate(startOfWeek)]);
  const results: any[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

function getMonthlyProgress(db: any, userId: string): any[] {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

  const stmt = db.prepare('SELECT * FROM task_progress WHERE user_id = ? AND date >= ?');
  stmt.bind([userId, formatDate(startOfMonth)]);
  const results: any[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

export async function GET(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '未提供认证令牌',
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
            code: 'UNAUTHORIZED',
            message: '令牌无效或已过期',
          },
        },
        { status: 401 }
      );
    }

    const db = await getDB();
    const dailyProgress = getTodayProgress(db, user.id);
    const weeklyProgress = getWeeklyProgress(db, user.id);
    const monthlyProgress = getMonthlyProgress(db, user.id);

    const allProgress = [...dailyProgress, ...weeklyProgress, ...monthlyProgress];

    const uniqueProgress = allProgress.reduce((acc: Record<string, any>, curr: any) => {
      const key = `${curr.task_id}-${curr.date}`;
      if (!acc[key] || new Date(curr.completed_at || 0) > new Date(acc[key].completed_at || 0)) {
        acc[key] = {
          id: curr.id,
          userId: curr.user_id,
          taskId: curr.task_id,
          taskType: curr.task_type,
          status: curr.status,
          progress: curr.progress,
          completedAt: curr.completed_at,
          date: curr.date,
          rewardExp: curr.reward_exp,
          rewardBadge: curr.reward_badge,
        };
      }
      return acc;
    }, {});

    return NextResponse.json(
      {
        success: true,
        data: Object.values(uniqueProgress),
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('获取任务进度错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: '服务器错误',
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '未提供认证令牌',
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
            code: 'UNAUTHORIZED',
            message: '令牌无效或已过期',
          },
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { taskId, progress = 100 } = body;

    if (!taskId) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: '缺少任务ID',
          },
        },
        { status: 400 }
      );
    }

    const allTasks = [...DAILY_TASKS, ...WEEKLY_TASKS, ...MONTHLY_TASKS];
    const task = allTasks.find((t) => t.id === taskId);

    if (!task) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'TASK_NOT_FOUND',
            message: '任务不存在',
          },
        },
        { status: 404 }
      );
    }

    const db = await getDB();
    const today = formatDate(new Date());
    const existingProgress = getUserTaskProgress(db, user.id).find(
      (p: any) => p.task_id === taskId && p.date === today
    );

    if (existingProgress?.status === 'completed') {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ALREADY_COMPLETED',
            message: '任务已完成',
          },
        },
        { status: 400 }
      );
    }

    const taskProgress = {
      userId: user.id,
      taskId,
      taskType: task.type,
      status: progress >= 100 ? 'completed' : 'pending',
      progress: Math.min(progress, 100),
      completedAt: progress >= 100 ? new Date().toISOString() : undefined,
      date: today,
      rewardExp: task.reward.exp,
      rewardBadge: task.reward.badge,
    };

    addTaskProgress(db, taskProgress);

    return NextResponse.json(
      {
        success: true,
        data: {
          progress: taskProgress,
          reward: {
            exp: task.reward.exp,
            badge: task.reward.badge,
            item: task.reward.item,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('更新任务进度错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: '服务器错误',
        },
      },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = getTokenFromRequest(request);
    if (!token) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'UNAUTHORIZED',
            message: '未提供认证令牌',
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
            code: 'UNAUTHORIZED',
            message: '令牌无效或已过期',
          },
        },
        { status: 401 }
      );
    }

    const body = await request.json();
    const { taskId, progress } = body;

    if (!taskId || progress === undefined) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'INVALID_REQUEST',
            message: '缺少必要参数',
          },
        },
        { status: 400 }
      );
    }

    const db = await getDB();
    const today = formatDate(new Date());

    const allTasks = [...DAILY_TASKS, ...WEEKLY_TASKS, ...MONTHLY_TASKS];
    const task = allTasks.find((t) => t.id === taskId);

    const taskProgress = {
      userId: user.id,
      taskId,
      taskType: task?.type || 'daily',
      status: progress >= 100 ? 'completed' : 'pending',
      progress: Math.min(progress, 100),
      completedAt: progress >= 100 ? new Date().toISOString() : undefined,
      date: today,
      rewardExp: task?.reward.exp || 0,
      rewardBadge: task?.reward.badge,
    };

    addTaskProgress(db, taskProgress);

    return NextResponse.json(
      {
        success: true,
        data: taskProgress,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('更新任务进度错误:', error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: 'SERVER_ERROR',
          message: '服务器错误',
        },
      },
      { status: 500 }
    );
  }
}
