import { NotificationMessageTypes } from '../../enums/notifications';

export interface NotificationData {
  user?: NotificationLink;
  project: NotificationLink;
  messageDate: string;
  donation?: number;
}

export interface NotificationType {
  data: NotificationData;
  type: NotificationMessageTypes;
  id?: string;
}

export interface NotificationLink {
  name: string;
  link: string;
}
