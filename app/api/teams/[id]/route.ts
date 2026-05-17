import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDB();
    const stmt = db.prepare("SELECT * FROM teams WHERE id = ?");
    stmt.bind([params.id]);
    const team = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!team) {
      return NextResponse.json(
        { success: false, error: "道场不存在" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: team });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "获取道场详情失败" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    const db = await getDB();

    const allowedFields = ["name", "description", "type", "level", "max_members", "announcement"];
    const setClauses: string[] = [];
    const values: any[] = [];

    for (const [key, value] of Object.entries(body)) {
      if (allowedFields.includes(key) && value !== undefined) {
        setClauses.push(`${key} = ?`);
        values.push(value);
      }
    }

    if (setClauses.length === 0) {
      return NextResponse.json(
        { success: false, error: "没有可更新的字段" },
        { status: 400 }
      );
    }

    values.push(params.id);
    db.run(
      `UPDATE teams SET ${setClauses.join(", ")} WHERE id = ?`,
      values
    );

    const stmt = db.prepare("SELECT * FROM teams WHERE id = ?");
    stmt.bind([params.id]);
    const updated = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "道场不存在" },
        { status: 404 }
      );
    }
    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "更新道场失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const db = await getDB();
    db.run("DELETE FROM team_members WHERE team_id = ?", [params.id]);
    db.run("DELETE FROM teams WHERE id = ?", [params.id]);

    return NextResponse.json({ success: true, message: "道场已删除" });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: "删除道场失败" },
      { status: 500 }
    );
  }
}
