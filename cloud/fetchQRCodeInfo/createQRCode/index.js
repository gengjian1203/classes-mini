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
  return time;
};

async function createQRCode(data, db, cloud, strMemberId) {
  let objResult = {};
  let objQRCodeInfo;
  let strId = "";
  try {
    objQRCodeInfo = await db
      .collection("TB_QRCODE")
      .where({
        strSharePath: data.strSharePath
      })
      .get();
  } catch (e) {
    console.error("createQRCode error", e);
  }

  // console.log('createQRCode.objQRCodeInfo.', objQRCodeInfo)
  const isOldQRCode = objQRCodeInfo.data[0] && objQRCodeInfo.data[0]._id;

  if (isOldQRCode) {
    // 已经生成过二维码
    strId = objQRCodeInfo.data[0]._id;
  } else {
    try {
      // 尚未生成过
      const objQRCode = {
        ...data,
        strMemberId,
        strTime: getNowTime()
      };
      const res = await db.collection("TB_QRCODE").add({ data: objQRCode });
      // console.log('addQRCode', res)
      strId = res._id;
    } catch (e) {
      console.error("addQRCode error", e);
    }
  }

  console.log("createQRCode.strId.", strId);
  const strCloudPath = `qrcode/${strId}.jpg`;

  // if (!isOldQRCode) {
  try {
    // 获取二维码
    const res = await cloud.openapi.wxacode.getUnlimited({
      scene: strId,
      width: 280,
      isHyaline: true
    });
    // 上传云存储
    await cloud.uploadFile({
      cloudPath: strCloudPath,
      fileContent: res.buffer //处理buffer 二进制数据
    });
  } catch (e) {
    console.error("getUnlimited error", e);
  }
  // }

  objResult = {
    code: 200,
    data: { strQRCodeFileId: strCloudPath }
  };

  return objResult;
}

module.exports = createQRCode;
