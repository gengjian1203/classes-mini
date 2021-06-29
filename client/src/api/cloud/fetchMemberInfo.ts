import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchMemberInfo";

/**
 * 注册成员
 */
const addMember = async (objParams: any = {}) => {
  const params = {
    type: "ADD_MEMBER",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params);
  console.log("addMember", res);
  return res.data;
};

/**
 * 查询成员
 */
const queryMember = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_MEMBER",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params);
  console.log("queryMember", res);
  return res.data;
};

export default {
  addMember,
  queryMember,
};
