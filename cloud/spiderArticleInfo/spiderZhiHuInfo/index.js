/**
 * spiderZhiHuInfo
 * 爬取知乎日报文章
 * @param {*} data
 * @param {*} db
 * @returns
 */
const strServceUrl = 'https://daily.zhihu.com'

const queryZhiHuInfoDetail = async (href, superagent, cheerio, entities) => {
	const objDetail = {}
	const result = await superagent.get(href).charset('utf-8') //取决于网页的编码方式
	// const data = result.text || ''
	const $ = cheerio.load(result.text)
	// console.log('queryZhiHuInfoDetail', data)
	// console.log('queryZhiHuInfoDetail', $)

	const author = $('.author').text() // 作者信息
	objDetail.author = author.slice(0, author.indexOf('，')) // 取逗号之前的字符
	objDetail.author = objDetail.author.replace(/知乎/g, '')
	objDetail.content = entities.decode($('.content').html()) // 文章内容
	objDetail.content = objDetail.content.replace(/知乎/g, '')

	return objDetail
}

async function spiderZhiHuInfo(db, superagent, cheerio, entities) {
	const arrResultList = []
	const result = await superagent.get(strServceUrl).charset('utf-8') //取决于网页的编码方式
	// const data = result.text || ''
	const $ = cheerio.load(result.text)
	// console.log('spiderZhiHuInfo', data)
	// console.log('spiderZhiHuInfo', $)

	const list = $('.main-content-wrap .row').find('.link-button')
	for (let index in list) {
		const date = new Date()
		const YYYY = date.getFullYear()
		const MM = date.getMonth() + 1
		const DD = date.getDate()
		const hh = date.getHours()
		const mm = date.getMinutes()
		const ss = date.getSeconds()
		const time = `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`

		const objInfo = {
			createDate: date, // 创建时间
			createTime: time, // 创建时间
		}
		const objHtml = list.eq(index)
		const href = objHtml.attr('href')
		if (href) {
			// objInfo.id = parseInt(href.substring(7)) // 文章ID
			objInfo.source = 'ZHIHU' // 文章来源
			objInfo.href = `${strServceUrl}${objHtml.attr('href')}` // 文章Url
			objInfo.posterImg = objHtml.find('img').attr('src') // 文章截图
			objInfo.title = objHtml.find('.title').text() // 文章标题

			const { author, content } = await queryZhiHuInfoDetail(
				objInfo.href,
				superagent,
				cheerio,
				entities
			)
			objInfo.author = author // 作者
			objInfo.content = content // 内容
			objInfo.arrCollectionList = [] // 点赞列表

			arrResultList.push(objInfo)
		}
	}

	// console.log('spiderZhiHuInfo', arrResultList)

	return arrResultList
}

module.exports = spiderZhiHuInfo
