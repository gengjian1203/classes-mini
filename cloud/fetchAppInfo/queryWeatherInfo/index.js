/**
 * queryWeatherInfo
 * 查询天气相关信息
 * @param {*} data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryWeatherInfo(data, db, memberId) {
  const { month = "none" } = data;

  let objResult = {};

  try {
    objResult = await db
      .collection("TB_WEATHER")
      .where({
        date: db.RegExp({
          regexp: `[\s\S]*-${month}-[\s\S]*`,
          options: "i",
        }),
      })
      .limit(100)
      .get();
    console.log("queryWeatherInfo", objResult);
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("queryWeatherInfo error", e);
  }

  return objResult;
}

module.exports = queryWeatherInfo;
