/**
 * 是否登录
 * 默认间隔 1000ms
 */

import { useSelector } from 'react-redux'

export function useIsLogin(): boolean {
	const memberInfo = useSelector(state => state.memberInfo)

	return Boolean(memberInfo._id)
}

export default useIsLogin
