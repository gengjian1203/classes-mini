/**
 * queryWorkerInfo
 * 查询跟 WorkerInfo 相关的信息
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 100;

async function queryWorkerInfo(data, db, strMemberId) {
  const _ = db.command;
  let objResult = {};

  // 先取出集合记录总数
  const countResult = await db.collection("TB_WORKER").count();
  const total = countResult.total;
  // 计算需分几次取
  const batchTimes = Math.ceil(total / MAX_LIMIT);
  // 承载所有读操作的 promise 的数组
  const arrPromiseAll = [];
  for (let i = 0; i < batchTimes; i++) {
    const promise = db
      .collection("TB_WORKER")
      .where({
        _id: _.in(data.arrId),
      })
      .skip(i * MAX_LIMIT)
      .limit(MAX_LIMIT)
      .get();
    arrPromiseAll.push(promise);
  }
  // 等待所有
  objResult = (await Promise.all(arrPromiseAll)).reduce((acc, cur) => {
    console.log("queryWorkerInfo", cur);
    return {
      data: acc.data.concat(cur.data),
      errMsg: acc.errMsg,
    };
  });

  return objResult;
}

module.exports = queryWorkerInfo;
