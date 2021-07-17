// 云函数入口文件
const cloud = require("wx-server-sdk");
const md5 = require("blueimp-md5");
const addGroup = require("addGroup/index.js");
const queryGroupByKeyTitle = require("queryGroupByKeyTitle/index.js");
const queryGroupByMemberId = require("queryGroupByMemberId/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
});

const objFunction = {
  ADD_GROUP: addGroup, // 新建班级
  QUERY_GROUP_BY_KEY_TITLE: queryGroupByKeyTitle, // 通过关键字查询班级列表
  QUERY_GROUP_BY_MEMBER_ID: queryGroupByMemberId, // 通过MemberId查询班级列表
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
 * 用以处理班级的相关接口
 * @param {*} event
 * @param {*} context
 */
exports.main = async (event, context) => {
  const { type, data } = event;
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();

  let objResult = {};
  if (verifyRequest(event)) {
    const db = cloud.database();
    const memberId = `mem-${OPENID}`;
    console.log("请求人:", memberId, type);
    objResult = await objFunction[type](data, db, memberId);
  } else {
    objResult = {
      code: 500001,
      msg: "密令校验非法",
    };
  }

  const code = objResult.errCode || objResult.code;
  objResult.code = code ? code : 200;

  return objResult;
};
