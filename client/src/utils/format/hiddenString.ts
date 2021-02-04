/**
 * 隐藏字符串
 * @param strDate
 * @return 年-月-日 时:分:秒
 */
export const hiddenString = (strDate: string = '') => {
	let strResult = ''
	if (strDate !== '') {
		strResult = `${strDate.substring(0, 5)}***`
	}
	return strResult
}

export default hiddenString
