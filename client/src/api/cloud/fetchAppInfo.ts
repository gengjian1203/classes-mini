import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchAppInfo";

/**
 * 查询APP级别底部导航
 */
const queryAppTabBar = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_APP_TAB_BAR",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params);
  console.log("queryAppTabBar", res);
  return res.data;
};

export default {
  queryAppTabBar,
};
