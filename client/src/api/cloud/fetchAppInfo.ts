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

export default {
  queryConfig,
  updateAppTabBar,
  queryHomeInfo,
  queryWeatherInfo,
};
