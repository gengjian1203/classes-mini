/**
 * 节流函数
 * 默认间隔 1000ms
 */

import { useRef, useEffect, useCallback } from 'react'

interface IThrottleRef {
	funCallback: any
	nTimestamp: number
}

export function useThrottle(
	funCallback = (any?: any) => any,
	delay = 1000,
	dep = []
) {
	const { current } = useRef<IThrottleRef>({
		funCallback: () => true,
		nTimestamp: 0,
	})

	useEffect(() => {
		current.funCallback = funCallback
	}, [funCallback])

	return useCallback((...args) => {
		const now = Date.now()
		if (now - current.nTimestamp > delay) {
			current.nTimestamp = now
			current.funCallback.call(this, ...args)
		}
	}, dep)
}

export default useThrottle
