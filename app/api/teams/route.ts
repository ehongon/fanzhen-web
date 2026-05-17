import { NextRequest, NextResponse } from "next/server";
import { getDB, generateId } from "@/lib/db";

export async function GET() {
  try {
    const db = await getDB();
    const stmt = db.prepare("SELECT * FROM teams");
    const teams: any[] = [];
    while (stmt.step()) {
      teams.push(stmt.getAsObject());
    }
    stmt.free();

    const result = await Promise.all(
      teams.map(async (team) => {
        const countStmt = db.prepare("SELECT COUNT(*) as count FROM team_members WHERE team_id = ?");
        countStmt.bind([team.id]);
        const countRow = countStmt.step() ? countStmt.getAsObject() : { count: 0 };
        countStmt.free();
        return {
          ...team,
          currentMembers: countRow.count || 0,
        };
      })
    );

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("获取道场列表失败:", error);
    return NextResponse.json(
      { success: false, error: "获取道场列表失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, description, type, level, maxMembers, leaderId } = body;

    if (!name || !description || !type || !leaderId) {
      return NextResponse.json(
        { success: false, error: "缺少必要参数" },
        { status: 400 }
      );
    }

    const db = await getDB();
    const teamId = generateId();
    const now = new Date().toISOString();

    db.run(
      `
      INSERT INTO teams (id, name, description, type, level, max_members, leader_id, total_practice_minutes, streak_days, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        teamId,
        name,
        description,
        type,
        level || 1,
        maxMembers || 5,
        leaderId,
        0,
        0,
        now,
      ]
    );

    db.run(
      `
      INSERT INTO team_members (id, team_id, user_id, role, joined_at, contribution)
      VALUES (?, ?, ?, ?, ?, ?)
    `,
      [generateId(), teamId, leaderId, "leader", now, 0]
    );

    const stmt = db.prepare("SELECT * FROM teams WHERE id = ?");
    stmt.bind([teamId]);
    const team = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    console.error("创建道场失败:", error);
    return NextResponse.json(
      { success: false, error: "创建道场失败" },
      { status: 500 }
    );
  }
}
