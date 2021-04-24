import CloudFetch from '../services/CloudFetch'

interface IQueryArticleInfoType {
  articleId?: string // 文章ID
}
/**
 * 查询文章信息
 * @return
 */
const queryArticleInfo = async (objParams?: IQueryArticleInfoType) => {
  const params = {
    type: 'INFO',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchArticleInfo', params)
  console.log('queryArticleInfo', res)
  return res.data
}

interface IQueryArticleListType {
  nPageNum?: number // 起始页码
  nPageSize?: number // 每页条数
}
/**
 * 查询文章列表
 * @return
 */
const queryArticleList = async (objParams?: IQueryArticleListType) => {
  const params = {
    type: 'LIST',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchArticleInfo', params)
  console.log('queryArticleList', res)
  return res.data
}

export default {
  queryArticleInfo,
  queryArticleList
}
