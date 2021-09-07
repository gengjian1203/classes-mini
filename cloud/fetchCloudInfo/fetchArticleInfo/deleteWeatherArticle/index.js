const Utils = require("../../utils/index.js");

/**
 * deleteWeatherArticle
 * 删除对应天气文章
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function deleteWeatherArticle(data, db, strMemberId) {
  let objResult = {};
  const { articleId = "" } = data || {};

  try {
    objResult = await db
      .collection("TB_WEATHER_ARTICLE")
      .doc(articleId)
      .remove();
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("queryMemberInfo error", e);
  }

  return objResult;
}

module.exports = deleteWeatherArticle;
