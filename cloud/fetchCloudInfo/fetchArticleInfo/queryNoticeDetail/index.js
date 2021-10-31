const Utils = require("../../utils/index.js");

/**
 * queryNoticeDetail
 * 查询资讯文章详细内容
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryNoticeDetail(data, db, strMemberId) {
  let objResult = {};
  const { articleId = "" } = data || {};

  try {
    objResult = await db.collection("TB_NOTICE").doc(articleId).get();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("queryNoticeDetail error", e);
  }

  return objResult;
}

module.exports = queryNoticeDetail;
