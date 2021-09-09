export const dataToScheduleForm = (data: Date) => {
  const minute = data.getMinutes();
  const hour = data.getHours();
  const day = data.getDate();
  const month = data.getMonth() + 1;

  return `${minute} ${hour} ${day} ${month} *`;
};
