/**
 * queryAppTabBar
 * 查询APP级别底部导航
 * @param {*} data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryAppTabBar(data, db, memberId) {
  const objResult = await db.collection("TB_APP_TAB_BAR").limit(100).get();
  return objResult;
}

module.exports = queryAppTabBar;
