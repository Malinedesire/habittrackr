export const getBestStreak = (dates: string[] = []) => {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort();
  let best = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const prev = new Date(sorted[i - 1]);
    const curr = new Date(sorted[i]);

    const diff = (curr.getTime() - prev.getTime()) / (1000 * 60 * 60 * 24);

    if (diff === 1) {
      current++;
      best = Math.max(best, current);
    } else {
      current = 1;
    }
  }

  return best;
};

export const getCurrentStreak = (dates: string[] = []) => {
  if (dates.length === 0) return 0;

  const sorted = [...dates].sort().reverse(); // senaste först
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  let streak = 0;
  let expectedDate = new Date(today);

  for (const dateStr of sorted) {
    const date = new Date(dateStr);
    date.setHours(0, 0, 0, 0);

    const diff =
      (expectedDate.getTime() - date.getTime()) / (1000 * 60 * 60 * 24);

    // tillåt idag eller igår som start
    if (diff === 0 || diff === 1) {
      streak++;
      expectedDate.setDate(expectedDate.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
};

type WeeklyCount = Record<string, number>;

/**
 * Groups dates by ISO year-week (e.g. 2026-03)
 */
const groupByWeek = (dates: string[]): WeeklyCount => {
  const counts: WeeklyCount = {};

  for (const dateStr of dates) {
    const date = new Date(dateStr);
    const year = date.getUTCFullYear();

    // ISO week calculation
    const temp = new Date(
      Date.UTC(year, date.getUTCMonth(), date.getUTCDate())
    );
    const dayNum = temp.getUTCDay() || 7;
    temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
    const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
    const week = Math.ceil(((+temp - +yearStart) / 86400000 + 1) / 7);

    const key = `${temp.getUTCFullYear()}-${week}`;
    counts[key] = (counts[key] || 0) + 1;
  }

  return counts;
};

export const getWeeklyBestStreak = (
  dates: string[],
  targetPerPeriod: number
) => {
  const weeks = groupByWeek(dates);
  const sortedWeeks = Object.entries(weeks)
    .filter(([, count]) => count >= targetPerPeriod)
    .map(([week]) => week)
    .sort();

  let best = 0;
  let current = 0;

  for (let i = 0; i < sortedWeeks.length; i++) {
    if (i === 0) {
      current = 1;
    } else {
      const prev = sortedWeeks[i - 1];
      const curr = sortedWeeks[i];

      const [py, pw] = prev.split("-").map(Number);
      const [cy, cw] = curr.split("-").map(Number);

      const diff = (cy - py) * 52 + (cw - pw);

      if (diff === 1) {
        current++;
      } else {
        current = 1;
      }
    }

    best = Math.max(best, current);
  }

  return best;
};

export const getWeeklyCurrentStreak = (
  dates: string[],
  targetPerPeriod: number
) => {
  const weeks = groupByWeek(dates);

  const today = new Date();
  const year = today.getUTCFullYear();

  const temp = new Date(
    Date.UTC(year, today.getUTCMonth(), today.getUTCDate())
  );
  const dayNum = temp.getUTCDay() || 7;
  temp.setUTCDate(temp.getUTCDate() + 4 - dayNum);
  const yearStart = new Date(Date.UTC(temp.getUTCFullYear(), 0, 1));
  const currentWeek = Math.ceil(((+temp - +yearStart) / 86400000 + 1) / 7);

  let streak = 0;
  let expectedYear = temp.getUTCFullYear();
  let expectedWeek = currentWeek;

  while (true) {
    const key = `${expectedYear}-${expectedWeek}`;
    if ((weeks[key] || 0) >= targetPerPeriod) {
      streak++;
      expectedWeek--;

      if (expectedWeek === 0) {
        expectedYear--;
        expectedWeek = 52;
      }
    } else {
      break;
    }
  }

  return streak;
};