/**
 * 获取头像高清Url
 * @param strAvatarUrl 用户头像
 * @return
 */
export const getHDAvatarUrl = strAvatarUrl => {
	console.log('原来的头像', strAvatarUrl)
	const arrAvatarUrl = strAvatarUrl.split('/') //把头像的路径切成数组
	//把大小数值为 46 || 64 || 96 || 132 的转换为0
	if (
		arrAvatarUrl[arrAvatarUrl.length - 1] &&
		(arrAvatarUrl[arrAvatarUrl.length - 1] === '46' ||
			arrAvatarUrl[arrAvatarUrl.length - 1] === '64' ||
			arrAvatarUrl[arrAvatarUrl.length - 1] === '96' ||
			arrAvatarUrl[arrAvatarUrl.length - 1] === '132')
	) {
		arrAvatarUrl[arrAvatarUrl.length - 1] = 0
	}
	const strAvatarUrlTmp = arrAvatarUrl.join('/') //重新拼接为字符串
	console.log('高清的头像', strAvatarUrlTmp)
	return strAvatarUrlTmp
}

export default getHDAvatarUrl
