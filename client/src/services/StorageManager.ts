import Taro from "@tarojs/taro";

// 持久化管理器
class StorageManager {
  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new StorageManager();
    }
    return this.instance;
  }

  /**
   * 存缓存
   * @param {*} key 缓存键
   * @param {*} value 缓存值
   * @param {*} time 缓存时间、单位为秒、不传值则永久缓存
   */
  setStorageSync(key, value, time) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    const seconds = parseInt(time);

    Taro.setStorageSync(strKey, value);
    if (seconds > 0) {
      let timestamp = new Date().getTime();
      timestamp = timestamp / 1000 + seconds;
      Taro.setStorageSync(strTime, timestamp);
    } else {
      Taro.removeStorageSync(strTime);
    }
  }

  /**
   * 取缓存
   * @param {*} key 缓存键
   * @returns 缓存值、如不存在或超时则返回undefined
   */
  getStorageSync(key) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;
    const deadtime = parseInt(Taro.getStorageSync(strTime));

    if (deadtime) {
      if (deadtime < new Date().getTime()) {
        return undefined;
      }
    }
    const res = Taro.getStorageSync(strKey);
    return res;
  }

  /**
   * 移除指定缓存字段
   * @param {*} key 缓存键
   */
  removeStorageSync(key) {
    const header = `CACHE_`; // 管理字段前缀
    const tailer = "_DEADTIME"; // 管理字段后缀
    const strKey = `${header}${key}`;
    const strTime = `${header}${key}${tailer}`;

    Taro.removeStorageSync(strKey);
    Taro.removeStorageSync(strTime);
  }

  /**
   * 清除所有缓存
   */
  clearStorageSync() {
    Taro.clearStorageSync();
  }
}

export default StorageManager.getInstance();
