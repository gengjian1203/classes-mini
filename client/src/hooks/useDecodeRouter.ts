/**
 * 获取页面路由相关信息，并对携带参数解码
 */

import Taro, { useRouter } from "@tarojs/taro";

export function useDecodeRouter() {
  const { path, params } = useRouter();

  Object.keys(params).map((key) => {
    return (params[key] = decodeURIComponent(params[key]));
  });

  const pages = Taro.getCurrentPages() || [];
  const context: any = pages?.length >= 1 ? pages[pages?.length - 1] : {};

  return {
    path,
    params,
    context,
  };
}

export default useDecodeRouter;
