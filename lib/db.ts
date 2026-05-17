import initSqlJs from "sql.js";

let db: any = null;
let SQL: any = null;

// 初始化SQL.js
async function initSQL() {
  if (!SQL) {
    SQL = await initSqlJs();
  }
  return SQL;
}

// 获取数据库实例
export async function getDB() {
  if (db) return db;

  const sql = await initSQL();

  // 在服务端环境中尝试从文件系统读取
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const path = await import('path');
      const DB_PATH = path.join(process.cwd(), "data", "fanzhen.db");

      if (fs.existsSync(DB_PATH)) {
        const filebuffer = fs.readFileSync(DB_PATH);
        db = new sql.Database(filebuffer);
      } else {
        db = new sql.Database();
        initSchema();
        saveDB();
      }
    } catch {
      // 如果无法访问文件系统（如边缘环境），使用内存数据库
      db = new sql.Database();
      initSchema();
    }
  } else {
    // 客户端环境：使用内存数据库（不推荐在客户端直接操作数据库）
    db = new sql.Database();
    initSchema();
  }

  return db;
}

// 保存数据库到文件（仅在服务端可用）
export function saveDB() {
  if (!db || typeof window !== 'undefined') return;

  try {
    const data = db.export();
    const buffer = Buffer.from(data);

    import('fs').then((fs) => {
      import('path').then((path) => {
        const DB_PATH = path.join(process.cwd(), "data", "fanzhen.db");
        const dir = path.dirname(DB_PATH);
        if (!fs.existsSync(dir)) {
          fs.mkdirSync(dir, { recursive: true });
        }
        fs.writeFileSync(DB_PATH, buffer);
      });
    });
  } catch {
    // 忽略保存错误
  }
}

// 初始化数据库Schema
function initSchema() {
  if (!db) return;

  const schema = `
    -- 用户表
    CREATE TABLE IF NOT EXISTS users (
      id TEXT PRIMARY KEY,
      email TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      password TEXT NOT NULL,
      avatar TEXT,
      role TEXT DEFAULT 'user',
      status TEXT DEFAULT 'active',
      current_stage TEXT DEFAULT 'lianxing',
      current_level INTEGER DEFAULT 1,
      constitution TEXT,
      total_exp INTEGER DEFAULT 0,
      streak_days INTEGER DEFAULT 0,
      max_streak_days INTEGER DEFAULT 0,
      total_practice_days INTEGER DEFAULT 0,
      total_practice_minutes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 修炼记录表
    CREATE TABLE IF NOT EXISTS practice_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      gongfa_id TEXT NOT NULL,
      gongfa_name TEXT NOT NULL,
      start_time TEXT,
      duration INTEGER NOT NULL,
      stage TEXT NOT NULL,
      feeling TEXT,
      body_reaction TEXT,
      qi_sensation TEXT,
      mind_state TEXT,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 每日总结表
    CREATE TABLE IF NOT EXISTS daily_summaries (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      total_duration INTEGER DEFAULT 0,
      total_sessions INTEGER DEFAULT 0,
      main_feeling TEXT,
      sleep_quality INTEGER,
      energy_level INTEGER,
      mood INTEGER,
      notes TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, date)
    );

    -- 签到记录表
    CREATE TABLE IF NOT EXISTS check_ins (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      date TEXT NOT NULL,
      streak_days INTEGER DEFAULT 0,
      reward_exp INTEGER DEFAULT 0,
      bonus TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, date)
    );

    -- 徽章记录表
    CREATE TABLE IF NOT EXISTS user_badges (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      badge_id TEXT NOT NULL,
      tier INTEGER DEFAULT 1,
      earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, badge_id)
    );

    -- 经验记录表
    CREATE TABLE IF NOT EXISTS exp_records (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      amount INTEGER NOT NULL,
      source TEXT NOT NULL,
      description TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 道场表
    CREATE TABLE IF NOT EXISTS teams (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      description TEXT,
      type TEXT NOT NULL,
      level INTEGER DEFAULT 1,
      max_members INTEGER DEFAULT 5,
      leader_id TEXT NOT NULL,
      total_practice_minutes INTEGER DEFAULT 0,
      streak_days INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 道场成员表
    CREATE TABLE IF NOT EXISTS team_members (
      id TEXT PRIMARY KEY,
      team_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      role TEXT DEFAULT 'member',
      joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      contribution INTEGER DEFAULT 0,
      UNIQUE(team_id, user_id)
    );

    -- 道友关系表
    CREATE TABLE IF NOT EXISTS friendships (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      friend_id TEXT NOT NULL,
      type TEXT DEFAULT 'peer',
      status TEXT DEFAULT 'pending',
      intimacy INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, friend_id)
    );

    -- 组队修炼表
    CREATE TABLE IF NOT EXISTS team_practices (
      id TEXT PRIMARY KEY,
      team_id TEXT,
      gongfa_id TEXT,
      gongfa_name TEXT,
      scheduled_time DATETIME,
      duration INTEGER,
      status TEXT DEFAULT 'scheduled',
      created_by TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 组队参与者表
    CREATE TABLE IF NOT EXISTS team_practice_participants (
      id TEXT PRIMARY KEY,
      practice_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      duration INTEGER DEFAULT 0,
      UNIQUE(practice_id, user_id)
    );

    -- 每日任务进度表
    CREATE TABLE IF NOT EXISTS task_progress (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      task_id TEXT NOT NULL,
      task_type TEXT NOT NULL,
      status TEXT DEFAULT 'pending',
      progress INTEGER DEFAULT 0,
      completed_at DATETIME,
      date TEXT NOT NULL,
      reward_exp INTEGER DEFAULT 0,
      reward_badge TEXT,
      UNIQUE(user_id, task_id, date)
    );

    -- 用户设置表
    CREATE TABLE IF NOT EXISTS user_settings (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL UNIQUE,
      daily_goal INTEGER DEFAULT 30,
      reminder_time TEXT,
      theme TEXT DEFAULT 'light',
      font_size TEXT DEFAULT 'medium',
      privacy_practice INTEGER DEFAULT 0,
      privacy_diary INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 手环数据表
    CREATE TABLE IF NOT EXISTS wearable_data (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      device_id TEXT NOT NULL,
      recorded_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      heart_rate INTEGER,
      heart_rate_variability REAL,
      blood_oxygen REAL,
      body_temperature REAL,
      steps INTEGER,
      calories INTEGER,
      sleep_duration INTEGER,
      sleep_deep INTEGER,
      sleep_light INTEGER,
      sleep_rem INTEGER,
      stress_level INTEGER
    );

    -- 内容表
    CREATE TABLE IF NOT EXISTS contents (
      id TEXT PRIMARY KEY,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      type TEXT NOT NULL,
      stage TEXT,
      body TEXT,
      author_id TEXT,
      status TEXT DEFAULT 'published',
      view_count INTEGER DEFAULT 0,
      like_count INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 评论表
    CREATE TABLE IF NOT EXISTS comments (
      id TEXT PRIMARY KEY,
      content_id TEXT NOT NULL,
      user_id TEXT NOT NULL,
      body TEXT NOT NULL,
      parent_id TEXT,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    -- 收藏表
    CREATE TABLE IF NOT EXISTS favorites (
      id TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      content_id TEXT NOT NULL,
      type TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(user_id, content_id)
    );

    -- 创建索引
    CREATE INDEX IF NOT EXISTS idx_practice_user ON practice_records(user_id);
    CREATE INDEX IF NOT EXISTS idx_practice_date ON practice_records(date);
    CREATE INDEX IF NOT EXISTS idx_exp_user ON exp_records(user_id);
    CREATE INDEX IF NOT EXISTS idx_checkin_user ON check_ins(user_id);
    CREATE INDEX IF NOT EXISTS idx_team_member ON team_members(team_id);
    CREATE INDEX IF NOT EXISTS idx_friendship_user ON friendships(user_id);
    CREATE INDEX IF NOT EXISTS idx_wearable_user ON wearable_data(user_id);
  `;

  db.exec(schema);
}

// 生成唯一ID
export function generateId(): string {
  return "id_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
}

// 执行查询（返回多条记录）- sql.js兼容版本
export async function query(sqlStr: string, params: any[] = []): Promise<any[]> {
  const database = await getDB();
  const stmt = database.prepare(sqlStr);
  stmt.bind(params);
  const results: any[] = [];
  while (stmt.step()) {
    results.push(stmt.getAsObject());
  }
  stmt.free();
  return results;
}

// 执行查询（返回单条记录）- sql.js兼容版本
export async function get(sqlStr: string, params: any[] = []): Promise<any | null> {
  const database = await getDB();
  const stmt = database.prepare(sqlStr);
  stmt.bind(params);
  const result = stmt.step() ? stmt.getAsObject() : null;
  stmt.free();
  return result;
}

// 执行命令（INSERT/UPDATE/DELETE）- sql.js兼容版本
export async function run(sqlStr: string, params: any[] = []): Promise<{ lastID: string; changes: number }> {
  const database = await getDB();
  database.run(sqlStr, params);
  saveDB();
  return { lastID: generateId(), changes: 1 };
}

// 执行事务
export async function transaction(callback: (db: any) => void): Promise<void> {
  const database = await getDB();
  database.exec("BEGIN TRANSACTION;");
  try {
    callback(database);
    database.exec("COMMIT;");
    saveDB();
  } catch (error) {
    database.exec("ROLLBACK;");
    throw error;
  }
}

// 检查数据库是否已初始化
export function isDbInitialized(): boolean {
  if (typeof window !== 'undefined') return false;
  try {
    const fs = require('fs');
    const path = require('path');
    const DB_PATH = path.join(process.cwd(), "data", "fanzhen.db");
    return fs.existsSync(DB_PATH);
  } catch {
    return false;
  }
}

// 初始化数据库（用于db-migrate.ts兼容）
export function initDb(): void {
  // 在getDB中已经处理了初始化逻辑
  // 这个函数是为了兼容旧的调用
}
