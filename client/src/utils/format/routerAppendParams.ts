/**
 * 构造路由字符串，可尾部追加传参
 * @param {*} strPath 原路由字符串
 * @param {*} objParams 参数对象
 * @returns 追加参数后的路由字符串
 */
export const routerAppendParams = (strPath, objParams) => {
  let strResult = strPath;
  if (strPath && objParams && JSON.stringify(objParams) !== "{}") {
    let isFirstParam = !strPath.includes("?");
    Object.keys(objParams).forEach((key) => {
      if (isFirstParam) {
        strResult += `?${key}=${objParams[key]}`;
        isFirstParam = false;
      } else {
        strResult += `&${key}=${objParams[key]}`;
      }
    });
  }
  return strResult;
};

export default routerAppendParams;
