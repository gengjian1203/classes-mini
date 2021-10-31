const Utils = require("../../utils/index.js");

/**
 * queryZhiHuDetail
 * 查询知乎文章详细内容
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryZhiHuDetail(data, db, strMemberId) {
  let objResult = {};
  const { articleId = "" } = data || {};

  try {
    objResult = await db.collection("TB_ZHIHU").doc(articleId).get();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("queryMemberInfo error", e);
  }

  return objResult;
}

module.exports = queryZhiHuDetail;
