import { NextRequest, NextResponse } from 'next/server';
import { getTokenFromRequest, authenticateUser } from '@/lib/auth-utils';
import { getDB, generateId } from '@/lib/db';
import { formatDate } from '@/lib/db-utils';
import {
  getCheckInReward,
  isSpecialDate,
} from '@/lib/daily-task-data';

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

function hasCheckedInToday(db: any, userId: string): boolean {
  const today = formatDate(new Date());
  const stmt = db.prepare('SELECT 1 FROM check_ins WHERE user_id = ? AND date = ?');
  stmt.bind([userId, today]);
  const result = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return !!result;
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

    const db = await getDB();

    if (hasCheckedInToday(db, user.id)) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: 'ALREADY_CHECKED_IN',
            message: '今日已签到',
          },
        },
        { status: 400 }
      );
    }

    const today = new Date();
    const dateStr = formatDate(today);
    const currentStreak = calculateStreak(db, user.id);
    const newStreak = currentStreak + 1;

    let exp = getCheckInReward(newStreak);
    let bonus: string | undefined;

    const special = isSpecialDate(today);
    if (special) {
      if (special.type === 'double') {
        exp *= 2;
        bonus = '月初双倍奖励';
      } else if (special.type === 'solar-term') {
        exp += 50;
        bonus = `${special.name}特别奖励`;
      }
    }

    if (newStreak % 7 === 0) {
      bonus = bonus ? `${bonus} + 周满勤奖励` : '周满勤奖励';
    }

    const recordId = generateId();
    const now = new Date().toISOString();
    db.run(
      `
      INSERT INTO check_ins (id, user_id, date, streak_days, reward_exp, bonus, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [recordId, user.id, dateStr, newStreak, exp, bonus || null, now]
    );

    db.run(
      'UPDATE users SET streak_days = ?, max_streak_days = MAX(max_streak_days, ?), total_exp = total_exp + ? WHERE id = ?',
      [newStreak, newStreak, exp, user.id]
    );

    return NextResponse.json(
      {
        success: true,
        data: {
          record: {
            id: recordId,
            userId: user.id,
            date: dateStr,
            streakDays: newStreak,
            reward: {
              exp,
              bonus,
            },
          },
          reward: {
            exp,
            bonus,
          },
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('签到错误:', error);
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

    const checkInDates = rows.map((r) => r.date);
    const streakDays = calculateStreak(db, user.id);

    const maxStmt = db.prepare('SELECT MAX(streak_days) as max FROM check_ins WHERE user_id = ?');
    maxStmt.bind([user.id]);
    const maxRow = maxStmt.step() ? maxStmt.getAsObject() : { max: 0 };
    maxStmt.free();
    const maxStreak = maxRow.max || 0;

    const totalCheckIns = rows.length;
    const today = formatDate(new Date());
    const hasCheckedInToday = checkInDates.includes(today);

    const recentHistory = rows.slice(0, 30).map((r) => ({
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
