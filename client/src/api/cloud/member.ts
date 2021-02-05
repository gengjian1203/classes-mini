import CloudFetch from '@/services/CloudFetch'

/**
 * 注册成员
 */
const addMember = async (objParams?: any) => {
	const params = {
		type: 'ADD_MEMBER',
		data: objParams,
	}
	const res = await CloudFetch.callFunction('member', params)
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
	const res = await CloudFetch.callFunction('member', params)
	console.log('loginMember', res)
	return res.data
}

export default {
	addMember,
	loginMember,
}
