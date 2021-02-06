import CloudFetch from '@/services/CloudFetch'

const CLOUD_NAME = 'memberInfo'

/**
 * 注册成员
 */
const addMember = async (objParams?: any) => {
	const params = {
		type: 'ADD_MEMBER',
		data: objParams,
	}
	const res = await CloudFetch.callFunction(CLOUD_NAME, params)
	console.log('addMember', res)
	return res.data
}

/**
 * 成员登录
 */
const loginMember = async (objParams?: any) => {
	const params = {
		type: 'LOGIN_MEMBER',
	}
	const res = await CloudFetch.callFunction(CLOUD_NAME, params)
	console.log('loginMember', res)
	return res.data
}

export default {
	addMember,
	loginMember,
}
