import Taro from "@tarojs/taro";
import Utils from "@/utils";

// 选择图片
export const chooseImage = (
  sourceType: "album" | "camera" | "user" | "environment",
  count: number
) => {
  return new Promise((resolve, reject) => {
    Taro.chooseImage({
      count: count,
      sizeType: ["original", "compressed"],
      sourceType: [sourceType],
      success: async (resChoose) => {
        Taro.showLoading({
          title: "加载中...",
        });
        console.log("funToggleCamera", resChoose);
        if (
          resChoose.tempFiles[0] &&
          resChoose.tempFiles[0].size > 1024 * 1024
        ) {
          Taro.showToast({
            title: "图片不能大于1M",
            icon: "none",
          });
          return;
        }
        const strTempPath = resChoose.tempFilePaths[0];
        const res = await Utils.uploadImage(strTempPath, "temp/");
        console.log("uploadImage", res);
        Taro.hideLoading();
        if (res === "") {
          Taro.showToast({
            title: "图片上传失败，请重新上传",
            icon: "none",
          });
        } else if (res === "DANGER IMAGE") {
          Taro.showToast({
            title: "图片疑似有敏感内容，请更换其他图片",
            icon: "none",
          });
        } else {
          resolve(strTempPath);
        }
      },
      complete: (res) => {
        console.log("chooseImage", res);
      },
    });
  });
};

export default chooseImage;
