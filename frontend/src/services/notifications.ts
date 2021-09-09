import { api } from '../helpers/http';

export const setNotificationIsRead = async (id: string) => {
  await api.put({ url: `notifications/${id}`, params: { isRead: true } });

  return { id };
};

export const getNotifications = async (id: string) => {
  const notifications = await api.get({ url: 'notifications', params: { id } });

  return notifications;
};
