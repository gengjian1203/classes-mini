/**
 * queryMemberList
 * 分页查询员工列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 33;

async function queryMemberList(data, db, strMemberId) {
  let objResult = {};

  const { pageNum = 0, pageSize = MAX_LIMIT, name = "" } = data;
  console.log("queryMemberList param data", pageNum, pageSize, name);
  const rule = {
    userNickName: db.RegExp({
      regexp: `[\s\S]*${name}[\s\S]*`,
      options: "i",
    }),
  };

  const [resDataList, resTotal] = await Promise.all([
    db
      .collection("TB_MEMBER")
      .aggregate()
      .match(rule)
      .sort({ sysCreateDate: 1 })
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .project({
        _id: true,
        appBindWorkerId: true,
        userAvatarUrl: true,
        userGender: true,
        userNickName: true,
      })
      .lookup({
        from: "TB_WORKER",
        localField: "appBindWorkerId",
        foreignField: "_id",
        as: "arrWorkerInfo",
      })
      .end(),
    db.collection("TB_MEMBER").where(rule).count(),
  ]);

  console.log("queryMemberList resTotal", resDataList);

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

module.exports = queryMemberList;
