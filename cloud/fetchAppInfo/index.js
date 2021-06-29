// 云函数入口文件
const cloud = require("wx-server-sdk");
const queryAppTabBar = require("queryAppTabBar/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // API 调用都保持和云函数当前所在环境一致
});

const objFunction = {
  QUERY_APP_TAB_BAR: queryAppTabBar // 查询APP级别底部导航
};

/**
 * 用以处理APP级相关接口
 * @param {*} event
 * @param {*} context
 */
exports.main = async (event, context) => {
  const { type, data } = event;
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();

  const db = cloud.database();
  const memberId = `mem-${OPENID}`;
  console.log("请求人:", memberId, type);

  let objResult = await objFunction[type](data, db, memberId);

  return objResult;
};
