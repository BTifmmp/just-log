// Function to convert pounds (lb) to kilograms (kg)
export function lbToKg(pounds: number): number {
  const kilograms = pounds * 0.453592;
  return kilograms;
}

// Function to convert kilograms (kg) to pounds (lb)
export function kgToLb(kilograms: number): number {
  const pounds = kilograms / 0.453592;
  return pounds;
}

export function convertWeight(weight: number, unit: string): number {
  if (unit === 'kg') {
    return Math.round(weight * 100) / 100;
  } else if (unit === 'lb') {
    return Math.round(kgToLb(weight) * 100) / 100;
  } else {
    throw new Error('Invalid weight unit. Use "kg" or "lb".');
  }
}