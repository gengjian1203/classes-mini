const Utils = require("../../utils/index.js");

/**
 * deleteZhiHu
 * 删除对应知乎文章
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function deleteZhiHu(data, db, strMemberId) {
  let objResult = {};
  const { articleId = "" } = data || {};

  try {
    objResult = await db.collection("TB_ZHIHU").doc(articleId).remove();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("deleteZhiHu error", e);
  }

  return objResult;
}

module.exports = deleteZhiHu;
