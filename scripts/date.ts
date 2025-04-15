type MonthData = {
  name: string;
  year: number;
  month: number;
  days: number;
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function getMonthUnixSpread(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // 0-indexed (0 = January, 1 = February, ..., 11 = December)

  // Start of the month (00:00:00)
  const startOfMonth = new Date(year, month, 1).setHours(0, 0, 0, 0);

  // End of the month (23:59:59.999)
  const endOfMonth = new Date(year, month + 1, 0).setHours(23, 59, 59, 999);

  return {
    start: startOfMonth,
    end: endOfMonth
  };
}


export function generateMonthsForQuarter(year: number, quarter: number): MonthData[] {
  const monthsData: MonthData[] = [];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Calculate start and end months for the quarter
  const startMonth = (quarter) * 3;
  const endMonth = startMonth + 2;

  for (let month = startMonth; month <= endMonth; month++) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    monthsData.push({
      name: monthNames[month],
      year,
      month,
      days: daysInMonth,
    });
  }

  return monthsData;
}


export function getCurrentDayStartMs() {
  const dayStart = new Date();
  dayStart.setHours(0, 0, 0, 0); // Set time to 00:00:00
  return dayStart.getTime();
}

export function formatUnixDate(unixTimestamp: number, includeYear: boolean = true): string {
  const date = new Date(unixTimestamp);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
}

export function formatUnixDateHourMinute(unixTimestamp: number): string {
  const date = new Date(unixTimestamp);
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}

export function formatDurationHourMinute(timeInMilisecodns: number): string {
  const totalSeconds = Math.floor(timeInMilisecodns / 1000); // Total seconds
  const hours = Math.floor(totalSeconds / 3600); // Hours
  const minutes = Math.floor((totalSeconds % 3600) / 60); // Minutes
  const seconds = totalSeconds % 60; // Seconds

  let formattedDuration = '';

  if (hours > 0) {
    formattedDuration += `${hours}h`;
  }

  if (minutes > 0) {
    if (formattedDuration) formattedDuration += ' ';
    formattedDuration += `${minutes}m`;
  }

  if ((seconds > 0 || formattedDuration === '') && (minutes <= 0 || hours <= 0)) {
    if (formattedDuration) formattedDuration += ' ';
    formattedDuration += `${seconds}s`;
  }

  return formattedDuration;
}

export function getTimeAgo(unixTime: number): string {
  const now = Date.now();
  const diffMs = now - unixTime;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  if (seconds < 60) return 'just now';
  if (minutes < 60) return `${minutes} min${minutes === 1 ? '' : 's'} ago`;
  if (hours < 24) return `${hours} hour${hours === 1 ? '' : 's'} ago`;
  if (days < 30) return `${days} day${days === 1 ? '' : 's'} ago`;
  if (months < 12) return `${months} month${months === 1 ? '' : 's'} ago`;
  return `${years} year${years === 1 ? '' : 's'} ago`;
}