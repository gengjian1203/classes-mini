const Utils = require("../../utils/index.js");

/**
 * queryNoticeList
 * 查询资讯文章列表内容
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 100; // 每次取100条

async function queryNoticeList(data, db, strMemberId) {
  let objResult = {};
  const { pageNum = 0, pageSize = MAX_LIMIT, tabId = "" } = data || {};

  const [resDataList, resTotal] = await Promise.all([
    db
      .collection("TB_NOTICE")
      .where({
        tabId: tabId,
      })
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
    db
      .collection("TB_NOTICE")
      .where({
        tabId: tabId,
      })
      .count(),
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
    console.error("queryNoticeList error", e);
  }

  return objResult;
}

module.exports = queryNoticeList;
