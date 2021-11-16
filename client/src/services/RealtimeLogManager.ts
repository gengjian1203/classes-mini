import Taro from "@tarojs/taro";
import Config from "@/config";
import Utils from "@/utils";

/**
 * 实时日志管理器
 */
class RealtimeLogManager {
  static instance: any = null;
  log: any = null;
  arrConfig = [Config.env, JSON.stringify(Config.SYSTEM_INFO)];

  static getInstance() {
    if (!this.instance) {
      this.instance = new RealtimeLogManager();
      this.instance.log = Taro.getRealtimeLogManager
        ? Taro.getRealtimeLogManager()
        : null;
    }
    return this.instance;
  }

  info() {
    if (!this.log) {
      return;
    }
    const params = [
      Utils.getStringDate().timeString,
      ...arguments,
      ...this.arrConfig,
    ];
    console.info(...params);
    this.log.info.apply(this.log, params);
  }

  warn() {
    if (!this.log) {
      return;
    }
    const params = [
      Utils.getStringDate().timeString,
      ...arguments,
      ...this.arrConfig,
    ];
    console.warn(...params);
    this.log.warn.apply(this.log, params);
  }

  error() {
    if (!this.log) {
      return;
    }
    const params = [
      Utils.getStringDate().timeString,
      ...arguments,
      ...this.arrConfig,
    ];
    console.error(...params);
    this.log.error.apply(this.log, params);
  }

  // 从基础库2.7.3开始支持
  setFilterMsg(msg) {
    if (!this.log || !this.log.setFilterMsg) {
      return;
    }
    if (typeof msg !== "string") {
      return;
    }
    this.log.setFilterMsg(msg);
  }

  // 从基础库2.8.1开始支持
  addFilterMsg(msg) {
    if (!this.log || !this.log.addFilterMsg) {
      return;
    }
    if (typeof msg !== "string") {
      return;
    }
    this.log.addFilterMsg(msg);
  }
}

export default RealtimeLogManager.getInstance();
