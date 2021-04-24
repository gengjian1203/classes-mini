import CloudFetch from '../services/CloudFetch'

interface ICreateQRCodeType {
  strSharePath?: string // 分享路径
}
/**
 * 新增二维码信息
 * @return
 */
const createQRCode = async (objParams?: ICreateQRCodeType) => {
  const params = {
    type: 'CREATE_QRCODE',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchQRCodeInfo', params)
  console.log('createQRCode', res)
  return res.data
}

interface IQueryQRCodeType {
  strQRCodeId?: string // 二维码ID
}
/**
 * 查询二维码信息
 * @return
 */
const queryQRCode = async (objParams?: IQueryQRCodeType) => {
  const params = {
    type: 'QUERY_QRCODE',
    data: objParams
  }
  const res = await CloudFetch.callFunction('fetchQRCodeInfo', params)
  console.log('queryQRCode', res)
  return res.data
}

export default {
  createQRCode,
  queryQRCode
}
