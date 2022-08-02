import CloudFetch from "@/services/CloudFetch";

/**
 * 测试定时器爬取知乎内容
 */
const spiderArticleZhiHu = async (objParams: any = {}) => {
  const params = {};
  const res = await CloudFetch.callFunction("spiderArticleInfo", params);
  console.log("spiderArticleZhiHu", res);
  return res.data;
};

/**
 * 测试爬取公众号帖子内容
 */
const spiderArticleWeiXin = async (objParams: any = {}) => {
  const params = {
    type: "WEIXIN",
    data: objParams,
  };
  const res = await CloudFetch.callFunction("spiderArticleInfo", params);
  console.log("spiderArticleWeiXin", res);
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

/**
 * 测试爬取天气数据
 */
const jobRobot = async (objParams: any = {}) => {
  const params = {};
  const res = await CloudFetch.callFunction("jobRobot", params);
  console.log("jobRobot", res);
  return res.data;
};

export default {
  spiderArticleZhiHu,
  spiderArticleWeiXin,
  spiderWeatherInfo,
  jobRobot,
};
