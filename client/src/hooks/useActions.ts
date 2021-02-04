/**
 * 执行action
 */

import { useDispatch } from 'react-redux'
import { useMemo } from 'react'

export function useActions<T>(actionCreators, deps?: []): T {
	const dispatch = useDispatch()

	return useMemo(
		() => actionCreators(dispatch),
		deps ? [dispatch, ...deps] : [dispatch]
	)
}

export default useActions
