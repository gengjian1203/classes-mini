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
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("queryAppTabBar", res);
  return res.data;
};

/**
 * 查询天气相关信息
 */
const queryWeatherInfo = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_WEATHER_INFO",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("queryWeatherInfo", res);
  return res.data;
};

/**
 * 测试爬取天气数据
 */
const spiderWeatherInfo = async (objParams: any = {}) => {
  const params = {};
  const res = await CloudFetch.callFunction("spiderWeatherInfo", params);
  console.log("spiderWeatherInfo", res);
  return res.data;
};

export default {
  queryAppTabBar,
  queryWeatherInfo,
  spiderWeatherInfo,
};
