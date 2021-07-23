import md5 from "blueimp-md5";
import Taro from "@tarojs/taro";

/**
 * 全局数据管理器
 */
class CloudFetch {
  keyToken = "I, have 187076081 dream!";
  static instance: any = null;

  static getInstance() {
    if (!this.instance) {
      this.instance = new CloudFetch();
    }
    return this.instance;
  }

  callFunction: any = async (
    strCloudName: string,
    objCloudParams: any,
    isShowToast: boolean
  ) => {
    const keyTime = String(new Date().getTime());
    const keySecret = md5(
      `${keyTime}${objCloudParams.type}${this.keyToken}${objCloudParams.data}`
    );
    const param = {
      ...objCloudParams,
      keyTime: keyTime,
      keySecret: keySecret,
    };
    return new Promise((resolve, reject) => {
      if (process.env.TARO_ENV === "weapp") {
        Taro.cloud
          .callFunction({
            name: strCloudName,
            data: param,
          })
          .then((res: any) => {
            if (isShowToast && res?.result?.code && res?.result?.code !== 200) {
              console.log("callFunction", String(res?.result?.msg));
              Taro.showToast({
                title: String(res?.result?.msg),
                icon: "none",
              });
            }
            resolve(res.result);
          })
          .catch((err) => {
            Taro.showToast({
              title: String(err),
              icon: "none",
            });
            reject(err);
          });
      } else {
        resolve({});
      }
    });
  };
}

export default CloudFetch.getInstance();
