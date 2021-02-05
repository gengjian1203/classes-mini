// 云函数入口文件
const cloud = require('wx-server-sdk')
const addMember = require('addMember/index.js')
const loginMember = require('loginMember/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

/**
 * 用以处理成员的相关接口
 * @param {*} event
 * @param {*} context
 */
exports.main = async (event, context) => {
	const { OPENID, APPID, UNIONID } = cloud.getWXContext()

	const db = cloud.database()
	const memberId = `mem-${OPENID}`
	console.log('请求人:', memberId, event.type)

	const objFunction = {
		ADD_MEMBER: await addMember(event, db, memberId), // 注册成员
		LOGIN_MEMBER: await loginMember(event, db, memberId), // 成员登录
	}

	let objResult = objFunction[event.type]

	return objResult
}
