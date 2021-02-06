/**
 * addClass
 * 新建班级
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

// 创建角色
const createClass = async (data, db, strMemberId, date, time) => {
	let objResult = {}
	// 创建新用户
	const objClass = {
		// 创建基本信息
		// 系统级
		base_countLogin: 0, // 登录次数
		base_createDate: date, // 创建时间
		base_createTime: time, // 创建时间
		base_updateDate: date, // 修改时间
		base_updateTime: time, // 修改时间
		// 班级信息
		data_logo: data.logo || '', // Logo
		data_title: data.title || '', // 班级名称
		data_describe: data.describe || '', // 班级描述
		data_address: data.address || '', // 班级地址
		// 模板信息
		module_template: [
			{ type: 'BANNER', content: '' },
			{ type: 'INFO', content: '' },
			{ type: 'NOTICE', content: '' },
			{ type: 'TAB', content: '' },
		],
		// 冗余信息
		expand_arrMasterList: [strMemberId], // 最高管理员
		expand_arrAdminList: [], // 管理员
		expand_arrStudentList: [], // 班级学生
		expand_arrMemberList: [], // 班级家长
	}
	// 创建新的玩家信息
	try {
		console.log('createClass1', objClass)
		const res = await db.collection('TB_CLASS').add({ data: objClass })
		console.log('createClass2', res._id)
		objResult = {
			data: {
				...objClass,
				_id: res._id,
			},
		}
	} catch (e) {
		objResult = {
			data: e,
		}
		console.error('createClass error', e)
	}

	return objResult
}

async function addClass(data, db, strMemberId) {
	let objResult = {}
	const date = new Date()
	const YYYY = date.getFullYear()
	const MM = date.getMonth() + 1
	const DD = date.getDate()
	const hh = date.getHours()
	const mm = date.getMinutes()
	const ss = date.getSeconds()
	const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`

	// 创建班级
	objResult = await createClass(data, db, strMemberId, date, time)
	// 更新班级列表冗余

	return objResult
}

module.exports = addClass
