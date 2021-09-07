/**
 * queryQRCode
 * 查询二维码信息
 * @param {*} event
 * @param {*} db
 * @param {*} cloud
 * @returns
 */
async function queryQRCode(data, db, cloud) {
  let objResult = {};

  try {
    objResult = await db.collection("TB_QRCODE").doc(data.scene).get();
  } catch (e) {
    objResult = e;
    console.error("queryQRCode error", e);
  }

  return objResult;
}

module.exports = queryQRCode;
