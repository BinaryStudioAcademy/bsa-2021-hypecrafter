export interface Statistics {
  donations: {
    id: string;
    donated: number;
    donationCreatedAt: Date;
    firstName: string;
    lastName: string;
  }[]
  statistics: {
    totalViews: number;
    minutesToRead: number;
    totalInteractionTime: number;
  }
}
