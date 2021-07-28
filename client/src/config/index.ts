import Taro from "@tarojs/taro";

const prod = true; // true - 生产环境 false - 开发环境
const resSystemInfo = Taro.getSystemInfoSync();

const config = {
  env: prod ? "dev-8panu" : "prod-1gggp1e8827b372f", // 将dev-8panu切为生产环境，其配置更好
  cloudPath: "",
  cloudPathQRCode: "",
  SYSTEM_INFO: resSystemInfo,
};

export default config;
