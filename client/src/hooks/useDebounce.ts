/**
 * 防抖函数
 * 默认间隔 1000ms
 */

import { useRef, useEffect, useCallback } from 'react'

interface IDebounceRef {
	funCallback: any
	handleTimeOut: any
}

export function useDebounce(
	funCallback = (any?: any) => any,
	delay = 1000,
	dep = []
) {
	const { current } = useRef<IDebounceRef>({
		funCallback: () => true,
		handleTimeOut: null,
	})

	useEffect(() => {
		current.funCallback = funCallback
	}, [funCallback])

	return useCallback((...args) => {
		if (current.handleTimeOut !== null) {
			clearTimeout(current.handleTimeOut)
		}
		current.handleTimeOut = setTimeout(() => {
			current.funCallback.call(this, ...args)
		}, delay)
	}, dep)
}

export default useDebounce
