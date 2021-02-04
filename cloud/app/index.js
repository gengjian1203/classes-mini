// 云函数入口文件
const cloud = require('wx-server-sdk')
const queryAppTabBar = require('queryAppTabBar/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

/**
 * 用以处理APP级相关接口
 * @param {*} event
 * @param {*} context
 */
exports.main = async (event, context) => {
	const { OPENID, APPID, UNIONID } = cloud.getWXContext()

	const db = cloud.database()
	const memberId = `mem-${OPENID}`
	console.log('请求人:', memberId, event.type)

	const objFunction = {
		QUERY_APP_TAB_BAR: await queryAppTabBar(event, db, memberId), // 查询APP级别底部导航
	}

	let objResult = objFunction[event.type]

	return objResult
}
