/**
 * 校验登录
 * 默认间隔 1000ms
 */
import Taro from '@tarojs/taro'
import { useRef, useEffect, useCallback } from 'react'
import appInfoActions from '@/redux/actions/appInfo'
import useActions from '@/hooks/useActions'
import useIsLogin from '@/hooks/useIsLogin'

interface IThrottleRef {
	funCallback: any
}

export function useCheckLogin(funCallback = (any?: any) => any) {
	const { current } = useRef<IThrottleRef>({
		funCallback: () => true,
	})
	const isLogin = useIsLogin()
	const { setShowLayoutLogin } = useActions(appInfoActions)

	useEffect(() => {
		current.funCallback = funCallback
	}, [funCallback])

	return useCallback(
		(...args) => {
			// console.log('useCheckLogin', memberInfo.user_openid)
			if (isLogin) {
				current.funCallback.call(this, ...args)
			} else {
				setShowLayoutLogin(true)
			}
		},
		[isLogin]
	)
}

export default useCheckLogin
