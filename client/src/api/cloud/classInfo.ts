import CloudFetch from '@/services/CloudFetch'

const CLOUD_NAME = 'classInfo'

/**
 * 新建班级
 */
interface IAddClassParams {
	logo?: string // logo
	title?: string // 班级名称
	describe?: string // 班级介绍
	address?: string // 班级地址
}
const addClass = async (objParams?: IAddClassParams) => {
	const params = {
		type: 'ADD_CLASS',
		data: objParams,
	}
	const res = await CloudFetch.callFunction(CLOUD_NAME, params)
	console.log('addClass', res)
	return res.data
}

/**
 * 通过关键字查询班级列表
 */
interface IQueryClassByKeyTitleParams {
	pageName?: number // 分页数
	pageSize?: number // 每页加载数
	keyTitle?: string // 搜索关键字
}
const queryClassByKeyTitle = async (
	objParams?: IQueryClassByKeyTitleParams
) => {
	const params = {
		type: 'QUERY_CLASS_BY_KEY_TITLE',
		data: objParams,
	}
	const res = await CloudFetch.callFunction(CLOUD_NAME, params)
	console.log('queryClassByKeyTitle', res)
	return res.data
}

/**
 * 通过MemberId查询班级列表
 */
interface IQueryClassByMemberIdParams {
	pageName?: number // 分页数
	pageSize?: number // 每页加载数
	memberId?: string // 搜索关键字
}
const queryClassByMemberId = async (
	objParams?: IQueryClassByMemberIdParams
) => {
	const params = {
		type: 'QUERY_CLASS_BY_MEMBER_ID',
		data: objParams,
	}
	const res = await CloudFetch.callFunction(CLOUD_NAME, params)
	console.log('queryClassByMemberId', res)
	return res.data
}

export default {
	addClass,
	queryClassByKeyTitle,
	queryClassByMemberId,
}
