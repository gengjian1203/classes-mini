/**
 * 格式化正常日期字符串
 * @param strDate
 * @return 年-月-日 时:分:秒
 */
export const normalDate = (strDate: string = '') => {
	let strResult = strDate.substring(0, strDate.indexOf('.'))
	return strResult.replace('T', ' ')
}

export default normalDate
