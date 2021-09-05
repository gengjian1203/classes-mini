const Utils = require("../utils/index.js");

/**
 * queryWeatherArticleListInfo
 * 查询天气文章列表内容
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 100; // 每次取100条

async function queryWeatherArticleListInfo(data, db, strMemberId) {
  let objResult = {};
  const { pageNum = 0, pageSize = MAX_LIMIT } = data || {};

  const [resDataList, resTotal] = await Promise.all([
    db
      .collection("TB_WEATHER_ARTICLE")
      .orderBy("createDate", "desc")
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .field({
        _id: true,
        source: true,
        href: true,
        title: true,
        author: true,
        posterImg: true,
        createDate: true,
        createTime: true,
        arrImages: true,
      })
      .get(),
    db.collection("TB_WEATHER_ARTICLE").count(),
  ]);

  try {
    objResult = {
      data: {
        dataList: resDataList.data,
        totalCount: resTotal.total,
      },
    };
  } catch (e) {
    // 没有查到。异常。
    objResult = { ...e };
    console.error("queryMemberInfo error", e);
  }

  return objResult;
}

module.exports = queryWeatherArticleListInfo;
