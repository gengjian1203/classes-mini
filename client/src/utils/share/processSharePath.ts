import StorageManager from '@/services/StorageManager'

const m_managerStorage = StorageManager.getInstance()

interface ISharePathType {
	sharePath: string
	[key: string]: any
}

/**
 * 整理分享参数
 * @param objParams 分享传递的参数
 * @return 返回带参数可以用于直接跳转的链接字符串
 */
export function processSharePath(objParams: ISharePathType) {
	const memberInfo = m_managerStorage.getStorageSync('memberInfo')
	// 分享基本参数
	let strBaseUrl =
		`/pages/loading/index` + // 分享中转页
		`?sourceID=${memberInfo._id ? memberInfo._id : ''}` + // 分享人ID
		`&shareType=${objParams.shareType ? objParams.shareType : 'MINIPROGRAM'}` + // 分享途径类型
		`&sharePath=`
	// 分享路径所需参数
	let strExtendUrl = `${objParams.sharePath}?from=share`
	for (let key in objParams) {
		if (key === 'sharePath' || key === 'shareType') {
			continue
		}
		strExtendUrl += `&${key}=${objParams[key]}`
	}
	return strBaseUrl + encodeURIComponent(strExtendUrl)
}

export default processSharePath
