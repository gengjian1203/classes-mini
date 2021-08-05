/**
 * 获取身份信息
 * @param strTag
 */
export const getTagName = (strTag: string = "") => {
  let result = "";

  const arrTag = strTag.split("_");
  const strCompany = arrTag[0];
  const strPosition = arrTag[1];

  const objCompanyName = {
    WEATHER: "气象",
  };
  const objCompanyPosition = {
    LEADER: "领导组",
    TIME: "短时科",
  };

  result =
    `${objCompanyName[strCompany] || ""}` +
    `${objCompanyPosition[strPosition] || ""}`;

  return result;
};

export default getTagName;
