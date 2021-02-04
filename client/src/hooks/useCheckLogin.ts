/**
 * 校验登录
 * 默认间隔 1000ms
 */
import Taro from '@tarojs/taro'
import { useRef, useEffect, useCallback } from 'react'
import useIsLogin from '@/hooks/useIsLogin'

interface IThrottleRef {
	funCallback: any
}

export function useCheckLogin(funCallback = (any?: any) => any) {
	const { current } = useRef<IThrottleRef>({
		funCallback: () => true,
	})
	const isLogin = useIsLogin()

	useEffect(() => {
		current.funCallback = funCallback
	}, [funCallback])

	return useCallback(
		(...args) => {
			// console.log('useCheckLogin', memberInfo.user_openid)
			if (isLogin) {
				current.funCallback.call(this, ...args)
			} else {
				Taro.navigateTo({
					url: '/pages/login/index',
				})
			}
		},
		[isLogin]
	)
}

export default useCheckLogin
