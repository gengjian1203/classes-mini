// 云函数入口文件
const cloud = require('wx-server-sdk')
const addClass = require('addClass/index.js')
const queryClassByKeyTitle = require('queryClassByKeyTitle/index.js')
const queryClassByMemberId = require('queryClassByMemberId/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

const objFunction = {
	ADD_CLASS: addClass, // 新建班级
	QUERY_CLASS_BY_KEY_TITLE: queryClassByKeyTitle, // 通过关键字查询班级列表
	QUERY_CLASS_BY_MEMBER_ID: queryClassByMemberId, // 通过MemberId查询班级列表
}

/**
 * 用以处理班级的相关接口
 * @param {*} event
 * @param {*} context
 */
exports.main = async (event, context) => {
	const { type, data } = event
	const { OPENID, APPID, UNIONID } = cloud.getWXContext()

	const db = cloud.database()
	const memberId = `mem-${OPENID}`
	console.log('请求人:', memberId, type)

	let objResult = await objFunction[type](data, db, memberId)

	return objResult
}
