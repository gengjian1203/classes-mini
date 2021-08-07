import CloudFetch from "@/services/CloudFetch";

const CLOUD_NAME = "fetchTaskInfo";

interface IAddTaskParams {
  fxDate: string;
  keyName: string;
  arrData: Array<any>;
}
/**
 * 新增任务
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
 * 查询任务
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
 * 更新任务
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
