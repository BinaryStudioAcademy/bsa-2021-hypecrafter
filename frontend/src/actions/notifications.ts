import { createRoutine } from 'redux-saga-routines';
import { NotificationType } from '../common/types';

export enum NotificationsActions {
  SET_NOTIFICATION_IS_READ = 'SET_NOTIFICATION_IS_READ',
  SET_NEW_NOTIFICATION = 'SET_NEW_NOTIFICATION',
  GET_NOTIFICATIONS = 'GET_NOTIFICATIONS'
}

export const setNewNotificationsAction = createRoutine(NotificationsActions.SET_NEW_NOTIFICATION, {
  trigger: (action: NotificationType) => action,
});

export const setNotificationIsReadAction = createRoutine(NotificationsActions.SET_NOTIFICATION_IS_READ, {
  trigger: (id: string) => id,
  success: (id: string) => id,
  failure: () => undefined
});

export const getNotificationsAction = createRoutine(NotificationsActions.GET_NOTIFICATIONS, {
  trigger: (id: string) => id,
  success: (notifications: Array<NotificationType>) => notifications,
  failure: () => undefined
});

export type SetNewNotificationsTriggerActionType = ReturnType<typeof setNewNotificationsAction.trigger>;

export type SetNotificationIsReadTriggerActionType = ReturnType<typeof setNotificationIsReadAction.trigger>;
export type SetNotificationIsReadSuccessActionType = ReturnType<typeof setNotificationIsReadAction.success>;
export type SetNotificationIsReadFailureActionType = ReturnType<typeof setNotificationIsReadAction.failure>;

export type GetNotificationsTriggerActionType = ReturnType<typeof getNotificationsAction.trigger>;
export type GetNotificationsSuccessActionType = ReturnType<typeof getNotificationsAction.success>;
export type GetNotificationsFailureActionType = ReturnType<typeof getNotificationsAction.failure>;
