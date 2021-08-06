import Taro from "@tarojs/taro";
import Config from "@/config/index";
import GlobalManager from "@/services/GlobalManager";
import Utils from "@/utils";

export default class AppInitDataService {
  // 单例对象
  static _instance: AppInitDataService;

  constructor() {}

  static getInstance() {
    if (!this._instance) {
      this._instance = new AppInitDataService();
    }
    return this._instance;
  }

  initSysInfo = () => {
    GlobalManager.nowDate = Utils.getStringDate(new Date());
  };

  initCloudInfo = () => {
    // 初始化云函数
    if (process.env.TARO_ENV === "weapp") {
      Taro.cloud.init({
        env: Config.env,
      });
    }
  };

  init() {
    console.log("AppInitService init start.");
    this.initSysInfo();
    this.initCloudInfo();
    console.log("AppInitService init done.", GlobalManager);
  }
}
