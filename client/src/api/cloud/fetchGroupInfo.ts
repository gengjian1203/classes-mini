import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

/**
 * 新建群组
 */
interface IAddGroupParams {
  logo?: string; // logo
  title?: string; // 班级名称
  describe?: string; // 班级介绍
  address?: string; // 班级地址
}
const addGroup = async (objParams: IAddGroupParams = {}) => {
  const params = {
    type: "ADD_GROUP",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params);
  console.log("addGroup", res);
  return res.data;
};

/**
 * 通过关键字查询群组列表
 */
interface IQueryGroupByKeyTitleParams {
  pageName?: number; // 分页数
  pageSize?: number; // 每页加载数
  keyTitle?: string; // 搜索关键字
}
const queryGroupByKeyTitle = async (
  objParams: IQueryGroupByKeyTitleParams = {}
) => {
  const params = {
    type: "QUERY_GROUP_BY_KEY_TITLE",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params);
  console.log("queryGroupByKeyTitle", res);
  return res.data;
};

/**
 * 通过MemberId查询群组列表
 */
interface IQueryGroupByMemberIdParams {
  pageName?: number; // 分页数
  pageSize?: number; // 每页加载数
  memberId?: string; // 搜索关键字
}
const queryGroupByMemberId = async (
  objParams: IQueryGroupByMemberIdParams = {}
) => {
  const params = {
    type: "QUERY_GROUP_BY_MEMBER_ID",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params);
  console.log("queryGroupByMemberId", res);
  return res.data;
};

/**
 * 通过groupId查询社区详情
 */
interface IQueryGroupDetailParams {
  groupId?: string; // 搜索关键字
}
const queryGroupDetail = async (objParams: IQueryGroupDetailParams = {}) => {
  const params = {
    type: "QUERY_GROUP_DETAIL",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params);
  console.log("queryGroupDetail", res);
  return res.data;
};

export default {
  addGroup,
  queryGroupByKeyTitle,
  queryGroupByMemberId,
  queryGroupDetail,
};
