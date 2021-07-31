/**
 * 从日期字符串中提取出来月份
 * @param dayString
 * @returns
 */
export const getMonthFromDayString = (dayString: string) => {
  const arrDate = dayString.split("-");
  const month = arrDate[1];
  return month;
};

export default {
  getMonthFromDayString,
};
