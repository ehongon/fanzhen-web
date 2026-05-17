import { NextRequest, NextResponse } from "next/server";
import { getDB, generateId } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const teamId = searchParams.get("teamId");
    const status = searchParams.get("status");

    const db = await getDB();

    let whereClause = "WHERE 1=1";
    const params: any[] = [];

    if (teamId) {
      whereClause += " AND tp.team_id = ?";
      params.push(teamId);
    }

    if (status) {
      whereClause += " AND tp.status = ?";
      params.push(status);
    }

    const stmt = db.prepare(
      `SELECT tp.*, t.name as team_name
       FROM team_practices tp
       LEFT JOIN teams t ON tp.team_id = t.id
       ${whereClause}
       ORDER BY scheduled_time DESC`
    );
    stmt.bind(params);
    const practices: any[] = [];
    while (stmt.step()) {
      practices.push(stmt.getAsObject());
    }
    stmt.free();

    return NextResponse.json({ success: true, data: practices });
  } catch (error) {
    console.error("获取组队修炼列表失败:", error);
    return NextResponse.json(
      { success: false, error: "获取组队修炼列表失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { teamId, gongfaId, gongfaName, scheduledTime, duration, createdBy } = body;

    if (!teamId || !gongfaId || !gongfaName || !scheduledTime || !duration || !createdBy) {
      return NextResponse.json(
        { success: false, error: "缺少必要参数" },
        { status: 400 }
      );
    }

    const db = await getDB();
    const id = generateId();
    const now = new Date().toISOString();

    db.run(
      `
      INSERT INTO team_practices (id, team_id, gongfa_id, gongfa_name, scheduled_time, duration, status, created_by, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        teamId,
        gongfaId,
        gongfaName,
        new Date(scheduledTime).toISOString(),
        duration,
        "scheduled",
        createdBy,
        now,
      ]
    );

    db.run(
      `
      INSERT INTO team_practice_participants (id, practice_id, user_id, joined_at)
      VALUES (?, ?, ?, ?)
    `,
      [generateId(), id, createdBy, now]
    );

    const stmt = db.prepare("SELECT * FROM team_practices WHERE id = ?");
    stmt.bind([id]);
    const practice = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    return NextResponse.json({ success: true, data: practice });
  } catch (error) {
    console.error("创建组队修炼失败:", error);
    return NextResponse.json(
      { success: false, error: "创建组队修炼失败" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, updates } = body;

    if (!id || !updates) {
      return NextResponse.json(
        { success: false, error: "缺少必要参数" },
        { status: 400 }
      );
    }

    const db = await getDB();
    const allowedFields: Record<string, string> = {
      status: "status",
      scheduledTime: "scheduled_time",
      duration: "duration",
    };

    const setClauses: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(updates)) {
      const dbField = allowedFields[key];
      if (dbField && value !== undefined) {
        setClauses.push(`${dbField} = ?`);
        values.push(value);
      }
    }

    if (setClauses.length === 0) {
      return NextResponse.json(
        { success: false, error: "没有可更新的字段" },
        { status: 400 }
      );
    }

    if (updates.status === "completed") {
      setClauses.push("completed_at = ?");
      values.push(new Date().toISOString());
    }

    values.push(id);
    db.run(
      `UPDATE team_practices SET ${setClauses.join(", ")} WHERE id = ?`,
      values
    );

    const stmt = db.prepare("SELECT * FROM team_practices WHERE id = ?");
    stmt.bind([id]);
    const updated = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "组队修炼不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("更新组队修炼失败:", error);
    return NextResponse.json(
      { success: false, error: "更新组队修炼失败" },
      { status: 500 }
    );
  }
}
