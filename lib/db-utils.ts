import { getDB, generateId as dbGenerateId } from "./db";

// 重新导出generateId
export { dbGenerateId as generateId };

// 格式化日期为YYYY-MM-DD
export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// 生成带前缀的ID
export function generateIdWithPrefix(prefix: string): string {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

// 执行查询（返回多条记录）- 兼容层
export async function query(sql: string, params: any[] = []): Promise<any[]> {
  const db = await getDB();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const results: any[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// 执行查询（返回单条记录）- 兼容层
export async function get(sql: string, params: any[] = []): Promise<any | null> {
  const db = await getDB();
  const stmt = db.prepare(sql);
  stmt.bind(params);
  const result = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return result;
}

// 执行命令（INSERT/UPDATE/DELETE）- 兼容层
export async function run(sql: string, params: any[] = []): Promise<{ lastID: string; changes: number }> {
  const db = await getDB();
  db.run(sql, params);
  return { lastID: dbGenerateId(), changes: 1 };
}

// 执行所有（兼容better-sqlite3的all方法）
export async function all(sql: string, params: any[] = []): Promise<any[]> {
  return query(sql, params);
}
