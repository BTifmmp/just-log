
type LogRow = {
  logId: number;
  exerciseId: number | null;
  exerciseName: string | null;
  date: number;
  reps: number;
  weight: number;
};

type GroupedLog = {
  exerciseId: number | null;
  exerciseName: string | null;
  volume: number;
  logs: {
    logId: number;
    reps: number;
    weight: number;
    date: number;
  }[];
};

export function groupLogsByExercise(rows: LogRow[]): GroupedLog[] {
  const map = new Map<number | string, GroupedLog>();

  for (const row of rows) {
    const exerciseId = row.exerciseId ?? 'unknown';

    if (!map.has(exerciseId)) {
      map.set(exerciseId, {
        exerciseId: row.exerciseId,
        exerciseName: row.exerciseName,
        volume: 0,
        logs: [],
      });
    }

    const entry = map.get(exerciseId)!;

    // Add log
    entry.logs.push({
      logId: row.logId,
      reps: row.reps,
      weight: row.weight,
      date: row.date,
    });

    // Update volume (skip if reps/weight are null)
    if (typeof row.reps === 'number' && typeof row.weight === 'number') {
      entry.volume += row.reps * row.weight;
    }
  }

  return Array.from(map.values());
}

export function calculateWorkoutDuration(logs: { date: number }[]): number {
  if (logs.length === 0) return 0;

  // Sort logs by date
  const sortedLogs = [...logs].sort((a, b) => a.date - b.date);

  const THIRTY_MINUTES = 30 * 60 * 1000; // in ms
  let totalDuration = 0;

  for (let i = 1; i < sortedLogs.length; i++) {
    const gap = sortedLogs[i].date - sortedLogs[i - 1].date;

    if (gap <= THIRTY_MINUTES) {
      totalDuration += gap;
    }
  }

  return totalDuration;
}

export function calculateTotalVolume(logs: { reps: number; weight: number }[]): number {
  let totalVolume = 0;

  // Calculate total volume by summing reps * weight for each log
  logs.forEach(log => {
    totalVolume += log.reps * log.weight;
  });

  return totalVolume;
}

export function getDaysInMonth(inputDate: Date) {
  const year = inputDate.getFullYear();
  const month = inputDate.getMonth(); // 0 = January
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const suffix = (d: number) => {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
      case 1: return 'st';
      case 2: return 'nd';
      case 3: return 'rd';
      default: return 'th';
    }
  };

  const monthName = new Intl.DateTimeFormat('en', { month: 'long' }).format(new Date(year, month));

  const days = [];

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month, day);
    date.setHours(0, 0, 0, 0); // Normalize to start of day

    const weekday = new Intl.DateTimeFormat('en', { weekday: 'short' }).format(date);

    days.push({
      day: `${day}${suffix(day)} ${monthName}`,
      weekday,
      startMs: date.getTime(),
    });
  }

  return days;
}
