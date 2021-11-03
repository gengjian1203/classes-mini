import Taro from "@tarojs/taro";
import cloud from "./cloud";

const env = "prod"; // 'prod' - 生产环境 'dev' - 开发环境 'test' - 测试环境
const resSystemInfo = Taro.getSystemInfoSync();
const resAccountInfo = Taro.getAccountInfoSync();

const { miniProgram } = resAccountInfo || {};
const { appId = "", envVersion = "", version = "" } = miniProgram || {};

const cloudInfo = cloud[appId] ? cloud[appId][env] : cloud["default"][env];

const config = {
  cloudName: cloudInfo?.cloudName || "",
  cloudPath: cloudInfo?.cloudPath || "",
  cloudDownLoad: cloudInfo?.cloudDownLoad || "",
  SYSTEM_INFO: resSystemInfo || {},
  ACCOUNT_INFO: resAccountInfo || {},
  env,
  appId,
  envVersion,
  version,
};

console.log("config", config);

export default config;
