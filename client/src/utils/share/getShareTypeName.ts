export const shareType = {
  MINIPROGRAM: {
    name: "MINIPROGRAM",
    title: "搜索小程序",
  },
  LINK_MINIPROGRAM: {
    name: "LINK_POPULARIZE",
    title: "搜索小程序(链接)",
  },
  QRCODE_MINIPROGRAM: {
    name: "QRCODE_POPULARIZE",
    title: "搜索小程序(二维码)",
  },
  POPULARIZE: {
    name: "POPULARIZE",
    title: "分享邀请",
  },
  LINK_POPULARIZE: {
    name: "LINK_POPULARIZE",
    title: "分享邀请(链接)",
  },
  QRCODE_POPULARIZE: {
    name: "QRCODE_POPULARIZE",
    title: "分享邀请(二维码)",
  },
};

/**
 * 解析分享途径枚举
 * @param strShareType
 * @return
 */
export const getShareTypeName = (strShareType: string) => {
  const strResult = shareType[strShareType]?.name;

  return strResult ? strResult : `UNKNOW`;
};

/**
 * 解析分享途径枚举
 * @param strShareType
 * @return
 */
export const getShareTypeTitle = (strShareType: string) => {
  const strResult = shareType[strShareType]?.title;

  return strResult ? strResult : `未知-${strShareType}`;
};

export default { shareType, getShareTypeName, getShareTypeTitle };
