import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

/**
 * 删除对应帖子
 */
const deletePost = async (objParams: any = {}) => {
  const params = {
    type: "DELETE_POST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("deletePost", res);
  return res.code === 200;
};

/**
 * 查询帖子详细内容
 */
const queryPostDetail = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_POST_DETAIL",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryPostDetail", res);
  return res.data;
};
/**
 * 查询帖子列表
 */
const queryPostList = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_POST_LIST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryPostList", res);
  return res.data;
};

export default {
  deletePost,
  queryPostDetail,
  queryPostList,
};
