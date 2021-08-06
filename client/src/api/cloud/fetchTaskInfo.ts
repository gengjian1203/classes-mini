import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchTaskInfo";

interface IAddTaskParams {
  name?: string; // 名称
  nameSimple?: string; // 简称
  gender?: number; // 性别
  cellphone?: string; // 手机号
  tag?: string; // 身份标签
}
/**
 * 注册成员
 */
const addTask = async (objParams: IAddTaskParams = {}) => {
  const params = {
    type: "ADD_TASK",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, true);
  console.log("addTask", res);
  return res.data;
};

/**
 * 查询成员
 */
const queryTask = async (objParams: any = {}) => {
  const params = {
    type: "QUERY_TASK",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("queryTask", res);
  return res.data;
};

/**
 * 查询成员
 */
const updateTask = async (objParams: any = {}) => {
  const params = {
    type: "UPDATE_TASK",
    data: objParams,
  };
  const res = await CloudFetch.callFunction(CLOUD_NAME, params, false);
  console.log("updateTask", res);
  return res.data;
};

export default {
  addTask,
  queryTask,
  updateTask,
};
