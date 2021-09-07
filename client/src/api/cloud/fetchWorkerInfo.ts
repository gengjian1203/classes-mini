import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchCloudInfo";

interface IAddWorkerParams {
  name?: string; // 名称
  nameSimple?: string; // 简称
  gender?: number; // 性别
  cellphone?: string; // 手机号
  tag?: string; // 身份标签
}
/**
 * 注册员工
 */
const addWorker = async (objParams: IAddWorkerParams = {}) => {
  const params = {
    type: "ADD_WORKER",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("addWorker", res);
  return res.data;
};

/**
 * 查询员工
 */
const queryWorker = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_WORKER",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryWorker", res);
  return res.data;
};

/**
 * 分页查询员工列表
 */
const queryWorkerList = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_WORKER_LIST",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryWorkerList", res);
  return res.data;
};

/**
 * 更新员工
 */
const updateWorker = async (objParams: any = {}) => {
  const params = {
    type: "UPDATE_WORKER",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("updateWorker", res);
  return res.data;
};

export default {
  addWorker,
  queryWorker,
  queryWorkerList,
  updateWorker,
};
