/**
 * checkText
 * 校验文字的敏感信息
 * @param {*} data
 * @param {*} cloud
 * @returns
 */

async function checkText(data, db, memberId, cloud) {
  let objResult = {};

  const res = await cloud.openapi.security.imgSecCheck({
    media: {
      content: data.value,
    },
  });
  console.log("checkText", res);
  return objResult;
}

module.exports = checkText;
