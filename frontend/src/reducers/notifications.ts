import { getNotificationsAction, setNewNotificationsAction, setNotificationIsReadAction } from '../actions';
import type {
  GetNotificationsSuccessActionType, SetNewNotificationsTriggerActionType,
  SetNotificationIsReadSuccessActionType
} from '../actions/notifications';
import { NotificationType } from '../common/types';
import { createReducer } from '../helpers';

export interface NotificationsState{
  isLoading: boolean;
  notifications: NotificationType[];
}

export const initialState: NotificationsState = {
  isLoading: false,
  notifications: []
};

export const notificationsReducer = createReducer<NotificationsState>(initialState, {
  [setNewNotificationsAction.TRIGGER](state, action: SetNewNotificationsTriggerActionType) {
    return {
      ...state,
      notifications: [...state.notifications, action.payload]
    };
  },
  [setNotificationIsReadAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [setNotificationIsReadAction.SUCCESS](state, action: SetNotificationIsReadSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      notifications: state.notifications.map(notification => {
        if (notification.id === action.payload) return { ...notification, isRead: true };
        return notification;
      })
    };
  },
  [setNotificationIsReadAction.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  },
  [getNotificationsAction.TRIGGER](state) {
    return {
      ...state,
      isLoading: true
    };
  },
  [getNotificationsAction.SUCCESS](state, action: GetNotificationsSuccessActionType) {
    return {
      ...state,
      isLoading: false,
      notifications: action.payload
    };
  },
  [setNotificationIsReadAction.FAILURE](state) {
    return {
      ...state,
      isLoading: false
    };
  }
});
export default notificationsReducer;
