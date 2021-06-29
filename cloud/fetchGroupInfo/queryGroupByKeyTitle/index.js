/**
 * queryGroupByKeyTitle
 * 通过关键字查询班级列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 20;

async function queryGroupByKeyTitle(data, db, strMemberId) {
  let objResult = {};

  const { pageNum = 0, pageSize = MAX_LIMIT, keyTitle = "" } = data;
  const where = db.collection("TB_GROUP").where({
    dataTitle: db.RegExp({
      regexp: `[\s\S]*${keyTitle}[\s\S]*`,
      options: "i",
    }),
  });

  console.log("queryGroupByKeyTitle param data", pageNum, pageSize, keyTitle);

  const [resDataList, resTotal] = await Promise.all([
    where
      .orderBy("sysCreateDate", "desc")
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .get(),
    where.orderBy("sysCreateDate", "desc").count(),
  ]);

  console.log("queryGroupByKeyTitle resTotal", resTotal);

  try {
    objResult = {
      data: {
        dataList: resDataList.data,
        totalCount: resTotal.total,
      },
    };
  } catch (e) {
    // 没有查到。异常。
    objResult = {
      data: e,
    };
    console.error("queryGroup error", e);
  }

  return objResult;
}

module.exports = queryGroupByKeyTitle;
