const NOW = new Date();

export const getHour = () => NOW.getHours();
export const getDate = () => NOW.getDate();
export const getDay = () => NOW.getDay();
export const getMonth = () => NOW.getMonth() + 1;
export const getWeekStart = () => {
  const date = getDate();
  const day = getDay();
  return new Date(NOW.setDate(date - day));
};
export const getWeekEnd = () => {
  const date = getDate();
  const day = getDay();
  return new Date(NOW.setDate(date + (6 - day)));
};
export const getMonthStart = () => {
  return new Date(NOW.setDate(1));
};
export const getMonthEnd = () => {
  return new Date(NOW.getFullYear(), getMonth(), 0);
};
