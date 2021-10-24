import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

/**
 * 删除对应天气文章
 */
const deleteWeatherArticle = async (objParams: any = {}) => {
  const params = {
    type: "DELETE_WEATHER_ARTICLE",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("deleteWeatherArticle", res);
  return res.code === 200;
};

/**
 * 查询资讯文章详细内容
 */
const queryArticleDetail = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_ARTICLE_DETAIL",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryArticleDetail", res);
  return res.data;
};
/**
 * 查询资讯文章列表内容
 */
const queryArticleList = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_ARTICLE_LIST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryArticleList", res);
  return res.data;
};

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
  deleteWeatherArticle,
  queryArticleDetail,
  queryArticleList,
  queryWeatherArticleDetailInfo,
  queryWeatherArticleListInfo,
};
