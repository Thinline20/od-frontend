const NOW = new Date();

export const getHour = () => NOW.getHours();
export const getDate = () => NOW.getDate();
export const getDay = () => NOW.getDay();
export const getMonth = () => NOW.getMonth() + 1;
export const getYear = () => NOW.getFullYear();
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

export const getWeek = (date: Date) => {
  const oneJan = new Date(date.getFullYear(), 0, 1);
  const numberOfDays = Math.floor(
    (date.getTime() - oneJan.getTime()) / (24 * 60 * 60 * 1000),
  );
  return Math.ceil((date.getDay() + 1 + numberOfDays) / 7);
};

export const getDateOfWeek = (y: number, w: number) => {
  const d = 1 + (w - 1) * 7; // 1st of January + 7 days for each week

  return new Date(y, 0, d);
};
