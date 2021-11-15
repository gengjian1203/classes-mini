import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

/**
 * 校验图片的敏感信息
 */
const checkImage = async (objParams: any = {}) => {
  const params = {
    type: "CHECK_IMAGE",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("checkImage", res);
  return res.data;
};

/**
 * 校验文字的敏感信息
 */
const checkText = async (objParams: any = {}) => {
  const params = {
    type: "CHECK_TEXT",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("checkText", res);
  return res.data;
};

export default {
  checkImage,
  checkText,
};
