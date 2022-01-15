import Taro from "@tarojs/taro";
import app from "./app";

const env = "prod"; // 'prod' - 生产环境 'dev' - 开发环境 'test' - 测试环境
const resSystemInfo = Taro.getSystemInfoSync();
const resAccountInfo = Taro.getAccountInfoSync();

const { miniProgram } = resAccountInfo || {};
const { appId = "", envVersion = "", version = "" } = miniProgram || {};

const cloudInfo = app[appId] ? app[appId] : app["default"];
const cloudEnv = cloudInfo[env];

const config = {
  cloudName: cloudEnv?.cloudName || "",
  cloudPath: cloudEnv?.cloudPath || "",
  cloudDownLoad: cloudEnv?.cloudDownLoad || "",
  SYSTEM_INFO: resSystemInfo || {},
  ACCOUNT_INFO: resAccountInfo || {},
  env,
  appId,
  appName: cloudInfo?.appName || "",
  envVersion,
  version,
};

console.log("config", config);

export default config;
