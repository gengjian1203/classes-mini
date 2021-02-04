import CloudFetch from '@/services/CloudFetch'

/**
 * 查询APP级别底部导航
 */
const queryAppTabBar = async () => {
	const params = {
		type: 'QUERY_APP_TAB_BAR',
	}
	const res = await CloudFetch.callFunction('app', params)
	console.log('queryAppTabBar', res)
	return res.data
}

export default {
	queryAppTabBar,
}
