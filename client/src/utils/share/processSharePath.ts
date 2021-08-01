import StorageManager from "@/services/StorageManager";

interface ISharePathType {
  sharePath: string;
  [key: string]: any;
}

/**
 * 整理分享参数
 * @param objParams 分享传递的参数
 * @return 返回带参数可以用于直接跳转的链接字符串
 */
export function processSharePath(objParams: ISharePathType) {
  const memberInfo = StorageManager.getStorageSync("memberInfo");
  const sourceID = memberInfo._id ? memberInfo._id : "";
  const shareType = objParams.shareType ? objParams.shareType : "MINIPROGRAM";
  // 分享基本参数
  let strBaseUrl =
    `/pages/Loading/index` + // 分享中转页
    `?sourceID=${sourceID}` + // 分享人ID
    `&shareType=${shareType}` + // 分享途径类型
    `&sharePath=`;
  // 分享路径所需参数
  let strExtendUrl = `${objParams.sharePath}?from=share`;
  for (let key in objParams) {
    if (key === "sharePath" || key === "shareType") {
      continue;
    }
    strExtendUrl += `&${key}=${objParams[key]}`;
  }
  return {
    sourceID: sourceID,
    shareType: shareType,
    objParams: objParams,
    sharePathFull: strBaseUrl + encodeURIComponent(strExtendUrl),
  };
}

export default processSharePath;
