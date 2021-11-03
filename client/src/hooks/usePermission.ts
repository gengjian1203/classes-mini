/**
 * 权限校验
 * 1. 自身的标签
 * 2. 传入的标签（对比维度）
 */

import StorageManager from "@/services/StorageManager";

export function usePermission(params): boolean {
  const memberInfo = StorageManager.getStorageSync("memberInfo");

  const {
    strCheckTag = "pass",
    strCheckCompany = "pass",
    strCheckPosition = "pass",
  } = params;

  let result = false;
  const strSelfTag = memberInfo?.objWorker?.tag || "";

  if (strSelfTag === "APP_GM") {
    result = true; // APP_GM身份全部通过
  } else {
    const arrSelfTag = strSelfTag.split("_");
    const strSelfCompany = arrSelfTag[0];
    const strSelfPosition = arrSelfTag[1];

    if (strSelfCompany && strSelfPosition) {
      // 为合法数据开始判断
      if (
        (strCheckTag === "pass" || strCheckTag === strSelfTag) && //
        (strCheckCompany === "pass" || strCheckCompany === strSelfCompany) && //
        (strCheckPosition === "pass" || strCheckPosition === strSelfPosition)
      ) {
        result = true;
      }
    }
  }

  return result;
}

export default usePermission;
