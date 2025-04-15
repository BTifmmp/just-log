export type DistributionRow = {
  percentage: number;
  weight: number;
  reps: number
}

// Modified Epley formula to start from 1 rep
export function calculateOneRepMax(reps: number, weight: number) {
  return weight * (1 + (reps - 1) / 30);  // Subtract 1 from reps so 1 rep gives correct max
}

// Modified array calculation for one-rep max distribution, starting from 1 rep
export function calculateOneRepMaxArray(reps: number, weight: number, numberOfWeights: number, percentageStep: number) {
  const max = calculateOneRepMax(reps, weight);
  const getReps = (weight: number) => (30 * ((max / weight) - 1)) + 1;

  const arr: Array<DistributionRow> = Array.from({ length: numberOfWeights }, (_, index) => {
    const percentage = 100 - index * percentageStep;
    const weight = Number((percentage / 100 * max).toFixed(1));
    const reps = Number(getReps(Number((weight).toFixed(1))).toFixed(1));
    return ({
      percentage: percentage,
      weight: weight,
      reps: reps,
    })
  })

  return arr;
}

// Modified array calculation for one-rep max distribution with full reps, starting from 1 rep
export function calculateOneRepMaxArrayFullReps(reps: number, weight: number, numberOfWeights: number, percentageStep: number) {
  const max = calculateOneRepMax(reps, weight);
  const getWeight = (reps: number) => Number((max / (1 + ((reps - 1) / 30))).toFixed(1));  // Subtract 1 from reps
  const repsValues = [1, 2, 3, 4, 5, 6, 8, 10, 12, 14, 16, 18, 20, 25, 30, 35, 40, 45, 50, 60].slice(0, numberOfWeights);

  const arr: Array<DistributionRow> = repsValues.map((reps, index) => {
    const weight = Number((getWeight(reps)).toFixed(1));
    const percentage = Number((weight / max * 100).toFixed(1));
    return ({
      percentage: percentage,
      weight: weight,
      reps: reps,
    })
  })

  return arr;
};
