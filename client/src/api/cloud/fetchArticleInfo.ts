import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchArticleInfo";

/**
 * 查询天气文章详细内容
 */
const queryWeatherArticleDetailInfo = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_WEATHER_ARTICLE_DETAIL",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryWeatherArticleDetailInfo", res);
  return res.data;
};

/**
 * 查询天气文章列表内容
 */
const queryWeatherArticleListInfo = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_WEATHER_ARTICLE_LIST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryWeatherArticleListInfo", res);
  return res.data;
};

export default {
  queryWeatherArticleDetailInfo,
  queryWeatherArticleListInfo,
};
