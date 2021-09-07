// 云函数入口文件
const cloud = require("wx-server-sdk");
const md5 = require("blueimp-md5");
const addTaskInfo = require("addTaskInfo/index.js");
const queryTaskInfo = require("queryTaskInfo/index.js");
const updateTaskInfo = require("updateTaskInfo/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
});

const objFunction = {
  ADD_TASK: addTaskInfo, // 新增任务
  QUERY_TASK: queryTaskInfo, // 查询任务
  UPDATE_TASK: updateTaskInfo, // 更新任务
};

const verifyRequest = (event) => {
  const keyToken = "I, have 187076081 dream!";
  const { keyTime, keySecret, type, data } = event;
  const keySecretLocal = md5(`${keyTime}${type}${keyToken}${data}`);
  // console.log("verifyRequest", keyToken, keyTime, type);
  // console.log("verifyRequest", keyTime, keySecret, keySecretLocal);
  return keyTime && keySecret && keySecretLocal === keySecret;
};

/**
 * fetchTaskInfo
 * 处理跟 TaskInfo 相关的信息
 * @param {*} event
 * @param {*} context
 * @returns
 */
// 云函数入口函数
exports.main = async (event, context) => {
  const { type, data } = event;
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();

  let objResult = {};
  if (verifyRequest(event)) {
    const db = cloud.database();
    const memberId = `mem-${OPENID}`;
    console.log("请求人:", memberId, type);
    if (objFunction[type]) {
      objResult = await objFunction[type](data, db, memberId);
    } else {
      objResult = { code: 500004, msg: "该接口函数未定义" };
    }
  } else {
    objResult = { code: 500001, msg: "密令校验非法" };
  }

  const code = objResult.errCode || objResult.code;
  objResult.code = code ? code : 200;

  return objResult;
};
