/**
 * 获取当前时间
 * @param
 * @return
 */
export const getNowDate = () => {
  const date = new Date();
  const YYYY = String(date.getFullYear());
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const timeString = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  const todayString = `${YYYY}-${MM}-${DD}`;
  // console.log("getNowDate", todayString);

  return {
    timeString: timeString,
    todayString: todayString,
  };
};

export default getNowDate;