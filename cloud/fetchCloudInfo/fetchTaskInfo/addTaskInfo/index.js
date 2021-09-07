const Utils = require("../../utils/index.js");

/**
 * addTaskInfo
 * 新增任务信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function addTaskInfo(data, db, strMemberId) {
  let objResult = {};
  const dateNow = Utils.getStringDate(new Date());

  const dataSave = {
    fxDate: data.fxDate, // 时间
    [data.keyName || "arrDefault"]: [
      ...data.arrData.map((item, index) => {
        return {
          ...item,
          updateDate: dateNow.date,
          updateTimeString: dateNow.timeString,
          updateDayString: dateNow.dayString,
        };
      }),
    ],
  };
  // console.log("dataSave", dataSave);

  try {
    const res = await db
      .collection("TB_TASK")
      .where({
        fxDate: data.fxDate, // 时间
      })
      .get();

    if (res && res.data && res.data.length > 0) {
      const { _id, ...dataOld } = res.data[0];
      // console.log("dataOld", _id, dataOld);
      // 有则直接更新
      await db
        .collection("TB_TASK")
        .doc(_id)
        .update({ data: { ...dataOld, ...dataSave } });
      // console.log("5. updateWarningInfo update", item);
    } else {
      // 没有直接添加
      await db.collection("TB_TASK").add({ data: dataSave });
      // console.log("5. updateWarningInfo add", item);
    }
  } catch (e) {
    console.error("addTaskInfo error", e);
  }

  return objResult;
}

module.exports = addTaskInfo;
