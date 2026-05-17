import { NextRequest, NextResponse } from "next/server";
import { getDB, generateId } from "@/lib/db";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get("type") || "gongfa";
    const stage = searchParams.get("stage");
    const page = parseInt(searchParams.get("page") || "1");
    const pageSize = parseInt(searchParams.get("pageSize") || "20");
    const offset = (page - 1) * pageSize;

    const db = await getDB();

    let whereClause = "WHERE status = 'published'";
    const params: any[] = [];

    if (type) {
      whereClause += " AND type = ?";
      params.push(type);
    }

    if (stage) {
      whereClause += " AND stage = ?";
      params.push(stage);
    }

    const contentsStmt = db.prepare(
      `SELECT c.*, u.name as author_name
       FROM contents c
       LEFT JOIN users u ON c.author_id = u.id
       ${whereClause}
       ORDER BY created_at DESC
       LIMIT ? OFFSET ?`
    );
    contentsStmt.bind([...params, pageSize, offset]);
    const contents: any[] = [];
    while (contentsStmt.step()) {
      contents.push(contentsStmt.getAsObject());
    }
    contentsStmt.free();

    const countStmt = db.prepare(`SELECT COUNT(*) as total FROM contents ${whereClause}`);
    countStmt.bind(params);
    const countRow = countStmt.step() ? countStmt.getAsObject() : { total: 0 };
    countStmt.free();
    const total = countRow.total || 0;

    return NextResponse.json(
      {
        success: true,
        data: contents,
        meta: {
          page,
          pageSize,
          total,
          totalPages: Math.ceil(total / pageSize),
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("获取内容列表失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "获取内容列表失败",
        },
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { title, slug, type, stage, excerpt, body: contentBody, authorId, status = "draft" } = body;

    if (!title || !slug || !type) {
      return NextResponse.json(
        {
          success: false,
          error: {
            code: "INVALID_PARAMS",
            message: "缺少必要参数",
          },
        },
        { status: 400 }
      );
    }

    const db = await getDB();
    const id = generateId();
    const now = new Date().toISOString();

    db.run(
      `
      INSERT INTO contents (id, title, slug, type, stage, excerpt, body, author_id, status, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `,
      [
        id,
        title,
        slug,
        type,
        stage || null,
        excerpt || null,
        contentBody || null,
        authorId || null,
        status,
        now,
        now,
      ]
    );

    const stmt = db.prepare("SELECT * FROM contents WHERE id = ?");
    stmt.bind([id]);
    const content = stmt.step() ? stmt.getAsObject() : null;
    stmt.free();

    return NextResponse.json(
      {
        success: true,
        data: content,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("创建内容失败:", error);
    return NextResponse.json(
      {
        success: false,
        error: {
          code: "SERVER_ERROR",
          message: "创建内容失败",
        },
      },
      { status: 500 }
    );
  }
}
