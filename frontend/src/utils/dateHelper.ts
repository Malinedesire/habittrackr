export const getCompletedLast7Days = (dates: string[] = []) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const last7Days = new Date(today);
  last7Days.setDate(today.getDate() - 6);

  return dates.filter((date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    return d >= last7Days && d <= today;
  }).length;
};

export const getCompletedThisCalendarWeek = (dates: string[] = []) => {
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  const startOfWeek = new Date(now);
  const day = startOfWeek.getDay() || 7; 
  startOfWeek.setDate(startOfWeek.getDate() - day + 1);
  startOfWeek.setHours(0, 0, 0, 0);

  return dates.filter((date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);

    return d >= startOfWeek && d <= now;
  }).length;
};
