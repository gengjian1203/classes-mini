// 云函数入口文件
const cloud = require("wx-server-sdk");
const md5 = require("blueimp-md5");
const createQRCode = require("createQRCode/index.js");
const queryQRCode = require("queryQRCode/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
});

const objFunction = {
  CREATE_QRCODE: createQRCode, // 创建二维码
  QUERY_QRCODE: queryQRCode, // 查询二维码
};

const verifyRequest = (event) => {
  const keyToken = "I have a dream";
  const { keyTime, keySecret, type } = event;
  const keySecretLocal = md5(`${keyToken}${keyTime}${type}`);
  // console.log("verifyRequest", keyToken, keyTime, type);
  // console.log("verifyRequest", keyTime, keySecret, keySecretLocal);
  return keyTime && keySecret && keySecretLocal === keySecret;
};

/**
 * fetchQRCodeInfo
 * 处理跟 二维码 相关的信息
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
    objResult = await objFunction[type](data, db, memberId);
  } else {
    objResult = {
      data: "密令校验非法",
    };
  }

  return objResult;
};
