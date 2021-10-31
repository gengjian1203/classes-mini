// 云函数入口文件
const cloud = require("wx-server-sdk");
const md5 = require("blueimp-md5");
// fetchAppInfo
const queryAppConfig = require("./fetchAppInfo/queryAppConfig/index.js");
const queryHomeInfo = require("./fetchAppInfo/queryHomeInfo/index.js");
const queryWeatherInfo = require("./fetchAppInfo/queryWeatherInfo/index.js");
const updateAppTabBar = require("./fetchAppInfo/updateAppTabBar/index.js");
// fetchArticleInfo
const deleteNotice = require("./fetchArticleInfo/deleteNotice/index.js");
const queryNoticeDetail = require("./fetchArticleInfo/queryNoticeDetail/index.js");
const queryNoticeList = require("./fetchArticleInfo/queryNoticeList/index.js");
const queryZhiHuDetail = require("./fetchArticleInfo/queryZhiHuDetail/index.js");
const queryZhiHuList = require("./fetchArticleInfo/queryZhiHuList/index.js");
// fetchGroupInfo
const addGroup = require("./fetchGroupInfo/addGroup/index.js");
const queryGroupByKeyTitle = require("./fetchGroupInfo/queryGroupByKeyTitle/index.js");
const queryGroupByMemberId = require("./fetchGroupInfo/queryGroupByMemberId/index.js");
const queryGroupDetail = require("./fetchGroupInfo/queryGroupDetail/index.js");
// fetchMemberInfo
const addMemberInfo = require("./fetchMemberInfo/addMemberInfo/index.js");
const queryMemberInfo = require("./fetchMemberInfo/queryMemberInfo/index.js");
const queryMemberList = require("./fetchMemberInfo/queryMemberList/index.js");
const updateMemberInfo = require("./fetchMemberInfo/updateMemberInfo/index.js");
// fetchQRCodeInfo
const createQRCode = require("./fetchQRCodeInfo/createQRCode/index.js");
const queryQRCode = require("./fetchQRCodeInfo/queryQRCode/index.js");
// fetchTaskInfo
const addTaskInfo = require("./fetchTaskInfo/addTaskInfo/index.js");
const queryTaskInfo = require("./fetchTaskInfo/queryTaskInfo/index.js");
const updateTaskInfo = require("./fetchTaskInfo/updateTaskInfo/index.js");
// fetchWorkerInfo
const addWorkerInfo = require("./fetchWorkerInfo/addWorkerInfo/index.js");
const queryWorkerInfo = require("./fetchWorkerInfo/queryWorkerInfo/index.js");
const queryWorkerList = require("./fetchWorkerInfo/queryWorkerList/index.js");
const updateWorkerInfo = require("./fetchWorkerInfo/updateWorkerInfo/index.js");

cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
});

const objFunction = {
  QUERY_APP_CONFIG: queryAppConfig, // 查询APP级别相关配置
  QUERY_HOME_INFO: queryHomeInfo, // 查询首页的相关信息
  QUERY_WEATHER_INFO: queryWeatherInfo, // 查询天气相关信息
  UPDATE_APP_TAB_BAR: updateAppTabBar, // 更新APP级别底部导航
  // fetchArticleInfo
  DELETE_NOTICE: deleteNotice, // 删除对应资讯文章
  QUERY_NOTICE_DETAIL: queryNoticeDetail, // 查询资讯文章详细内容
  QUERY_NOTICE_LIST: queryNoticeList, // 查询资讯文章列表内容
  QUERY_ZHIHU_DETAIL: queryZhiHuDetail, // 查询知乎文章详细内容
  QUERY_ZHIHU_LIST: queryZhiHuList, // 查询知乎列表内容
  // fetchGroupInfo
  ADD_GROUP: addGroup, // 新建班级
  QUERY_GROUP_BY_KEY_TITLE: queryGroupByKeyTitle, // 通过关键字查询班级列表
  QUERY_GROUP_BY_MEMBER_ID: queryGroupByMemberId, // 通过MemberId查询班级列表
  QUERY_GROUP_DETAIL: queryGroupDetail, // 通过groupId查询社区详情
  // fetchMemberInfo
  ADD_MEMBER: addMemberInfo, // 新增成员
  QUERY_MEMBER: queryMemberInfo, // 查询成员
  QUERY_MEMBER_LIST: queryMemberList, // 查询成员列表
  UPDATE_MEMBER: updateMemberInfo, // 更新成员
  // fetchQRCodeInfo
  CREATE_QRCODE: createQRCode, // 创建二维码
  QUERY_QRCODE: queryQRCode, // 查询二维码
  // fetchTaskInfo
  ADD_TASK: addTaskInfo, // 新增任务
  QUERY_TASK: queryTaskInfo, // 查询任务
  UPDATE_TASK: updateTaskInfo, // 更新任务
  // fetchWorkerInfo
  ADD_WORKER: addWorkerInfo, // 新增员工
  QUERY_WORKER: queryWorkerInfo, // 查询员工
  QUERY_WORKER_LIST: queryWorkerList, // 分页查询员工列表
  UPDATE_WORKER: updateWorkerInfo, // 更新员工
};

const verifyRequest = (event) => {
  const keyToken = "I, have 187076081 dream!";
  const { keyTime, keySecret, type, data } = event;
  const keySecretLocal = md5(`${keyTime}${type}${keyToken}${data}`);
  // console.log("verifyRequest", keyToken, keyTime, type);
  // console.log("verifyRequest", keyTime, keySecret, keySecretLocal);
  return keyTime && keySecret && keySecretLocal === keySecret;
};

/**
 * 用以处理APP级相关接口
 * @param {*} event
 * @param {*} context
 */
exports.main = async (event, context) => {
  const { type, data } = event;
  const { OPENID, APPID, UNIONID } = cloud.getWXContext();

  let objResult = {};
  if (verifyRequest(event)) {
    const db = cloud.database();
    const memberId = `mem-${OPENID}`;
    console.log("请求人:", memberId, type);
    if (objFunction[type]) {
      objResult = await objFunction[type](data, db, memberId, cloud);
    } else {
      objResult = { code: 500004, msg: "该接口函数未定义" };
    }
  } else {
    objResult = { code: 500001, msg: "密令校验非法" };
  }

  const code = objResult.errCode || objResult.code;
  objResult.code = code ? code : 200;

  return objResult;
};
