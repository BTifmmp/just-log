
export type DistributionRow = {
  percentage: number;
  weight: number;
  reps: number
}

export function calculateOneRepMax(reps: number, weight: number) {
  return weight * (36 / (37 - reps));
}


export function calculateOneRepMaxArray(reps: number, weight: number, numberOfWeights: number, percentageStep: number) {
  const max = weight * (36 / (37 - reps))
  const getReps = (weight: number) => Number((37 - (36 * weight / max)).toFixed(1));

  const arr: Array<DistributionRow> = Array.from({ length: numberOfWeights }, (_, index) => {
    const percentage = 100 - index * percentageStep;
    const weight = Number((percentage / 100 * max).toFixed(1));
    const reps = getReps(Number((weight).toFixed(1)));
    return ({
      percentage: percentage,
      weight: weight,
      reps: reps,
    })
  })

  return arr;
}

export function calculateOneRepMaxArrayFullReps(reps: number, weight: number, numberOfWeights: number, percentageStep: number) {
  const max = weight * (36 / (37 - reps))
  const getWeight = (reps: number) => Number((max * (37 - reps) / 36).toFixed(1));
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



