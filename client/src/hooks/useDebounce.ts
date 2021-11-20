/**
 * 防抖函数（第一次立即执行，等到频繁调用后，执行最后一次）
 * 默认间隔 1000ms
 */

import { useRef, useEffect, useCallback } from "react";

interface IDebounceRef {
  funCallback: any;
  handleTimeOut: any;
}

export function useDebounce(
  funCallback = (any?: any) => any,
  delay = 1000,
  dep = []
) {
  const { current } = useRef<IDebounceRef>({
    funCallback: () => true,
    handleTimeOut: null,
  });

  useEffect(() => {
    current.funCallback = funCallback;
  }, [funCallback]);

  return useCallback((...args) => {
    if (current.handleTimeOut) {
      clearTimeout(current.handleTimeOut);
      current.handleTimeOut = setTimeout(() => {
        current.funCallback.call(this, ...args);
        current.handleTimeOut = null;
      }, delay);
    } else {
      current.funCallback.call(this, ...args);
      current.handleTimeOut = setTimeout(() => {
        current.handleTimeOut = null;
      }, delay);
    }
  }, dep);
  // return useCallback((...args) => {
  //   if (current.handleTimeOut !== null) {
  //     clearTimeout(current.handleTimeOut);
  //   }
  //   current.handleTimeOut = setTimeout(() => {
  //     current.funCallback.call(this, ...args);
  //   }, delay);
  // }, dep);
}

export default useDebounce;
