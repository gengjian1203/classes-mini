/**
 * updateMemberInfo
 * 更新用户信息
 * @param {*} data
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function updateMemberInfo(data, db, strMemberId) {
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
    // 更新收藏信息
    const resUpdate = await db
      .collection("TB_MEMBER")
      .doc(strMemberId)
      .update({
        data: {
          ...data,
          sysUpdateDate: date, // 修改时间
          sysUpdateTime: time, // 修改时间
        },
      });
    console.log("updateMemberInfo", resUpdate);
    const resGet = await db.collection("TB_MEMBER").doc(strMemberId).get();

    objResult = resGet;
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("updateMemberInfo error", e);
  }

  try {
    if (objResult && objResult.data && objResult.data.appBindWorkerId) {
      const objWorker = await db
        .collection("TB_WORKER")
        .doc(objResult.data.appBindWorkerId)
        .get();
      objResult.data.objWorker = objWorker.data;
    }
  } catch (e) {
    objResult.data.appBindWorkerId = "";
    db.collection("TB_MEMBER")
      .doc(strMemberId)
      .update({
        data: {
          appBindWorkerId: "",
        },
      });
    // 没有查到。异常。
    console.error("queryWorkerInfo error", e);
  }

  return objResult;
}

module.exports = updateMemberInfo;
