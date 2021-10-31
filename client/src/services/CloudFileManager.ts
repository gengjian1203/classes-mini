import Config from "@/config";

// 云存储文件管理器
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
    if (strUrl.startsWith("https://") || strUrl.startsWith("http://")) {
      return strUrl;
    } else {
      return `${Config.cloudPath}${strUrl}`;
    }
  };
}

export default CloudFileManager.getInstance();
