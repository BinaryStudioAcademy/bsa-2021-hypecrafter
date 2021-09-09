import { NotificationDataToMap } from '../common/types';

export const getDataToSend = (data: NotificationDataToMap) => {
  const { type,
    userName,
    projectName,
    createdAt: messageDate,
    amount: donation,
    id,
    projectId,
    userId: userIdData
  } = data;

  return {
    type,
    data: {
      user: {
        name: userName,
        link: userIdData
      },
      project: {
        name: projectName,
        link: projectId
      },
      messageDate,
      donation
    },
    id,
    isRead: false
  };
};

