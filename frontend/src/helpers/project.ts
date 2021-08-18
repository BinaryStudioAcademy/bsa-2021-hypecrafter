export const calcDonationProgress = (donated: number, goal: number) => Math.floor((donated / goal) * 100);

export const calcDaysToGo = (finishDate: string) => {
  const finishDateObj = new Date(finishDate);
  const daysToGo = Math.ceil((finishDateObj.getTime() - Date.now()) / (1000 * 3600 * 24));
  return daysToGo;
};
