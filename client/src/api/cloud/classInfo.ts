import CloudFetch from '@/services/CloudFetch'

const CLOUD_NAME = 'classInfo'

/**
 * 新建班级
 */
const addClass = async (objParams?: any) => {
	const params = {
		type: 'ADD_CLASS',
		data: objParams,
	}
	const res = await CloudFetch.callFunction(CLOUD_NAME, params)
	console.log('addClass', res)
	return res.data
}

export default {
	addClass,
}
