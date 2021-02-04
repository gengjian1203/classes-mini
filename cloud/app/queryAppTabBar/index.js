/**
 * queryAppTabBar
 * 查询APP级别底部导航
 * @param {*} event
 * @param {*} db
 * @param {*} memberId
 * @returns
 */

async function queryAppTabBar(event, db, memberId) {
	objResult = {
		data: [
			{
				id: '0000001',
				title: '首页',
				contentType: 'HOME',
			},
			{
				id: '0000002',
				title: '班级',
				contentType: 'CLASS_LIST',
			},
			{
				id: '0000000',
				title: '我的',
				contentType: 'MINE',
			},
		],
	}

	return objResult
}

module.exports = queryAppTabBar
