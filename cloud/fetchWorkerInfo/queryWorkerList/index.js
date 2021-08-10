/**
 * queryWorkerList
 * 分页查询员工列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 33;

async function queryWorkerList(data, db, strMemberId) {
  let objResult = {};

  const { pageNum = 0, pageSize = MAX_LIMIT, tag = "", name = "" } = data;
  console.log("queryWorkerList param data", pageNum, pageSize, name);
  const rule = {
    name: db.RegExp({
      regexp: `[\s\S]*${name}[\s\S]*`,
      options: "i",
    }),
    tag: tag,
  };

  const [resDataList, resTotal] = await Promise.all([
    db
      .collection("TB_WORKER")
      .aggregate()
      .match(rule)
      .sort({ nameLetter: 1 })
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .lookup({
        from: "TB_MEMBER",
        localField: "appBindMemberId",
        foreignField: "_id",
        as: "objMemberInfo",
      })
      .end(),
    db.collection("TB_WORKER").where(rule).count(),
  ]);

  console.log("queryWorkerList resTotal", resDataList);

  try {
    objResult = {
      data: {
        dataList: resDataList.list,
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
