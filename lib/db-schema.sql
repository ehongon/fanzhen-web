-- 凡真网站 SQLite 数据库 Schema
-- 创建时间: 2026-05-16
-- 数据库: better-sqlite3

-- ============================================
-- 1. 用户表 users
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id TEXT PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  password TEXT NOT NULL,
  avatar TEXT,
  role TEXT DEFAULT 'user' CHECK(role IN ('user', 'editor', 'admin')),
  status TEXT DEFAULT 'active' CHECK(status IN ('active', 'inactive', 'banned')),
  current_stage TEXT DEFAULT 'lianxing' CHECK(current_stage IN ('lianxing', 'lianjing', 'lianqi', 'lianshen', 'lianxu')),
  current_level INTEGER DEFAULT 1,
  constitution TEXT,
  total_exp INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  max_streak_days INTEGER DEFAULT 0,
  total_practice_days INTEGER DEFAULT 0,
  total_practice_minutes INTEGER DEFAULT 0,
  reset_token TEXT,
  reset_token_expiry DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- 用户邮箱索引
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
-- 用户状态索引
CREATE INDEX IF NOT EXISTS idx_users_status ON users(status);

-- ============================================
-- 2. 修炼记录表 practice_records
-- ============================================
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
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- 用户修炼记录索引
CREATE INDEX IF NOT EXISTS idx_practice_user_id ON practice_records(user_id);
CREATE INDEX IF NOT EXISTS idx_practice_date ON practice_records(date);
CREATE INDEX IF NOT EXISTS idx_practice_user_date ON practice_records(user_id, date);

-- ============================================
-- 3. 每日总结表 daily_summaries
-- ============================================
CREATE TABLE IF NOT EXISTS daily_summaries (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  total_duration INTEGER DEFAULT 0,
  total_sessions INTEGER DEFAULT 0,
  main_feeling TEXT,
  sleep_quality INTEGER CHECK(sleep_quality BETWEEN 1 AND 5),
  energy_level INTEGER CHECK(energy_level BETWEEN 1 AND 5),
  mood INTEGER CHECK(mood BETWEEN 1 AND 5),
  notes TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_daily_summary_user ON daily_summaries(user_id);
CREATE INDEX IF NOT EXISTS idx_daily_summary_date ON daily_summaries(date);

-- ============================================
-- 4. 签到记录表 check_ins
-- ============================================
CREATE TABLE IF NOT EXISTS check_ins (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  date TEXT NOT NULL,
  streak_days INTEGER DEFAULT 0,
  reward_exp INTEGER DEFAULT 0,
  bonus TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, date)
);

CREATE INDEX IF NOT EXISTS idx_checkin_user ON check_ins(user_id);
CREATE INDEX IF NOT EXISTS idx_checkin_date ON check_ins(date);

-- ============================================
-- 5. 徽章记录表 user_badges
-- ============================================
CREATE TABLE IF NOT EXISTS user_badges (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  badge_id TEXT NOT NULL,
  tier INTEGER DEFAULT 1 CHECK(tier BETWEEN 1 AND 5),
  earned_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, badge_id)
);

CREATE INDEX IF NOT EXISTS idx_user_badges_user ON user_badges(user_id);

-- ============================================
-- 6. 经验记录表 exp_records
-- ============================================
CREATE TABLE IF NOT EXISTS exp_records (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  amount INTEGER NOT NULL,
  source TEXT NOT NULL,
  description TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_exp_user ON exp_records(user_id);
CREATE INDEX IF NOT EXISTS idx_exp_created ON exp_records(created_at);

-- ============================================
-- 7. 道场表 teams
-- ============================================
CREATE TABLE IF NOT EXISTS teams (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL CHECK(type IN ('gongfa', 'stage', 'region', 'interest')),
  level INTEGER DEFAULT 1 CHECK(level BETWEEN 1 AND 5),
  max_members INTEGER DEFAULT 5,
  leader_id TEXT NOT NULL,
  total_practice_minutes INTEGER DEFAULT 0,
  streak_days INTEGER DEFAULT 0,
  avatar TEXT,
  region TEXT,
  gongfa_id TEXT,
  stage TEXT,
  interest TEXT,
  announcement TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (leader_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_teams_type ON teams(type);
CREATE INDEX IF NOT EXISTS idx_teams_leader ON teams(leader_id);

-- ============================================
-- 8. 道场成员表 team_members
-- ============================================
CREATE TABLE IF NOT EXISTS team_members (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  role TEXT DEFAULT 'member' CHECK(role IN ('leader', 'admin', 'member')),
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  contribution INTEGER DEFAULT 0,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(team_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_team_members_team ON team_members(team_id);
CREATE INDEX IF NOT EXISTS idx_team_members_user ON team_members(user_id);

-- ============================================
-- 9. 道友关系表 friendships
-- ============================================
CREATE TABLE IF NOT EXISTS friendships (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  friend_id TEXT NOT NULL,
  type TEXT DEFAULT 'peer' CHECK(type IN ('peer', 'master', 'student', 'partner')),
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'accepted', 'blocked')),
  intimacy INTEGER DEFAULT 0,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  last_interaction_at DATETIME,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (friend_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, friend_id)
);

CREATE INDEX IF NOT EXISTS idx_friendships_user ON friendships(user_id);
CREATE INDEX IF NOT EXISTS idx_friendships_friend ON friendships(friend_id);
CREATE INDEX IF NOT EXISTS idx_friendships_status ON friendships(status);

-- ============================================
-- 10. 组队修炼表 team_practices
-- ============================================
CREATE TABLE IF NOT EXISTS team_practices (
  id TEXT PRIMARY KEY,
  team_id TEXT,
  gongfa_id TEXT,
  gongfa_name TEXT,
  scheduled_time DATETIME,
  duration INTEGER,
  status TEXT DEFAULT 'scheduled' CHECK(status IN ('scheduled', 'ongoing', 'completed', 'cancelled')),
  created_by TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  completed_at DATETIME,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL,
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_team_practices_team ON team_practices(team_id);
CREATE INDEX IF NOT EXISTS idx_team_practices_status ON team_practices(status);

-- ============================================
-- 11. 组队参与者表 team_practice_participants
-- ============================================
CREATE TABLE IF NOT EXISTS team_practice_participants (
  id TEXT PRIMARY KEY,
  practice_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  duration INTEGER DEFAULT 0,
  FOREIGN KEY (practice_id) REFERENCES team_practices(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(practice_id, user_id)
);

CREATE INDEX IF NOT EXISTS idx_practice_participants_practice ON team_practice_participants(practice_id);
CREATE INDEX IF NOT EXISTS idx_practice_participants_user ON team_practice_participants(user_id);

-- ============================================
-- 12. 每日任务进度表 task_progress
-- ============================================
CREATE TABLE IF NOT EXISTS task_progress (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  task_id TEXT NOT NULL,
  task_type TEXT NOT NULL CHECK(task_type IN ('daily', 'weekly', 'monthly')),
  status TEXT DEFAULT 'pending' CHECK(status IN ('pending', 'completed')),
  progress INTEGER DEFAULT 0 CHECK(progress BETWEEN 0 AND 100),
  completed_at DATETIME,
  date TEXT NOT NULL,
  reward_exp INTEGER DEFAULT 0,
  reward_badge TEXT,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE(user_id, task_id, date)
);

CREATE INDEX IF NOT EXISTS idx_task_progress_user ON task_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_task_progress_date ON task_progress(date);

-- ============================================
-- 13. 用户设置表 user_settings
-- ============================================
CREATE TABLE IF NOT EXISTS user_settings (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL UNIQUE,
  daily_goal INTEGER DEFAULT 30,
  reminder_time TEXT,
  theme TEXT DEFAULT 'light' CHECK(theme IN ('light', 'dark')),
  font_size TEXT DEFAULT 'medium' CHECK(font_size IN ('small', 'medium', 'large')),
  privacy_practice INTEGER DEFAULT 0 CHECK(privacy_practice IN (0, 1)),
  privacy_diary INTEGER DEFAULT 0 CHECK(privacy_diary IN (0, 1)),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- ============================================
-- 14. 手环数据表 wearable_data
-- ============================================
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
  stress_level INTEGER CHECK(stress_level BETWEEN 1 AND 100),
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_wearable_user ON wearable_data(user_id);
CREATE INDEX IF NOT EXISTS idx_wearable_recorded ON wearable_data(recorded_at);

-- ============================================
-- 15. 内容表 contents
-- ============================================
CREATE TABLE IF NOT EXISTS contents (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  type TEXT NOT NULL CHECK(type IN ('gongfa', 'dianji', 'article', 'case', 'qa')),
  stage TEXT,
  subtype TEXT,
  excerpt TEXT,
  body TEXT,
  author_id TEXT,
  status TEXT DEFAULT 'published' CHECK(status IN ('draft', 'pending', 'published', 'archived')),
  view_count INTEGER DEFAULT 0,
  like_count INTEGER DEFAULT 0,
  is_featured INTEGER DEFAULT 0,
  published_at DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);

CREATE INDEX IF NOT EXISTS idx_contents_type ON contents(type);
CREATE INDEX IF NOT EXISTS idx_contents_stage ON contents(stage);
CREATE INDEX IF NOT EXISTS idx_contents_status ON contents(status);
CREATE INDEX IF NOT EXISTS idx_contents_slug ON contents(slug);

-- ============================================
-- 16. 评论表 comments
-- ============================================
CREATE TABLE IF NOT EXISTS comments (
  id TEXT PRIMARY KEY,
  content_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  parent_id TEXT,
  body TEXT NOT NULL,
  like_count INTEGER DEFAULT 0,
  status TEXT DEFAULT 'published' CHECK(status IN ('pending', 'published', 'hidden', 'deleted')),
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (parent_id) REFERENCES comments(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_comments_content ON comments(content_id);
CREATE INDEX IF NOT EXISTS idx_comments_user ON comments(user_id);

-- ============================================
-- 17. 收藏表 favorites
-- ============================================
CREATE TABLE IF NOT EXISTS favorites (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  content_id TEXT NOT NULL,
  note TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (content_id) REFERENCES contents(id) ON DELETE CASCADE,
  UNIQUE(user_id, content_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON favorites(user_id);

-- ============================================
-- 18. 道场聊天记录表 team_messages
-- ============================================
CREATE TABLE IF NOT EXISTS team_messages (
  id TEXT PRIMARY KEY,
  team_id TEXT NOT NULL,
  user_id TEXT NOT NULL,
  user_name TEXT NOT NULL,
  user_avatar TEXT,
  content TEXT NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_team_messages_team ON team_messages(team_id);
CREATE INDEX IF NOT EXISTS idx_team_messages_created ON team_messages(created_at);

-- ============================================
-- 触发器: 自动更新 updated_at
-- ============================================
CREATE TRIGGER IF NOT EXISTS update_users_timestamp
AFTER UPDATE ON users
BEGIN
  UPDATE users SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_contents_timestamp
AFTER UPDATE ON contents
BEGIN
  UPDATE contents SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_user_settings_timestamp
AFTER UPDATE ON user_settings
BEGIN
  UPDATE user_settings SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;

CREATE TRIGGER IF NOT EXISTS update_comments_timestamp
AFTER UPDATE ON comments
BEGIN
  UPDATE comments SET updated_at = CURRENT_TIMESTAMP WHERE id = NEW.id;
END;
