export interface DailyTask {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  category: 'required' | 'optional';
  reward: {
    exp: number;
    badge?: string;
    item?: string;
  };
  condition: string;
  icon: string;
}

export interface UserTaskProgress {
  userId: string;
  taskId: string;
  status: 'pending' | 'completed';
  progress: number;
  completedAt?: Date;
  date: string;
}

export interface CheckInRecord {
  userId: string;
  date: string;
  streakDays: number;
  reward: {
    exp: number;
    bonus?: string;
  };
}

export interface CheckInDayInfo {
  date: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  isCheckedIn: boolean;
  isFuture: boolean;
  streakDay?: number;
  specialDate?: string;
}

export const CHECK_IN_REWARDS: Record<number, number> = {
  1: 10,
  2: 20,
  3: 30,
  4: 40,
  5: 50,
  6: 60,
  7: 100,
};

export function getCheckInReward(streakDays: number): number {
  const day = ((streakDays - 1) % 7) + 1;
  return CHECK_IN_REWARDS[day];
}

export const DAILY_TASKS: DailyTask[] = [
  {
    id: 'daily-cultivation',
    title: '今日修炼',
    description: '完成至少一次修炼，保持修行不辍',
    type: 'daily',
    category: 'required',
    reward: { exp: 50 },
    condition: '完成一次修炼',
    icon: '🧘',
  },
  {
    id: 'daily-study',
    title: '学习一刻',
    description: '阅读一篇典籍或文章，增长智慧',
    type: 'daily',
    category: 'required',
    reward: { exp: 30 },
    condition: '阅读一篇内容',
    icon: '📖',
  },
  {
    id: 'daily-interaction',
    title: '社区互动',
    description: '点赞或评论一次，与道友交流',
    type: 'daily',
    category: 'required',
    reward: { exp: 20 },
    condition: '点赞或评论一次',
    icon: '💬',
  },
  {
    id: 'daily-early',
    title: '早起修炼',
    description: '在7点前完成修炼，迎接朝阳',
    type: 'daily',
    category: 'optional',
    reward: { exp: 40, badge: '早起者' },
    condition: '7点前完成修炼',
    icon: '🌅',
  },
  {
    id: 'daily-night',
    title: '睡前修炼',
    description: '在22点后完成修炼，安神入眠',
    type: 'daily',
    category: 'optional',
    reward: { exp: 40, badge: '夜修者' },
    condition: '22点后完成修炼',
    icon: '🌙',
  },
  {
    id: 'daily-journal',
    title: '记录心得',
    description: '发表一篇修炼心得，记录成长',
    type: 'daily',
    category: 'optional',
    reward: { exp: 50, badge: '记录者' },
    condition: '发表一篇心得',
    icon: '📝',
  },
  {
    id: 'daily-answer',
    title: '答疑解惑',
    description: '回答一个社区问题，助人利己',
    type: 'daily',
    category: 'optional',
    reward: { exp: 40, badge: '解惑者' },
    condition: '回答一个问题',
    icon: '❓',
  },
  {
    id: 'daily-reading',
    title: '典籍研读',
    description: '阅读30分钟典籍，深入研习',
    type: 'daily',
    category: 'optional',
    reward: { exp: 30, badge: '研读者' },
    condition: '阅读30分钟',
    icon: '📚',
  },
];

export const WEEKLY_TASKS: DailyTask[] = [
  {
    id: 'weekly-perfect',
    title: '周满勤',
    description: '本周每天都完成修炼，持之以恒',
    type: 'weekly',
    category: 'required',
    reward: { exp: 500, badge: '周满勤' },
    condition: '本周每天修炼',
    icon: '📅',
  },
  {
    id: 'weekly-breakthrough',
    title: '功法突破',
    description: '本周掌握一个新功法，精进不休',
    type: 'weekly',
    category: 'required',
    reward: { exp: 300, badge: '突破者' },
    condition: '掌握新功法',
    icon: '🎯',
  },
  {
    id: 'weekly-team',
    title: '结伴修炼',
    description: '本周与道友组队修炼一次，同道共进',
    type: 'weekly',
    category: 'required',
    reward: { exp: 200, badge: '结伴者' },
    condition: '组队修炼一次',
    icon: '🤝',
  },
];

export const MONTHLY_TASKS: DailyTask[] = [
  {
    id: 'monthly-goal',
    title: '月度目标',
    description: '完成本月设定的修炼目标，志在必得',
    type: 'monthly',
    category: 'required',
    reward: { exp: 2000, badge: '月度达成' },
    condition: '完成月度目标',
    icon: '📈',
  },
  {
    id: 'monthly-star',
    title: '月度之星',
    description: '进入本月排行榜前100，名扬四海',
    type: 'monthly',
    category: 'required',
    reward: { exp: 1000, badge: '月度之星' },
    condition: '排行榜前100',
    icon: '🏆',
  },
];

export const SOLAR_TERMS: Record<string, string> = {
  '02-04': '立春',
  '02-19': '雨水',
  '03-05': '惊蛰',
  '03-20': '春分',
  '04-04': '清明',
  '04-20': '谷雨',
  '05-05': '立夏',
  '05-21': '小满',
  '06-05': '芒种',
  '06-21': '夏至',
  '07-07': '小暑',
  '07-23': '大暑',
  '08-07': '立秋',
  '08-23': '处暑',
  '09-07': '白露',
  '09-23': '秋分',
  '10-08': '寒露',
  '10-23': '霜降',
  '11-07': '立冬',
  '11-22': '小雪',
  '12-07': '大雪',
  '12-21': '冬至',
  '01-05': '小寒',
  '01-20': '大寒',
};

export function getSolarTerm(date: Date): string | undefined {
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const key = `${month}-${day}`;
  return SOLAR_TERMS[key];
}

export function isSpecialDate(date: Date): { type: string; name: string } | null {
  const day = date.getDate();
  const solarTerm = getSolarTerm(date);

  if (day === 1) {
    return { type: 'double', name: '月初双倍' };
  }

  if (solarTerm) {
    return { type: 'solar-term', name: solarTerm };
  }

  return null;
}

export function generateCalendarDays(year: number, month: number, checkInDates: string[]): CheckInDayInfo[] {
  const days: CheckInDayInfo[] = [];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDayOfWeek = firstDay.getDay();

  const prevMonthLastDay = new Date(year, month, 0).getDate();
  for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const date = new Date(year, month - 1, prevMonthLastDay - i);
    const dateStr = formatDate(date);
    days.push({
      date: dateStr,
      dayOfMonth: prevMonthLastDay - i,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date()),
      isCheckedIn: checkInDates.includes(dateStr),
      isFuture: false,
    });
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    const dateStr = formatDate(date);
    const isToday = isSameDay(date, new Date());
    const isFuture = date > new Date();
    const special = isSpecialDate(date);

    days.push({
      date: dateStr,
      dayOfMonth: day,
      isCurrentMonth: true,
      isToday,
      isCheckedIn: checkInDates.includes(dateStr),
      isFuture,
      specialDate: special?.name,
    });
  }

  const remainingDays = 42 - days.length;
  for (let day = 1; day <= remainingDays; day++) {
    const date = new Date(year, month + 1, day);
    const dateStr = formatDate(date);
    days.push({
      date: dateStr,
      dayOfMonth: day,
      isCurrentMonth: false,
      isToday: isSameDay(date, new Date()),
      isCheckedIn: checkInDates.includes(dateStr),
      isFuture: true,
    });
  }

  return days;
}

export function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isSameDay(date1: Date, date2: Date): boolean {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
}

export function calculateStreak(checkInDates: string[]): number {
  if (checkInDates.length === 0) return 0;

  const sorted = [...checkInDates].sort().reverse();
  const today = formatDate(new Date());
  const yesterday = formatDate(new Date(Date.now() - 86400000));

  if (sorted[0] !== today && sorted[0] !== yesterday) {
    return 0;
  }

  let streak = 1;
  for (let i = 1; i < sorted.length; i++) {
    const prevDate = new Date(sorted[i - 1]);
    const currDate = new Date(sorted[i]);
    const diffDays = (prevDate.getTime() - currDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffDays === 1) {
      streak++;
    } else {
      break;
    }
  }

  return streak;
}

export const WEEKDAY_NAMES = ['日', '一', '二', '三', '四', '五', '六'];

export const MONTH_NAMES = [
  '一月', '二月', '三月', '四月', '五月', '六月',
  '七月', '八月', '九月', '十月', '十一月', '十二月',
];
