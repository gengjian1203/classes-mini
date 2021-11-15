/**
 * checkImage
 * 校验图片的敏感信息
 * @param {*} data
 * @param {*} cloud
 * @returns
 */

async function checkImage(data, db, memberId, cloud) {
  const { value = "" } = data || {};
  let objResult = {};
  let buffer = "";
  try {
    const res = await cloud.downloadFile({
      fileID: value,
    });
    buffer = res.fileContent;
  } catch (err) {
    console.error("readFileSync Error.", err);
  }
  // console.log('downloadFile3', JSON.stringify(buffer))

  if (buffer) {
    try {
      const res = await cloud.openapi.security.imgSecCheck({
        media: {
          contentType: "image/png",
          value: buffer,
        },
      });

      console.log("imgSecCheck", res);
      if (res && res.errCode === 0) {
        // 非敏感图片,如果路径是temp则删除
        const nEnd = value.lastIndexOf("/");
        const nStart = nEnd - 4;
        const str = value.substring(nStart, nEnd);
        console.log("checkImage", nEnd, nStart, value, str);
        // 临时图片则删除
        if (str === "temp") {
          cloud.deleteFile({
            fileList: [value],
          });
        }
      } else {
        // 敏感图片删除
        cloud.deleteFile({
          fileList: [value],
        });
      }
      objResult = {
        code: 200,
        data: res,
      };
    } catch (err) {
      console.error("checkImage", err);
      objResult = {
        code: 200,
        data: err,
      };
      // 敏感图片删除
      // cloud.deleteFile({
      //   fileList: [value],
      // });
    }
  }

  return objResult;
}

module.exports = checkImage;
