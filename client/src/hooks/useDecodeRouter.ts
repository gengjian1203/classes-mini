/**
 * 获取页面路由相关信息，并对携带参数解码
 */

import { useRouter } from "@tarojs/taro";

export function useDecodeRouter() {
  const { path, params } = useRouter();

  Object.keys(params).map((key) => {
    return (params[key] = decodeURIComponent(params[key]));
  });

  return {
    path,
    params,
  };
}

export default useDecodeRouter;
