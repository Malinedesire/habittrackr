const toUtcDate = (dateStr: string) => new Date(dateStr + "T00:00:00Z");

const daysBetween = (a: string, b: string) => {
  const d1 = toUtcDate(a);
  const d2 = toUtcDate(b);
  return Math.round((d2.getTime() - d1.getTime()) / 86400000);
};

export const getBestStreak = (dates: string[] = []) => {
  if (dates.length === 0) return 0;

  const sorted = [...new Set(dates)].sort();
  console.log("[getBestStreak] sorted dates:", sorted);

  let best = 1;
  let current = 1;

  for (let i = 1; i < sorted.length; i++) {
    const diff = daysBetween(sorted[i - 1], sorted[i]);
    console.log(
      "[getBestStreak] compare",
      sorted[i - 1],
      "→",
      sorted[i],
      "diff:",
      diff
    );

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

  const sorted = [...new Set(dates)].sort().reverse();
  console.log("[getCurrentStreak] sorted desc:", sorted);

  const todayStr = new Date().toISOString().slice(0, 10);

  let streak = 0;
  let expected = todayStr;

  for (const dateStr of sorted) {
    const diff = daysBetween(dateStr, expected);

    console.log(
      "[getCurrentStreak] expected:",
      expected,
      "actual:",
      dateStr,
      "diff:",
      diff
    );

    if (diff === 0 || diff === 1) {
      streak++;
      expected = new Date(toUtcDate(expected).getTime() - 86400000)
        .toISOString()
        .slice(0, 10);
    } else {
      break;
    }
  }

  return streak;
};

type WeeklyCount = Record<string, number>;

const groupByWeek = (dates: string[]): WeeklyCount => {
  const counts: WeeklyCount = {};

  for (const dateStr of dates) {
    const date = toUtcDate(dateStr);
    const year = date.getUTCFullYear();

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

  console.log("[groupByWeek]", counts);
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
