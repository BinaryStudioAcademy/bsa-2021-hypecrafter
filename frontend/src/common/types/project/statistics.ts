export interface Statistics {
  donations: {
    id: string;
    donated: number;
    donationCreatedAt: Date;
  }[]
  statistics: {
    totalViews: number;
    minutesToRead: number;
    totalInteractionTime: number;
  }
}
