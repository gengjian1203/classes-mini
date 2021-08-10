/**
 * queryWorkerList
 * 分页查询员工列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 20;

async function queryWorkerList(data, db, strMemberId) {
  let objResult = {};

  const { pageNum = 0, pageSize = MAX_LIMIT, tag = "", name = "" } = data;
  console.log("queryWorkerList param data", pageNum, pageSize, name);
  const where = db.collection("TB_WORKER").where({
    name: db.RegExp({
      regexp: `[\s\S]*${name}[\s\S]*`,
      options: "i",
    }),
    tag: tag,
  });

  const [resDataList, resTotal] = await Promise.all([
    where
      .orderBy("nameLetter", "asc")
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .get(),
    where.orderBy("nameLetter", "asc").count(),
  ]);

  console.log("queryWorkerList resTotal", resTotal);

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

module.exports = queryWorkerList;
