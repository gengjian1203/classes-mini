import Taro from "@tarojs/taro";

const prod = true; // true - 生产环境 false - 开发环境
const resSystemInfo = Taro.getSystemInfoSync();

const config = {
  env: prod ? "prod-1gggp1e8827b372f" : "dev-8panu",
  cloudPath: "",
  cloudPathQRCode: "",
  SYSTEM_INFO: resSystemInfo,
};

export default config;
