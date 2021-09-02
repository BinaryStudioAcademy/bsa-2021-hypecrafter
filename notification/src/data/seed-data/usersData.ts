import { NotificationMessageTypes } from '../../common/enums';

export const notificationData = [
  {
    id: 'c0d08686-1a8c-477f-a8e4-e4facc6f574e',
    type: NotificationMessageTypes.COMMENT,
    userId: 'ac7a5b8f-7fc4-4d1e-81c9-1a9c49c9b529',
    projectId: 'c8bf2182-54a3-4464-9a50-0099ad0ab632'
  },
  {
    id: '596111c3-ce17-421b-8d89-13f4adc459c9',
    type: NotificationMessageTypes.LIKE,
    userId: '95e27387-bf47-46c1-b06d-db6a5629db54',
    projectId: 'c8bf2182-54a3-4464-9a50-0099ad0ab632'
  },
  {
    id: 'b56a588b-ade8-4e6b-854e-ee156cd3a295',
    type: NotificationMessageTypes.DONATE,
    userId: 'eff15a92-fed4-41c8-a8d4-76f837c1892c',
    projectId: 'c8bf2182-54a3-4464-9a50-0099ad0ab632',
    amount: 25
  },
  {
    id: 'c95e44a9-67db-430e-bfee-9834d59be68a',
    type: NotificationMessageTypes.PROJECT_GOAL_ACHIEVED,
    projectId: '4e24a5fd-e5d3-49b1-a8be-21232023601b'
  },
  {
    id: 'a88e0c10-1a5d-4b63-804d-73efc01c5353',
    type: NotificationMessageTypes.PROJECT_TIME_OUT,
    projectId: 'd51adf1a-b777-41c1-8a52-49ec5b652a35'
  }
];
