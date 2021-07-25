// 云函数入口文件
const cloud = require("wx-server-sdk");
const md5 = require("blueimp-md5");
const updateWeatherInfo = require("updateWeatherInfo/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
});

const objFunction = {
  UPDATE_WEATHER_INFO: updateWeatherInfo, // 更新天气信息
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
  let { type, data } = event;
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();

  type = "UPDATE_WEATHER_INFO";

  let objResult = {};
  if (true || verifyRequest(event)) {
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
