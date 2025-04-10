type MonthData = {
  name: string;
  year: number;
  month: number;
  days: number;
};

const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export function generateMonths(): MonthData[] {
  const monthsData: MonthData[] = [];
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const today = new Date();
  const startYear = 2025;
  const startMonth = 1; // January
  const endYear = today.getFullYear();
  const endMonth = today.getMonth(); // getMonth() returns 0-based index

  for (let year = startYear; year <= endYear; year++) {
    for (let month = startMonth; month <= 12; month++) {
      if (year === endYear && month > endMonth) break;

      const daysInMonth = new Date(year, month, 0).getDate();

      monthsData.push({
        name: monthNames[month - 1], // Get correct month name
        year,
        month,
        days: daysInMonth,
      });
    }
  }

  // Reverse order so January 2025 is at the bottom
  return monthsData.reverse();
};

export function formatUnixDate(unixTimestamp: number, includeYear: boolean = true): string {
  const date = new Date(unixTimestamp);
  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return includeYear ? `${day} ${month} ${year}` : `${day} ${month}`;
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