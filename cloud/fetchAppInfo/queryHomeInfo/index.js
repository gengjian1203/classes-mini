/**
 * queryHomeInfo
 * 查询首页相关信息
 * @param {
 *  month: "2021-08", 查询指定年月的信息
 *  objTaskType: { WEATHER_TIME: true } 返回指定的任务字段
 * } data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

const MAX_LIMIT = 100;

const queryTaskList = async (data, db, month) => {
  const objTaskType = data.objTaskType || {};
  const taskList = await db
    .collection("TB_TASK")
    .where({
      fxDate: db.RegExp({
        regexp: `${month}-[\s\S]*`,
        options: "i",
      }),
    })
    .field({
      _id: true,
      fxDate: true,
      ...objTaskType,
    })
    .limit(MAX_LIMIT)
    .get();
  // console.log("queryTaskList", taskList);
  return taskList;
};

const queryWeatherMonthList = async (data, db, month) => {
  const weatherMonthList = await db
    .collection("TB_WEATHER_NORMAL")
    .where({
      fxDate: db.RegExp({
        regexp: `${month}-[\s\S]*`,
        options: "i",
      }),
    })
    .limit(MAX_LIMIT)
    .get();
  // console.log("queryWeatherMonthList", weatherMonthList);
  return weatherMonthList;
};

const queryWarningList = async (data, db) => {
  const _ = db.command;
  const date = new Date();
  const timestamp = date.getTime();

  const warningList = await db
    .collection("TB_WEATHER_WARNING")
    .where(
      _.and([
        { timestampStartTime: _.lt(timestamp) },
        { timestampEndTime: _.gt(timestamp) },
        // { _id: _.exists(true) },
      ])
    )
    .limit(MAX_LIMIT)
    .get();
  // console.log("queryWarningList", warningList);
  return warningList;
};

async function queryHomeInfo(data, db, memberId) {
  const { month = "none" } = data;
  // console.log("queryHomeInfo timestamp", timestamp);

  let objResult = {};

  const [taskList, weatherMonthList, warningList] = await Promise.all([
    queryTaskList(data, db, month),
    queryWeatherMonthList(data, db, month),
    queryWarningList(data, db),
  ]);

  objResult = {
    taskList,
    weatherMonthList,
    warningList,
  };

  // console.log("queryHomeInfo objResult", objResult);
  return objResult;
}

module.exports = queryHomeInfo;
