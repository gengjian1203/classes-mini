/**
 * 将页面路径和参数对象，拼成可以跳转路由的字符串
 * @param strPath 路径
 * @param objParams 跳转参数
 * @return 合成的路由字符串
 */
export const router2url = (strPath: string = '', objParams: object = {}) => {
	let strResult = strPath
	let isFirstParam = true

	for (let key in objParams) {
		if (isFirstParam) {
			strResult += `?${key}=${objParams[key]}`
			isFirstParam = false
		} else {
			strResult += `&${key}=${objParams[key]}`
		}
	}

	return strResult
}

export default router2url
