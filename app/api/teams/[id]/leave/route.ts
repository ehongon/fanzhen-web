import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

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

    // 检查是否是组长
    const teamStmt = db.prepare("SELECT * FROM teams WHERE id = ?");
    teamStmt.bind([params.id]);
    const team = teamStmt.step() ? teamStmt.getAsObject() : null;
    teamStmt.free();

    if (team && team.leader_id === userId) {
      return NextResponse.json(
        { success: false, error: "组长无法离开道场，请先转让组长身份" },
        { status: 400 }
      );
    }

    db.run(
      "DELETE FROM team_members WHERE team_id = ? AND user_id = ?",
      [params.id, userId]
    );

    return NextResponse.json({ success: true, message: "已离开道场" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "离开道场失败" },
      { status: 500 }
    );
  }
}
