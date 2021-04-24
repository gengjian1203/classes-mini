import CloudFetch from '../services/CloudFetch'

/**
 * 新增测试文章信息
 * @return
 */
const spiderArticleInfo = async () => {
  const params = {}
  const res = await CloudFetch.callFunction('spiderArticleInfo', params)
  console.log('spiderArticleInfo', res)
  return res.data
}

export default {
  spiderArticleInfo
}
