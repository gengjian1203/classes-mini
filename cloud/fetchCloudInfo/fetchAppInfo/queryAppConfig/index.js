/**
 * queryAppConfig
 * 查询APP级别相关配置
 * @param {
 *  appId: string
 * } data
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryAppConfig(data, db, memberId) {
  const { appId = "" } = data;
  const objResult = await db.collection("TB_APP_CONFIG").doc(appId).get();
  return objResult;
}

module.exports = queryAppConfig;
