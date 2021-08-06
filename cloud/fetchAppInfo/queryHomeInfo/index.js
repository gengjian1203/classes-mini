/**
 * queryHomeInfo
 * 查询天气相关信息
 * @param {*} data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryHomeInfo(data, db, memberId) {
  const { month = "none" } = data;
  const _ = db.command;
  const date = new Date();
  const timestamp = date.getTime();
  console.log("queryHomeInfo timestamp", timestamp);

  let objResult = {};
  let taskInfo = {};
  let weatherInfoMonth = {};
  let warningInfo = {};

  // 查询当月气象信息
  try {
    taskInfo = await db
      .collection("TB_TASK")
      .aggregate()
      .where({
        fxDate: db.RegExp({
          regexp: `[\s\S]*-${month}-[\s\S]*`,
          options: "i",
        }),
      })
      .limit(100)
      .lookup({
        from: "TB_WORKER",
        localField: "workerId",
        foreignField: "authors",
        as: "publishedBooks",
      })
      .end();
    // console.log("query taskInfo", taskInfo);
  } catch (e) {
    // 没有查到。异常。
    taskInfo = {
      ...e,
    };
    console.error("query taskInfo error", e);
  }

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
    // console.log("query weatherInfoMonth", weatherInfoMonth);
  } catch (e) {
    // 没有查到。异常。
    weatherInfoMonth = {
      ...e,
    };
    console.error("query weatherInfoMonth error", e);
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
    // console.log("query warningInfo", warningInfo);
  } catch (e) {
    // 没有查到。异常。
    warningInfo = {
      ...e,
    };
    console.error("query warningInfo error", e);
  }

  objResult = {
    taskInfo,
    weatherInfoMonth,
    warningInfo,
  };

  console.log("queryHomeInfo objResult", objResult);
  return objResult;
}

module.exports = queryHomeInfo;
