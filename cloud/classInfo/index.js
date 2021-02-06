// 云函数入口文件
const cloud = require('wx-server-sdk')
const addClass = require('addClass/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

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

	const objFunction = {
		ADD_CLASS: await addClass(data, db, memberId), // 新建班级
	}

	let objResult = objFunction[type]

	return objResult
}
