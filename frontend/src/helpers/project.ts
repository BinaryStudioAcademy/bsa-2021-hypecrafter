export const calcDonationProgress = (donated: number, goal: number) => Math.floor((donated / goal) * 100);
