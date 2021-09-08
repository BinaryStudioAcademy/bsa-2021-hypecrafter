export interface Notification {
  id: string;
  type: string;
  amount: number;
  userId: string;
  projectId: string;
  userName?: string;
  projectName?: string;
  createdAt?: string;
}

export interface NotificationDataToMap extends Notification {
  userName: string;
  projectName: string;
  createdAt: string;
}
