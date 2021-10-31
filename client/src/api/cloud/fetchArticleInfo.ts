import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

/**
 * 删除对应资讯文章
 */
const deleteNotice = async (objParams: any = {}) => {
  const params = {
    type: "DELETE_NOTICE",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("deleteNotice", res);
  return res.code === 200;
};

/**
 * 查询资讯文章详细内容
 */
const queryNoticeDetail = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_NOTICE_DETAIL",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryNoticeDetail", res);
  return res.data;
};
/**
 * 查询资讯文章列表内容
 */
const queryNoticeList = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_NOTICE_LIST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryNoticeList", res);
  return res.data;
};

/**
 * 查询知乎文章详细内容
 */
const queryZhiHuDetail = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_ZHIHU_DETAIL",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryZhiHuDetail", res);
  return res.data;
};

/**
 * 查询知乎列表内容
 */
const queryZhiHuList = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_ZHIHU_LIST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryZhiHuList", res);
  return res.data;
};

export default {
  deleteNotice,
  queryNoticeDetail,
  queryNoticeList,
  queryZhiHuDetail,
  queryZhiHuList,
};
