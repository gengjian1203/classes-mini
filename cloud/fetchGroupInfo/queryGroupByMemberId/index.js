/**
 * queryGroupByMemberId
 * 通过MemberId查询班级列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 20;

async function queryGroupByMemberId(data, db, strMemberId) {
  let objResult = {};

  const { pageNum = 0, pageSize = MAX_LIMIT, memberId = strMemberId } = data;
  const _ = db.command;
  const where = db.collection("TB_GROUP").where(
    _.or([
      {
        expandArrMasterList: _.in([memberId]),
      },
      {
        expandArrAdminList: _.in([memberId]),
      },
      {
        expandArrStudentList: _.in([memberId]),
      },
      {
        expandArrMemberList: _.in([memberId]),
      },
    ])
  );

  console.log("queryGroupByMemberId param data", pageNum, pageSize, memberId);

  const [resDataList, resTotal] = await Promise.all([
    where
      .orderBy("sysCreateDate", "desc")
      .skip(pageNum * pageSize)
      .limit(pageSize)
      .get(),
    where.orderBy("sysCreateDate", "desc").count(),
  ]);

  console.log("queryGroupByMemberId resTotal", resTotal);

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

module.exports = queryGroupByMemberId;
