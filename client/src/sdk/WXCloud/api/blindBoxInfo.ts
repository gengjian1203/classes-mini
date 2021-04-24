import CloudFetch from '../services/CloudFetch'

interface IOpenBlindBoxType {
  arrBoxList: Array<any>
  selectIndex: string
  objExclude: any
  objShaking: any
}
/**
 * 查询盲盒列表信息
 * @return
 */
const openBlindBox = async (objParams?: IOpenBlindBoxType) => {
  const params = {
    type: 'OPEN_BLIND_BOX',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchBlindBoxInfo', params)
  console.log('openBlindBox', res)
  return res.data
}

interface IQueryBlindBoxInfoType {}
/**
 * 查询盲盒列表信息
 * @return
 */
const queryBlindBoxInfo = async (objParams?: IQueryBlindBoxInfoType) => {
  const params = {
    type: 'QUERY_BLIND_BOX_INFO',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchBlindBoxInfo', params)
  console.log('queryBlindBoxInfo', res)
  return res.data
}

interface IQueryBlindBoxInfoType {}
/**
 * 查询自身抽取到的盲盒信息
 * @return
 */
const queryBlindBoxList = async (objParams?: IQueryBlindBoxInfoType) => {
  const params = {
    type: 'QUERY_BLINK_BOX_LIST',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchBlindBoxInfo', params)
  console.log('queryBlindBoxList', res)
  return res.data
}
queryBlindBoxList

export default {
  openBlindBox,
  queryBlindBoxInfo,
  queryBlindBoxList
}
