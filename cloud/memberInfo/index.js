// 云函数入口文件
const cloud = require('wx-server-sdk')
const addMember = require('addMember/index.js')
const loginMember = require('loginMember/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

const objFunction = {
	ADD_MEMBER: addMember, // 注册成员
	LOGIN_MEMBER: loginMember, // 成员登录
}

/**
 * 用以处理成员的相关接口
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
