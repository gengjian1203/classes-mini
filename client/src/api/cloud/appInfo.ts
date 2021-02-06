import CloudFetch from '@/services/CloudFetch'

const CLOUD_NAME = 'appInfo'

/**
 * 查询APP级别底部导航
 */
const queryAppTabBar = async (objParams?: any) => {
	const params = {
		type: 'QUERY_APP_TAB_BAR',
	}
	const res = await CloudFetch.callFunction(CLOUD_NAME, params)
	console.log('queryAppTabBar', res)
	return res.data
}

export default {
	queryAppTabBar,
}
