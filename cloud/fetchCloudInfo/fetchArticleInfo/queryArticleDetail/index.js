const Utils = require("../../utils/index.js");

/**
 * queryArticleDetail
 * 查询资讯文章详细内容
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryArticleDetail(data, db, strMemberId) {
  let objResult = {};
  const { articleId = "" } = data || {};

  try {
    objResult = await db.collection("TB_ARTICLE").doc(articleId).get();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("queryMemberInfo error", e);
  }

  return objResult;
}

module.exports = queryArticleDetail;
