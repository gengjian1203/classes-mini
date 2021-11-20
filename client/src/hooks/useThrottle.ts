/**
 * 节流函数（第一次立即执行，执行时间差在节流周期内则不执行。最后一次一定执行）
 * 默认间隔 1000ms
 */

import { useRef, useEffect, useCallback } from "react";

interface IThrottleRef {
  funCallback: any;
  nTimestamp: number;
  handleTimeOut: any;
}

export function useThrottle(
  funCallback = (any?: any) => any,
  delay = 1000,
  dep = []
) {
  const { current } = useRef<IThrottleRef>({
    funCallback: () => true,
    nTimestamp: 0,
    handleTimeOut: null,
  });

  useEffect(() => {
    current.funCallback = funCallback;
  }, [funCallback]);

  return useCallback((...args) => {
    const now = Date.now();
    if (current.handleTimeOut) {
      clearTimeout(current.handleTimeOut);
      current.handleTimeOut = null;
    }
    if (now - current.nTimestamp > delay) {
      current.nTimestamp = now;
      current.funCallback.call(this, ...args);
    } else {
      current.handleTimeOut = setTimeout(() => {
        current.funCallback.call(this, ...args);
      }, delay);
    }
  }, dep);
}

export default useThrottle;
