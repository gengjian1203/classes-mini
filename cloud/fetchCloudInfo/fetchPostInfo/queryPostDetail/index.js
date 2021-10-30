const Utils = require("../../utils/index.js");

/**
 * queryPostDetail
 * 查询帖子详细内容
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryPostDetail(data, db, strMemberId) {
  let objResult = {};
  const { articleId = "" } = data || {};

  try {
    objResult = await db.collection("TB_POST").doc(articleId).get();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("queryPostDetail error", e);
  }

  return objResult;
}

module.exports = queryPostDetail;
