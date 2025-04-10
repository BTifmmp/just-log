const aMen = -216.0475144;
const bMen = 16.2606339;
const cMen = -0.002388645;
const dMen = -0.00113732;
const eMen = 7.01863e-6;
const fMen = -1.291e-8;

const aWomen = 594.31747775582;
const bWomen = -27.23842536447;
const cWomen = 0.82112226871;
const dWomen = -0.00930733913;
const eWomen = 4.731582e-5;
const fWomen = -9.054e-8;


export default function calculateWilksScore(total: number, gender: string, bodyweight: number) {
  if (gender.toLocaleLowerCase() === 'female') {
    const coeff = aWomen + bWomen * bodyweight + cWomen * Math.pow(bodyweight, 2) +
      dWomen * Math.pow(bodyweight, 3) + eWomen * Math.pow(bodyweight, 4) +
      fWomen * Math.pow(bodyweight, 5);
    return (500 / coeff) * total;
  } else {
    const coeff = aMen + bMen * bodyweight + cMen * Math.pow(bodyweight, 2) +
      dMen * Math.pow(bodyweight, 3) + eMen * Math.pow(bodyweight, 4) +
      fMen * Math.pow(bodyweight, 5);
    return (500 / coeff) * total;
  }
}

