import { logsTable } from "@/db/schema";
import { formatUnixDate } from "./date";

const monthNames: { [key: string]: number } = {
  January: 0,
  February: 1,
  March: 2,
  April: 3,
  May: 4,
  June: 5,
  July: 6,
  August: 7,
  September: 8,
  October: 9,
  November: 10,
  December: 11
};

export function filterLogsByYearAndMonth(
  logs: typeof logsTable.$inferSelect[],
  year: string | 'ALL',
  month: string | 'ALL'
): typeof logsTable.$inferSelect[] {
  const now = new Date();

  // If 'all' is selected for year, we don't filter by year.
  if (year !== 'ALL') {
    const yearNum = Number(year);
    logs = logs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate.getFullYear() === yearNum;
    });
  }

  // If 'all' is selected for month, we don't filter by month.
  if (month !== 'ALL') {
    const monthIndex = monthNames[month];
    if (monthIndex === undefined) {
      console.warn('Invalid month name provided');
      return [];
    }

    logs = logs.filter((log) => {
      const logDate = new Date(log.date);
      return logDate.getMonth() === monthIndex;
    });
  }

  return logs;
}

type Log = {
  reps: number;
  weight: number;
  time: string;
  date: number; // timestamp
};


export function groupLogsByDay(logs: typeof logsTable.$inferSelect[]) {
  const groupedLogs: { [key: string]: any } = {};

  logs.sort((a, b) => b.date - a.date);

  // Group logs by the day
  logs.forEach(log => {
    // Get the date in YYYY-MM-DD format (this will strip off the time part)
    const logDate = formatUnixDate(log.date); // 'YYYY-MM-DD'

    if (!groupedLogs[logDate]) {
      groupedLogs[logDate] = {
        date: logDate,
        volume: 0, // Initialize volume
        logs: [],
      };
    }

    // Add the log to the correct day
    groupedLogs[logDate].logs.push(log);

    // Add the volume (reps * weight) for that log to the total volume for the day
    groupedLogs[logDate].volume += log.reps * log.weight;
  });

  // Convert the groupedLogs object to an array
  return Object.values(groupedLogs)
};