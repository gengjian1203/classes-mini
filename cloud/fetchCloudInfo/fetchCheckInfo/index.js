// 云函数入口文件
const cloud = require('wx-server-sdk')
const checkImage = require('checkImage/index.js')
const checkText = require('checkText/index.js')

cloud.init({
	env: cloud.DYNAMIC_CURRENT_ENV, // API 调用都保持和云函数当前所在环境一致
})

// 校验返回值
const validResult = objTmp => {
	if (objTmp.code) {
		objTmp.code = 500
	}
	return objTmp
}

/**
 * checkContent
 * 处理跟 内容校验 相关的信息
 * @param {*} event
 * @param {*} context
 * @returns
 */
// 云函数入口函数
exports.main = async (event, context) => {
	const { OPENID, APPID, UNIONID } = cloud.getWXContext()

	let objResult = {}

	const strMemberId = `mem-${OPENID}`
	console.log('请求人:', strMemberId, event.type)
	// console.log('checkContent.', event.type, event.data)

	switch (event.type) {
		case 'IMAGE':
			objResult = await checkImage(event.data, cloud)
			break
		case 'TEXT':
			objResult = await checkText(event.data, cloud)
			break
		default:
			break
	}

	return validResult(objResult)
}
