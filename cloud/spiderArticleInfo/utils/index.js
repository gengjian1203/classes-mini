/**
 * 获取指定时间字符串
 * @param date Date();
 * @return
 */
function getStringDate(date = new Date()) {
  const YYYY = String(date.getFullYear());
  const MM = String(date.getMonth() + 1).padStart(2, "0");
  const DD = String(date.getDate()).padStart(2, "0");
  const hh = String(date.getHours()).padStart(2, "0");
  const mm = String(date.getMinutes()).padStart(2, "0");
  const ss = String(date.getSeconds()).padStart(2, "0");

  const timeString = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  const monthString = `${YYYY}-${MM}`;
  const dayString = `${YYYY}-${MM}-${DD}`;
  // console.log("getStringDate", dayString);

  return {
    date,
    YYYY,
    MM,
    DD,
    hh,
    mm,
    ss,
    timeString: timeString,
    monthString: monthString,
    dayString: dayString,
  };
}

module.exports = { getStringDate };
