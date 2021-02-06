/**
 * loginMember
 * 成员登录
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 更新用户信息
const updateMemberInfo = async (db, strMemberId, objMemberData) => {
	let objResult = {}

	try {
		if (objMemberData !== null) {
			const { _id, ...dataOther } = objMemberData.data
			const date = new Date()
			const YYYY = date.getFullYear()
			const MM = date.getMonth() + 1
			const DD = date.getDate()
			const hh = date.getHours()
			const mm = date.getMinutes()
			const ss = date.getSeconds()
			const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`
			const nCountLogin = dataOther.app_countLogin
				? ++dataOther.app_countLogin
				: 1

			const data = {
				...dataOther,
				app_loginDate: date, // 登录时间
				app_loginTime: time, // 登录时间
				app_updateDate: date, // 修改时间
				app_updateTime: time, // 修改时间
				app_countLogin: nCountLogin, // 更新登录次数
			}

			console.log('updateMemberInfo', strMemberId, data.app_countLogin, data)
			await db.collection('TB_MEMBER').doc(strMemberId).update({
				data: data,
			})

			objResult = data
		}
	} catch (e) {
		console.log('updateMemberInfo error.', e)
	}

	return objResult
}

async function loginMember(event, db, strMemberId) {
	let objResult = {}
	let objMemberData = null
	let objMemberInfo = {}
	// 查询是否为已注册用户
	try {
		objMemberData = await db.collection('TB_MEMBER').doc(strMemberId).get()
	} catch (e) {
		console.error('queryMemberInfo error', e)
	}

	// 更新用户信息
	objMemberInfo = await updateMemberInfo(db, strMemberId, objMemberData)

	objResult = {
		data: objMemberInfo,
	}

	return objResult
}

module.exports = loginMember
