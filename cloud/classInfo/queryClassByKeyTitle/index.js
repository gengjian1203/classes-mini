/**
 * queryClassByKeyTitle
 * 通过关键字查询班级列表
 * @param {*} event
 * @param {*} db
 * @param {*} strMemberId
 * @returns
 */

const MAX_LIMIT = 20

async function queryClassByKeyTitle(data, db, strMemberId) {
	let objResult = {}

	const { pageNum = 0, pageSize = MAX_LIMIT, keyTitle = '' } = data
	const where = db.collection('TB_CLASS').where({
		data_title: db.RegExp({
			regexp: `[\s\S]*${keyTitle}[\s\S]*`,
			options: 'i',
		}),
	})

	console.log('queryClassByKeyTitle param data', pageNum, pageSize, keyTitle)

	const [resDataList, resTotal] = await Promise.all([
		where
			.orderBy('base_createDate', 'desc')
			.skip(pageNum * pageSize)
			.limit(pageSize)
			.get(),
		where.orderBy('base_createDate', 'desc').count(),
	])

	console.log('queryClassByKeyTitle resTotal', resTotal)

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

module.exports = queryClassByKeyTitle
