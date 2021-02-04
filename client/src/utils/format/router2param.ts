/**
 * 将页面路径和参数对象，转换成对象
 * @param strPath 路径
 * @return 合成的路由字符串
 */
export const router2param = (strPath: string = '') => {
	let strResultPath = ''
	let objResultParam = {}

	const nIndexPath = strPath.indexOf('?')
	if (nIndexPath >= 0) {
		strResultPath = strPath.substring(0, nIndexPath)
		const strParam = strPath.slice(nIndexPath + 1)
		const arrParam = strParam.split('&')
		console.log('router2param', strResultPath, strParam, arrParam)

		for (let strItem of arrParam) {
			const arrKeyAndValue = strItem.split('=')
			if (arrKeyAndValue.length === 2) {
				objResultParam[arrKeyAndValue[0]] = arrKeyAndValue[1]
			}
		}
	}

	console.log('router2param', objResultParam)

	return objResultParam
}

export default router2param
