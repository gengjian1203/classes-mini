import Taro from "@tarojs/taro";

export const getUrl = async (url: string) => {
  return new Promise((resolve) => {
    Taro.request({
      url: url,
      complete: (res: any) => {
        console.log("getUrl", res);
        const { statusCode, data = null } = res || {};
        resolve(statusCode === 200 ? data : null);
      },
    });
  });
};

export default {
  getUrl,
};
