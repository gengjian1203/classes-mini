import Config from "@/config";

// 持久化管理器
class CloudFileManager {
  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new CloudFileManager();
    }
    return this.instance;
  }

  // 处理cloud链接
  getCloudUrl = (strUrl: string) => {
    return `${Config.cloudPath}${strUrl}`;
  };
}

export default CloudFileManager.getInstance();
