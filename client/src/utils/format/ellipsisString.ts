/**
 * 考虑全角半角截取字符串，超出部分以省略号处理
 * @param str
 * @param len 半角计数长度
 * @return '一二三...'
 */
export const ellipsisString = (str, len) => {
	let str_length = 0
	let str_len = 0
	let str_cut = new String()
	str_len = str.length
	for (let i = 0; i < str_len; i++) {
		const a = str.charAt(i)
		str_length++
		if (escape(a).length > 4) {
			//中文字符的长度经编码之后大于4
			str_length++
		}
		str_cut = str_cut.concat(a)
		if (str_length >= len && str !== str_cut) {
			str_cut = str_cut.concat('...')
			return str_cut
		}
	}
	return str
}

export default ellipsisString
