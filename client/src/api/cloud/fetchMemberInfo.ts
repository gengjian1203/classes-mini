import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

/**
 * 注册成员
 */
const addMember = async (objParams: any = {}) => {
  const params = {
    type: "ADD_MEMBER",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
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
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryMember", res);
  return res.data;
};

/**
 * 查询成员列表
 * @param objParams
 * @returns
 */
const queryMemberList = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_MEMBER_LIST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryMemberList", res);
  return res.data;
};

/**
 * 查询成员
 */
const updateMember = async (objParams: any = {}) => {
  const params = {
    type: "UPDATE_MEMBER",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("updateMember", res);
  return res.data;
};

export default {
  addMember,
  queryMember,
  queryMemberList,
  updateMember,
};
