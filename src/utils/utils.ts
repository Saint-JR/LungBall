export const calculateLungBallCount = (step: number): number => {
  if (step >= 0 && step < 25) {
    return (100000 / 25) * step;
  }
  if (step >= 25 && step < 50) {
    return ((10000000 - 100000) / 25) * (step - 25) + 100000;
  }
  if (step >= 50 && step < 75) {
    return ((100000000 - 10000000) / 25) * (step - 50) + 10000000;
  }
  if (step >= 75 && step <= 100) {
    return ((300000000 - 100000000) / 25) * (step - 75) + 100000000;
  }

  return 0;
};
