/**
 * updateWorkerInfo
 * 更新用户信息
 * @param {*} data
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function updateWorkerInfo(data, db, strMemberId) {
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
    // 更新员工信息
    const resUpdate = await db
      .collection("TB_WORKER")
      .doc(data._id)
      .update({
        data: {
          ...data,
          sysUpdateDate: date, // 修改时间
          sysUpdateTime: time, // 修改时间
        },
      });
    console.log("updateWorkerInfo", resUpdate);
    const resGet = await db.collection("TB_WORKER").doc(data._id).get();

    objResult = resGet;
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("updateWorkerInfo error", e);
  }

  return objResult;
}

module.exports = updateWorkerInfo;
