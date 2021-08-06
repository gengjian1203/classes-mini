/**
 * queryWorkerInfo
 * 查询跟 WorkerInfo 相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryWorkerInfo(data, db, strMemberId) {
  let objResult = {};

  try {
    objResult = await db
      .collection("TB_WORKER")
      .where({
        _id: _.in(data.arrId),
      })
      .get();
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("queryWorkerInfo error", e);
  }

  return objResult;
}

module.exports = queryWorkerInfo;
