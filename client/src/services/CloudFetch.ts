import md5 from "blueimp-md5";
import Taro from "@tarojs/taro";

const keyToken = "I have a dream";
const keyTime = String(new Date().getTime());

const callFunction: any = async (strCloudName: string, objCloudParams: any) => {
  const keySecret = md5(`${keyToken}${keyTime}${objCloudParams.type}`);
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
      .then((res) => {
        resolve(res.result);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default {
  callFunction,
};
