import { calculateOneRepMax } from "./one_rep_calc";

type Log = {
  reps: number;
  weight: number;
  date: number; // Unix timestamp
};

export type ExerciseStats = {
  maxWeight: number;
  maxReps: number;
  estimated1RM: number;
  maxDayVolume: number;
  totalWeight: number;
  totalReps: number;
  totalLogs: number;
  latestWeight: number;
  latestReps: number;
  latestDate: number;
};

export function getStats(logs: Log[]): ExerciseStats {
  let maxWeight = 0;
  let maxReps = 0;
  let estimated1RM = 0;
  let totalWeight = 0;
  let totalReps = 0;
  let totalLogs = logs.length;
  let dailyVolumes: Record<string, number> = {};

  let latestDate = -1;
  let latestWeight = 0;
  let latestReps = 0;

  for (const log of logs) {
    const { reps, weight, date } = log;
    const volume = reps * weight;
    const oneRM = calculateOneRepMax(reps, weight)

    if (weight > maxWeight) maxWeight = weight;
    if (reps > maxReps) maxReps = reps;
    if (oneRM > estimated1RM) estimated1RM = oneRM;

    totalWeight += weight * reps;
    totalReps += reps;

    const day = new Date(date).toDateString(); // normalize to daily key
    dailyVolumes[day] = (dailyVolumes[day] || 0) + volume;

    if (date > latestDate) {
      latestDate = date;
      latestWeight = weight;
      latestReps = reps;
    }
  }

  const maxDayVolume = Math.max(...Object.values(dailyVolumes), 0);

  return {
    maxWeight,
    maxReps,
    estimated1RM: Math.round(estimated1RM),
    maxDayVolume,
    totalWeight,
    totalReps,
    totalLogs,
    latestWeight,
    latestReps,
    latestDate,
  };
};
