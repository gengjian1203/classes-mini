// 云函数入口文件
const cloud = require("wx-server-sdk");
const createQRCode = require("createQRCode/index.js");
const queryQRCode = require("queryQRCode/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV // API 调用都保持和云函数当前所在环境一致
});

// 校验返回值
const validResult = objTmp => {
  return objTmp;
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
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();

  let objResult = {};

  const db = cloud.database();
  const strMemberId = `mem-${OPENID}`;
  console.log("请求人:", strMemberId, event.type);
  // console.log('fetchQRCodeInfo.', event.type, event.data)

  switch (event.type) {
    case "CREATE_QRCODE":
      objResult = await createQRCode(event.data, db, cloud, strMemberId);
      break;
    case "QUERY_QRCODE":
      objResult = await queryQRCode(event.data, db, cloud);
      break;
    default:
      break;
  }

  return validResult(objResult);
};
