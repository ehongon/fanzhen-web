import { NextRequest, NextResponse } from "next/server";
import { getDB, generateId } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    const db = await getDB();
    let friends: any[];

    if (userId) {
      const stmt = db.prepare(
        `SELECT f.*, u.name as friend_name, u.avatar as friend_avatar
         FROM friendships f
         JOIN users u ON f.friend_id = u.id
         WHERE f.user_id = ? AND f.status = 'accepted'`
      );
      stmt.bind([userId]);
      friends = [];
      while (stmt.step()) {
        friends.push(stmt.getAsObject());
      }
      stmt.free();
    } else {
      const stmt = db.prepare("SELECT * FROM friendships WHERE status = 'accepted'");
      friends = [];
      while (stmt.step()) {
        friends.push(stmt.getAsObject());
      }
      stmt.free();
    }

    return NextResponse.json({ success: true, data: friends });
  } catch (error) {
    console.error("获取道友列表失败:", error);
    return NextResponse.json(
      { success: false, error: "获取道友列表失败" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { userId, friendId, type } = body;

    if (!userId || !friendId || !type) {
      return NextResponse.json(
        { success: false, error: "缺少必要参数" },
        { status: 400 }
      );
    }

    const db = await getDB();

    const existingStmt = db.prepare("SELECT * FROM friendships WHERE user_id = ? AND friend_id = ?");
    existingStmt.bind([userId, friendId]);
    const existing = existingStmt.step() ? existingStmt.getAsObject() : null;
    existingStmt.free();

    if (existing) {
      return NextResponse.json(
        { success: false, error: "道友关系已存在" },
        { status: 409 }
      );
    }

    const id = generateId();
    const now = new Date().toISOString();
    db.run(
      `
      INSERT INTO friendships (id, user_id, friend_id, type, status, intimacy, created_at)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `,
      [id, userId, friendId, type, "pending", 0, now]
    );

    const stmt = db.prepare("SELECT * FROM friendships WHERE id = ?");
    stmt.bind([id]);
    const friend = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    return NextResponse.json({ success: true, data: friend });
  } catch (error) {
    console.error("添加道友失败:", error);
    return NextResponse.json(
      { success: false, error: "添加道友失败" },
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
      type: "type",
      status: "status",
      intimacy: "intimacy",
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

    values.push(id);
    db.run(
      `UPDATE friendships SET ${setClauses.join(", ")} WHERE id = ?`,
      values
    );

    const stmt = db.prepare("SELECT * FROM friendships WHERE id = ?");
    stmt.bind([id]);
    const updated = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "道友关系不存在" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error("更新道友关系失败:", error);
    return NextResponse.json(
      { success: false, error: "更新道友关系失败" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "缺少道友关系ID" },
        { status: 400 }
      );
    }

    const db = await getDB();
    db.run("DELETE FROM friendships WHERE id = ?", [id]);

    return NextResponse.json({ success: true, message: "道友关系已删除" });
  } catch (error) {
    console.error("删除道友关系失败:", error);
    return NextResponse.json(
      { success: false, error: "删除道友关系失败" },
      { status: 500 }
    );
  }
}
