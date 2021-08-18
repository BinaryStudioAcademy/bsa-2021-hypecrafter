export const calcDonationProgress = (donated: number, goal: number) => Math.floor((donated / goal) * 100);

export const calcDaysToGo = (finishDateObj: Date) => {
  const daysToGo = Math.ceil((finishDateObj.getTime() - Date.now()) / (1000 * 3600 * 24));
  return daysToGo;
};
