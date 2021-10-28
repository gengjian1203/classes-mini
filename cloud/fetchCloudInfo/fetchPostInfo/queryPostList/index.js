const Utils = require("../../utils/index.js");

/**
 * queryPostList
 * 查询帖子列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 100; // 每次取100条

async function queryPostList(data, db, strMemberId) {
  let objResult = {};
  const { pageNum = 0, pageSize = MAX_LIMIT, tabId = "" } = data || {};

  const [resDataList, resTotal] = await Promise.all([
    db
      .collection("TB_POST")
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
      .collection("TB_POST")
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
    console.error("queryPostList error", e);
  }

  return objResult;
}

module.exports = queryPostList;
