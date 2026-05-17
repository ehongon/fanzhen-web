import { NextRequest, NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const db = await getDB();

    const stmt = db.prepare(
      `SELECT c.*, u.name as author_name
       FROM contents c
       LEFT JOIN users u ON c.author_id = u.id
       WHERE c.slug = ? AND c.status = 'published'`
    );
    stmt.bind([params.slug]);
    const content = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CONTENT_NOT_FOUND",
            message: "内容不存在",
          },
        },
        { status: 404 }
      );
    }

    // 增加浏览量
    db.run(
      "UPDATE contents SET view_count = view_count + 1 WHERE id = ?",
      [content.id]
    );

    const commentsStmt = db.prepare(
      `SELECT c.*, u.name as author_name, u.avatar as author_avatar
       FROM comments c
       LEFT JOIN users u ON c.user_id = u.id
       WHERE c.content_id = ?
       ORDER BY c.created_at DESC`
    );
    commentsStmt.bind([content.id]);
    const comments: any[] = [];
    while (commentsStmt.step()) {
      comments.push(commentsStmt.getAsObject());
    }
    commentsStmt.free();

    return NextResponse.json(
      {
        success: true,
        data: {
          ...content,
          comments,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("获取内容详情失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取内容详情失败",
        },
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const body = await request.json();
    const { title, excerpt, body: contentBody, status } = body;

    const db = await getDB();

    const setClauses: string[] = [];
    const values: any[] = [];

    if (title !== undefined) {
      setClauses.push("title = ?");
      values.push(title);
    }
    if (excerpt !== undefined) {
      setClauses.push("excerpt = ?");
      values.push(excerpt);
    }
    if (contentBody !== undefined) {
      setClauses.push("body = ?");
      values.push(contentBody);
    }
    if (status !== undefined) {
      setClauses.push("status = ?");
      values.push(status);
    }

    if (setClauses.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "没有可更新的字段",
          },
        },
        { status: 400 }
      );
    }

    values.push(params.slug);
    db.run(
      `UPDATE contents SET ${setClauses.join(", ")}, updated_at = CURRENT_TIMESTAMP WHERE slug = ?`,
      values
    );

    const stmt = db.prepare("SELECT * FROM contents WHERE slug = ?");
    stmt.bind([params.slug]);
    const updated = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!updated) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CONTENT_NOT_FOUND",
            message: "内容不存在",
          },
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: updated,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("更新内容失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "更新内容失败",
        },
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  try {
    const db = await getDB();

    const stmt = db.prepare("SELECT * FROM contents WHERE slug = ?");
    stmt.bind([params.slug]);
    const content = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    if (!content) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "CONTENT_NOT_FOUND",
            message: "内容不存在",
          },
        },
        { status: 404 }
      );
    }

    db.run("DELETE FROM contents WHERE slug = ?", [params.slug]);

    return NextResponse.json(
      {
        success: true,
        message: "内容已删除",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("删除内容失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "删除内容失败",
        },
      },
      { status: 500 }
    );
  }
}
