/**
 * queryClassByMemberId
 * 通过MemberId查询班级列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 20

async function queryClassByMemberId(data, db, strMemberId) {
	let objResult = {}

	const { pageNum = 0, pageSize = MAX_LIMIT, memberId = strMemberId } = data
	const _ = db.command
	const where = db.collection('TB_CLASS').where(
		_.or([
			{
				expand_arrMasterList: _.in([memberId]),
			},
			{
				expand_arrAdminList: _.in([memberId]),
			},
			{
				expand_arrStudentList: _.in([memberId]),
			},
			{
				expand_arrMemberList: _.in([memberId]),
			},
		])
	)

	console.log('queryClassByMemberId param data', pageNum, pageSize, memberId)

	const [resDataList, resTotal] = await Promise.all([
		where
			.orderBy('base_createDate', 'desc')
			.skip(pageNum * pageSize)
			.limit(pageSize)
			.get(),
		where.orderBy('base_createDate', 'desc').count(),
	])

	console.log('queryClassByMemberId resTotal', resTotal)

	try {
		objResult = {
			data: {
				dataList: resDataList.data,
				totalCount: resTotal.total,
			},
		}
	} catch (e) {
		// 没有查到。异常。
		objResult = {
			data: e,
		}
		console.error('queryClass error', e)
	}

	return objResult
}

module.exports = queryClassByMemberId
