/**
 * queryWorkerInfo
 * 查询跟 WorkerInfo 相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryWorkerInfo(data, db, strMemberId) {
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;

  let objResult = {};

  try {
    objResult = await db.collection("TB_WORKER").doc(data._id).get();
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
