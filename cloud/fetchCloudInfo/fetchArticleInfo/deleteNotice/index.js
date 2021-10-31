const Utils = require("../../utils/index.js");

/**
 * deleteNotice
 * 删除对应资讯文章
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function deleteNotice(data, db, strMemberId) {
  let objResult = {};
  const { articleId = "" } = data || {};

  try {
    objResult = await db.collection("TB_NOTICE").doc(articleId).remove();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("deleteNotice error", e);
  }

  return objResult;
}

module.exports = deleteNotice;
