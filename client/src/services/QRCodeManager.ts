import Api from "@/api";
import Config from "@/config/index";
import ResourceManager from "@/services/ResourceManager";

/**
 * 二维码管理器器
 */
class QRCodeManager {
  // 单例对象
  static _instance: QRCodeManager;
  _mapQRCode: Map<any, any> = new Map();

  constructor() {}

  static getInstance() {
    if (!this._instance) {
      this._instance = new QRCodeManager();
    }
    return this._instance;
  }

  // 获取二维码
  createQRCode = async (objParam = {}) => {
    const data = await Api.cloud.fetchQRCodeInfo.createQRCode(objParam);
    const strQRCodeUrl = await ResourceManager.getUrl(
      Config.cloudPath + data?.strQRCodeFileId
    );
    // console.log("createQRCode", data, strQRCodeUrl);
    return strQRCodeUrl;
  };

  getQRCode = async (objParam) => {
    const keyMap = objParam?.sharePathFull ? objParam?.sharePathFull : "";
    const strUrl = this._mapQRCode.get(keyMap);
    // console.log('QRCodeManager getUrl', keyMap, strUrl)
    if (strUrl) {
      return strUrl;
    } else {
      const strResult = await this.createQRCode(objParam);
      this._mapQRCode.set(keyMap, strResult);
      // console.log('QRCodeManager getUrl2', strResult)
      // console.log('QRCodeManager getUrl3', QRCodeManager._mapQRCode)
      return strResult;
    }
  };
}

export default QRCodeManager.getInstance();
