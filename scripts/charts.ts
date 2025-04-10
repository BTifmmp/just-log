import { logsTable } from '@/db/schema';
import { formatUnixDate } from './date';
import { calculateOneRepMax } from './one_rep_calc';
type TimeFrame = '3m' | '6m' | '1y' | 'all';

// 1. Filter logs based on timeframe
export function filterLogsByTimeFrame(logs: typeof logsTable.$inferSelect[], timeFrame: TimeFrame): typeof logsTable.$inferSelect[] {
  const now = Date.now();
  const msInDay = 86400000;
  let cutoff = 0;

  switch (timeFrame) {
    case '3m':
      cutoff = now - 90 * msInDay;
      break;
    case '6m':
      cutoff = now - 180 * msInDay;
      break;
    case '1y':
      cutoff = now - 365 * msInDay;
      break;
    case 'all':
      cutoff = 0;
      break;
  }

  return logs.filter((log) => log.date >= cutoff);
}

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

export function groupLogsByDayWithMaxValues(
  logs: typeof logsTable.$inferSelect[],
): {
  maxWeightLogs: typeof logsTable.$inferSelect[];
  maxRepsLogs: typeof logsTable.$inferSelect[];
  max1RMLogs: typeof logsTable.$inferSelect[];
} {
  const groupedLogs: { [key: string]: any } = {};
  // Group logs by the day
  logs.forEach(log => {
    // Get the date in YYYY-MM-DD format (this will strip off the time part)
    const logDate = formatUnixDate(log.date); // Assuming formatUnixDate is 'YYYY-MM-DD'

    if (!groupedLogs[logDate]) {
      groupedLogs[logDate] = {
        date: logDate,
        logs: [],
      };
    }

    // Add the log to the correct day
    groupedLogs[logDate].logs.push(log);
  });

  // Initialize arrays to store max value logs for each field
  const maxWeightLogs: typeof logsTable.$inferSelect[] = [];
  const maxRepsLogs: typeof logsTable.$inferSelect[] = [];
  const max1RMLogs: typeof logsTable.$inferSelect[] = [];

  // Process each day and pick the max values for each type
  Object.values(groupedLogs).forEach(group => {
    const logsForDay = group.logs;

    // Calculate max weight log
    const maxWeightLog = logsForDay.reduce((max: any, current: any) => {
      return current.weight > max.weight ? current : max;
    }, logsForDay[0]);
    maxWeightLogs.push(maxWeightLog);

    // Calculate max reps log
    const maxRepsLog = logsForDay.reduce((max: any, current: any) => {
      return current.reps > max.reps ? current : max;
    }, logsForDay[0]);
    maxRepsLogs.push(maxRepsLog);

    // Calculate max 1RM log (using the Epley formula)
    const max1RMLog = logsForDay.reduce((max: any, current: any) => {
      const current1RM = calculateOneRepMax(current.reps, current.weight); // Epley formula
      const max1RM = calculateOneRepMax(max.reps, max.weight);
      return current1RM > max1RM ? current : max;
    }, logsForDay[0]);
    max1RMLogs.push(max1RMLog);
  });

  return { maxWeightLogs, maxRepsLogs, max1RMLogs };
}

type Log = typeof logsTable.$inferSelect

export function reduceLogs(logs: typeof logsTable.$inferSelect[], maxLogs: number = 40,
  comapreMax: (accumulator: Log, current: Log) => Log,
  comapreMin: (accumulator: Log, current: Log) => Log,
)
  : typeof logsTable.$inferSelect[] {
  if (logs.length <= maxLogs) {
    return logs; // Return the original list if it's already small enough
  }

  const reducedLogs: typeof logsTable.$inferSelect[] = [];

  // 1. Add the first log
  reducedLogs.push(logs[0]);

  // 2. Add the last log if it's not the same as the first log
  if (logs[logs.length - 1] !== logs[0]) {
    reducedLogs.push(logs[logs.length - 1]);
  }

  // 3. Add the log with the max weight (if it's not already in the list)
  const maxWeightLog = logs.reduce(comapreMax, logs[0]);
  if (!reducedLogs.includes(maxWeightLog)) {
    reducedLogs.push(maxWeightLog);
  }

  // 4. Add the log with the min weight (if it's not already in the list)
  const minWeightLog = logs.reduce(comapreMin, logs[0]);
  if (!reducedLogs.includes(minWeightLog)) {
    reducedLogs.push(minWeightLog);
  }

  // 5. Add evenly spaced logs between the first and last logs (excluding max/min weight logs)
  const interval = Math.floor(logs.length / (maxLogs - reducedLogs.length)); // Leave space for the key logs
  for (let i = 1; i < logs.length - 1; i += interval) {
    const currentLog = logs[i];
    if (!reducedLogs.includes(currentLog)) {
      reducedLogs.push(currentLog);
    }
  }

  return reducedLogs.sort((a, b) => a.date - b.date);
}

