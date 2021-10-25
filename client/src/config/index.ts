import Taro from "@tarojs/taro";
import cloud from "./cloud";

const env = "dev"; // 'prod' - 生产环境 'dev' - 开发环境 'test' - 测试环境
const resSystemInfo = Taro.getSystemInfoSync();
const resAccountInfo = Taro.getAccountInfoSync();

const { miniProgram } = resAccountInfo || {};
const { appId = "default", envVersion = "", version = "" } = miniProgram || {};

const cloudInfo = cloud[appId][env];

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
