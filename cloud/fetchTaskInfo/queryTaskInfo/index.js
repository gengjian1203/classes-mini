/**
 * queryTaskInfo
 * 查询跟 TaskInfo 相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryTaskInfo(data, db, strMemberId) {
  let objResult = {};

  try {
    objResult = await db.collection("TB_TASK").doc(data._id).get();
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("queryTaskInfo error", e);
  }

  return objResult;
}

module.exports = queryTaskInfo;
