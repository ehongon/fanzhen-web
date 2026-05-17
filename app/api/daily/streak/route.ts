import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, authenticateUser } from '@/lib/auth-utils';
import { getDB } from '@/lib/db';
import { formatDate } from '@/lib/db-utils';

function calculateStreak(db: any, userId: string): number {
  const stmt = db.prepare('SELECT date FROM check_ins WHERE user_id = ? ORDER BY date DESC');
  stmt.bind([userId]);
  const rows: { date: string }[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as { date: string });
  }
  stmt.free();

  if (rows.length === 0) return 0;

  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));

  if (rows[0].date !== today && rows[0].date !== yesterday) {
    return 0;
  }

  let streak = 1;
  for (let i = 1; i < rows.length; i++) {
    const prevDate = new Date(rows[i - 1].date);
    const currDate = new Date(rows[i].date);
    const diffDays = (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

function calculateMaxStreak(db: any, userId: string): number {
  const stmt = db.prepare('SELECT date FROM check_ins WHERE user_id = ? ORDER BY date ASC');
  stmt.bind([userId]);
  const rows: { date: string }[] = [];
  while (stmt.step()) {
    rows.push(stmt.getAsObject() as { date: string });
  }
  stmt.free();

  if (rows.length === 0) return 0;

  let maxStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < rows.length; i++) {
    const prevDate = new Date(rows[i - 1].date);
    const currDate = new Date(rows[i].date);
    const diffDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      currentStreak++;
      maxStreak = Math.max(maxStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return maxStreak;
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
    const stmt = db.prepare('SELECT * FROM check_ins WHERE user_id = ? ORDER BY date DESC');
    stmt.bind([user.id]);
    const rows: any[] = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();

    const checkInDates = rows.map((r) => r.date).sort();
    const streakDays = calculateStreak(db, user.id);
    const maxStreak = calculateMaxStreak(db, user.id);
    const totalCheckIns = rows.length;

    const today = formatDate(new Date());
    const hasCheckedInToday = checkInDates.includes(today);

    const recentHistory = rows
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 30)
      .map((r) => ({
        date: r.date,
        streakDays: r.streak_days,
        reward: {
          exp: r.reward_exp,
          bonus: r.bonus,
        },
      }));

    return NextResponse.json(
      {
        success: true,
        data: {
          streakDays,
          maxStreak,
          totalCheckIns,
          hasCheckedInToday,
          checkInDates,
          recentHistory,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('获取签到记录错误:', error);
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
