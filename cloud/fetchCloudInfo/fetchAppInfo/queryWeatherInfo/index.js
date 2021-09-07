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
  const _ = db.command;
  const date = new Date();
  const timestamp = date.getTime();
  // console.log("queryWeatherInfo timestamp", timestamp);

  let objResult = {};
  let weatherInfoMonth = {};
  let warningInfo = {};
  // 查询当月气象信息
  try {
    weatherInfoMonth = await db
      .collection("TB_WEATHER_NORMAL")
      .where({
        fxDate: db.RegExp({
          regexp: `[\s\S]*-${month}-[\s\S]*`,
          options: "i",
        }),
      })
      .limit(100)
      .get();
    // console.log("queryWeatherInfo", weatherInfoMonth);
  } catch (e) {
    // 没有查到。异常。
    weatherInfoMonth = {
      ...e,
    };
    console.error("queryWeatherInfo error", e);
  }
  // 查询当前告警情况
  try {
    warningInfo = await db
      .collection("TB_WEATHER_WARNING")
      .where(
        _.and([
          { timestampStartTime: _.lt(timestamp) },
          { timestampEndTime: _.gt(timestamp) },
          // { _id: _.exists(true) },
        ])
      )
      .get();
    // console.log("queryWarningInfo", warningInfo);
  } catch (e) {
    // 没有查到。异常。
    warningInfo = {
      ...e,
    };
    console.error("queryWarningInfo error", e);
  }

  objResult = {
    weatherInfoMonth,
    warningInfo,
  };

  return objResult;
}

module.exports = queryWeatherInfo;
