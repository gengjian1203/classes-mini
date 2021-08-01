import Taro from "@tarojs/taro";

const prod = true; // true - 生产环境 false - 开发环境
const resSystemInfo = Taro.getSystemInfoSync();

const config = {
  env: prod ? "dev-8panu" : "prod-1gggp1e8827b372f", // 将dev-8panu切为生产环境，其配置更好
  cloudPath: prod
    ? "cloud://dev-8panu.6465-dev-8panu-1300943416/"
    : "cloud://prod-1gggp1e8827b372f.7072-prod-1gggp1e8827b372f-1300943416/",
  SYSTEM_INFO: resSystemInfo,
};

export default config;
