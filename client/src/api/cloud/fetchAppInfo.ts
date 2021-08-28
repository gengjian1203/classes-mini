import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchAppInfo";

/**
 * 查询APP级别底部导航
 */
const queryAppTabBar = async (objParams: any = {}) => {
  // const params = {
  //   type: "QUERY_APP_TAB_BAR",
  //   data: objParams,
  // };
  // const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  // console.log("queryAppTabBar", res);
  // return res.data;
  return [
    {
      id: "0000001",
      title: "首页",
      permission: ["normal"],
      contentType: "HOME",
      iconType: "iconfont iconhomepage",
      selectedIconType: "iconfont iconhomepage_fill",
    },
    // {
    //   id: "0000002",
    //   title: "班级",
    //   permission: ["teacher", "student", "parent"],
    //   contentType: "GROUP",
    //   iconType: "iconfont iconactivity",
    //   selectedIconType: "iconfont iconactivity_fill",
    // },
    // {
    //   id: "0000003",
    //   title: "中波",
    //   permission: ["station"],
    //   contentType: "WAVE",
    //   iconType: "iconfont iconbase-station",
    //   selectedIconType: "iconfont iconbase-station-full",
    // },
    // {
    //   id: "0000004",
    //   title: "星站",
    //   permission: ["station"],
    //   contentType: "SATELLITE",
    //   iconType: "iconfont iconbase-satellite",
    //   selectedIconType: "iconfont iconbase-satellite-full",
    // },
    {
      id: "0000005",
      title: "资讯",
      permission: ["normal", "weather"],
      contentType: "WEATHER_NEW",
      iconType: "iconfont iconbarrage",
      selectedIconType: "iconfont iconbarrage_fill",
    },
    {
      id: "0000000",
      title: "我的",
      permission: ["normal"],
      contentType: "MINE",
      iconType: "iconfont iconpeople",
      selectedIconType: "iconfont iconpeople_fill",
    },
  ];
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
  queryHomeInfo,
  queryWeatherInfo,
  spiderWeatherInfo,
};
