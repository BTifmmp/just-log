type MonthData = {
  name: string;
  year: number;
  month: number;
  days: number;
};

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