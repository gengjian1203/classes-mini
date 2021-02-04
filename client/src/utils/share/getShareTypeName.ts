export const shareType = {
	MINIPROGRAM: {
		name: 'MINIPROGRAM',
		title: '搜索小程序',
	},
	PATH_POPULARIZE: {
		name: 'PATH_POPULARIZE',
		title: '分享邀请链接',
	},
	QRCODE_POPULARIZE: {
		name: 'QRCODE_POPULARIZE',
		title: '分享邀请二维码',
	},
	PATH_ARTICLE: {
		name: 'PATH_ARTICLE',
		title: '分享文章链接',
	},
	QRCODE_ARTICLE: {
		name: 'QRCODE_ARTICLE',
		title: '分享文章二维码',
	},
	PATH_AVATAR_SHOW: {
		name: 'PATH_AVATAR_SHOW',
		title: '分享头像秀链接',
	},
	QRCODE_AVATAR_SHOW: {
		name: 'QRCODE_AVATAR_SHOW',
		title: '分享头像秀二维码',
	},
	PATH_PERSONALITY: {
		name: 'PATH_PERSONALITY',
		title: '分享个性链接',
	},
	QRCODE_PERSONALITY: {
		name: 'QRCODE_PERSONALITY',
		title: '分享个性二维码',
	},
}

/**
 * 解析分享途径枚举
 * @param strShareType
 * @return
 */
export const getShareTypeName = (strShareType: string) => {
	const strResult = shareType[strShareType]?.title

	return strResult ? strResult : `未知-${strShareType}`
}

export default { shareType, getShareTypeName }
