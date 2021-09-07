/**
 * createQRCode
 * 新增二维码信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @param {*} strMemberId
 * @returns
 */

const getNowTime = () => {
  const date = new Date();
  const YYYY = date.getFullYear();
  const MM = date.getMonth() + 1;
  const DD = date.getDate();
  const hh = date.getHours();
  const mm = date.getMinutes();
  const ss = date.getSeconds();
  const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
  return {
    timeDate: date,
    timeSimple: time,
    timeStampTime: date.getTime(),
  };
};

async function createQRCode(data, db, strMemberId, cloud) {
  console.log("createQRCode", data);
  let objResult = {};
  let objQRCodeInfo;
  let strId = "";
  let strCloudPath = "";
  try {
    objQRCodeInfo = await db
      .collection("TB_QRCODE")
      .where({
        sharePathFull: data.sharePathFull,
      })
      .get();
  } catch (e) {
    console.error("createQRCode error", e);
  }

  console.log("createQRCode.objQRCodeInfo.", objQRCodeInfo);
  const isOldQRCode = objQRCodeInfo.data[0] && objQRCodeInfo.data[0]._id;

  if (isOldQRCode) {
    // 已经生成过二维码
    strId = objQRCodeInfo.data[0]._id;
    strCloudPath = `qrcode/${strId}.jpg`;
  } else {
    try {
      const time = getNowTime();
      // 尚未生成过
      const objQRCode = {
        ...data,
        ...time,
      };
      const res = await db.collection("TB_QRCODE").add({ data: objQRCode });
      console.log("addQRCode", res);
      strId = res._id;
      strCloudPath = `qrcode/${strId}.jpg`;
    } catch (e) {
      console.error("addQRCode error", e);
    }
    if (strCloudPath) {
      // try {
      console.log("getUnlimited start.", strCloudPath, strId);
      // 获取二维码
      const res = await cloud.openapi.wxacode.getUnlimited({
        scene: strId,
        width: 280,
        isHyaline: false,
      });
      console.log("getUnlimited res", res);
      // 上传云存储
      const resUpLoadFile = await cloud.uploadFile({
        cloudPath: strCloudPath,
        fileContent: res.buffer, //处理buffer 二进制数据
      });
      console.log("uploadFile res", resUpLoadFile);
      // } catch (e) {
      //   console.error("getUnlimited error", e);
      // }
    }
  }

  objResult = {
    code: 200,
    data: { strQRCodeFileId: strCloudPath },
  };

  return objResult;
}

module.exports = createQRCode;
