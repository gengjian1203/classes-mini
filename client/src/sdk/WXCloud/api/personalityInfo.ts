import CloudFetch from '../services/CloudFetch'

interface IQueryPersonalityInfoType {
  _id?: string // 个性主的memId
}
/**
 * 查询文章信息
 * @return
 */
const queryPersonalityInfo = async (objParams?: IQueryPersonalityInfoType) => {
  const params = {
    type: 'QUERY_PERSONALITY',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchPersonalityInfo', params)
  console.log('queryPersonalityInfo', res)
  return res.data
}

export default {
  queryPersonalityInfo
}
