import Config from "@/config";

/**
 * 获取设备等比尺寸
 * screenWidth 显示器宽度 如：1920
 * windowWidth 小程序窗口宽度 如：750
 * @return
 */
export const getDeviceSize = (number) => {
  const fScale = Config.SYSTEM_INFO.windowWidth / 375;
  const result = Math.floor(number * fScale);
  console.log("getDeviceSize", number, "=>", result);
  return result;
};

export default getDeviceSize;
