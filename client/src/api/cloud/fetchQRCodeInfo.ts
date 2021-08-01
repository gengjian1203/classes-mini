import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchQRCodeInfo";

/**
 * 创建二维码
 */
const createQRCode = async (objParams: any = {}) => {
  const params = {
    type: "CREATE_QRCODE",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("createQRCode", res);
  return res.data;
};

/**
 * 查询二维码
 */
const queryQRCode = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_QRCODE",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryQRCode", res);
  return res.data;
};

export default {
  createQRCode,
  queryQRCode,
};
