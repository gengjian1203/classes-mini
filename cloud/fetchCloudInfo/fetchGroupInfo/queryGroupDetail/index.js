/**
 * queryGroupDetail
 * 通过groupId查询社区详情
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

async function queryGroupDetail(data, db, strMemberId) {
  const { groupId = "" } = data;
  const objResult = await db.collection("TB_GROUP").doc(groupId).get();

  return objResult;
}

module.exports = queryGroupDetail;
