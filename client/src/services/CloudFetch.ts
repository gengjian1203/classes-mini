import md5 from "blueimp-md5";
import Taro from "@tarojs/taro";

const keyToken = "I, have 187076081 dream!";

const callFunction: any = async (
  strCloudName: string,
  objCloudParams: any,
  isShowToast: boolean
) => {
  const keyTime = String(new Date().getTime());
  const keySecret = md5(
    `${keyTime}${objCloudParams.type}${keyToken}${objCloudParams.data}`
  );
  const param = {
    ...objCloudParams,
    keyTime: keyTime,
    keySecret: keySecret,
  };
  return new Promise((resolve, reject) => {
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
  });
};

export default {
  callFunction,
};
