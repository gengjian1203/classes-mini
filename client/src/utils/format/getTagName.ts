import ConfigTag from "@/config/tag";

/**
 * 获取身份信息
 * @param strTag
 */
export const getTagName = (strTag: string = "") => {
  return ConfigTag[strTag]?.name || "";
};

export default getTagName;
