import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

/**
 * 查询APP级别相关配置
 */
const queryConfig = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_APP_CONFIG",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("queryConfig", res);
  return (res && res.data) || [];
};

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
  return (res && res.data) || [];
};

/**
 * 更新APP级别底部导航
 */
const updateAppTabBar = async (objParams: any = {}) => {
  const params = {
    type: "UPDATE_APP_TAB_BAR",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("updateAppTabBar", res);
  return res.code === 200;
};

/**
 * 查询首页的相关信息
 *  * @param {
 *  month: "2021-08", 查询指定年月的信息
 *  objTaskType: { WEATHER_TIME: true } 返回指定的任务字段
 * } data
 * @returns
 */
const queryHomeInfo = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_HOME_INFO",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("queryHomeInfo", res);
  return res;
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
  return res;
};

/**
 * 测试爬取文章内容
 */
const spiderArticleInfoWeiXin = async (objParams: any = {}) => {
  const params = {
    type: "WEIXIN",
    data: objParams,
  };
  const res = await CloudFetch.callFunction("spiderArticleInfo", params);
  console.log("spiderArticleInfoWeiXin", res);
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
  queryConfig,
  queryAppTabBar,
  updateAppTabBar,
  queryHomeInfo,
  queryWeatherInfo,
  spiderArticleInfoWeiXin,
  spiderWeatherInfo,
};
