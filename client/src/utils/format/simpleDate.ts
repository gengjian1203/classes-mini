/**
 * 简化日期字符串
 * @param strDate
 * @return 只返回年月日
 */
export const simpleDate = (strDate: string = '') => {
	let strResult = strDate.substring(0, strDate.indexOf('T'))
	return strResult
}

export default simpleDate
