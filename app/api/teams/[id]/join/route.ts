import { NextRequest, NextResponse } from "next/server";
import { getDB, generateId } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, error: "缺少用户ID" },
        { status: 400 }
      );
    }

    const db = await getDB();

    // 检查道场是否存在
    const teamStmt = db.prepare("SELECT * FROM teams WHERE id = ?");
    teamStmt.bind([params.id]);
    const team = teamStmt.step() ? teamStmt.getAsObject() : null;
    teamStmt.free();

    if (!team) {
      return NextResponse.json(
        { success: false, error: "道场不存在" },
        { status: 404 }
      );
    }

    // 检查是否已加入
    const memberStmt = db.prepare("SELECT * FROM team_members WHERE team_id = ? AND user_id = ?");
    memberStmt.bind([params.id, userId]);
    const existing = memberStmt.step() ? memberStmt.getAsObject() : null;
    memberStmt.free();

    if (existing) {
      return NextResponse.json(
        { success: false, error: "已加入该道场" },
        { status: 409 }
      );
    }

    // 检查是否已满员
    const countStmt = db.prepare("SELECT COUNT(*) as count FROM team_members WHERE team_id = ?");
    countStmt.bind([params.id]);
    const countRow = countStmt.step() ? countStmt.getAsObject() : { count: 0 };
    countStmt.free();

    if (countRow.count >= team.max_members) {
      return NextResponse.json(
        { success: false, error: "道场已满员" },
        { status: 400 }
      );
    }

    const now = new Date().toISOString();
    db.run(
      "INSERT INTO team_members (id, team_id, user_id, role, joined_at, contribution) VALUES (?, ?, ?, ?, ?, ?)",
      [generateId(), params.id, userId, "member", now, 0]
    );

    return NextResponse.json({ success: true, message: "加入道场成功" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "加入道场失败" },
      { status: 500 }
    );
  }
}
