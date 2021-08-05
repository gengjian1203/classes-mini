/**
 * queryMemberInfo
 * 查询跟 MemberInfo 相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryMemberInfo(data, db, strMemberId) {
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
    objResult = await db.collection("TB_MEMBER").doc(strMemberId).get();
    db.collection("TB_MEMBER")
      .doc(strMemberId)
      .update({
        data: {
          sysCountLogin: objResult.data.sysCountLogin + 1,
          sysLoginDate: date, // 登录时间
          sysLoginTime: time, // 登录时间
        },
      });
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      ...e,
    };
    console.error("queryMemberInfo error", e);
  }

  return objResult;
}

module.exports = queryMemberInfo;
