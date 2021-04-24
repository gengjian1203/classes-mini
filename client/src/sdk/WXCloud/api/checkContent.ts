import CloudFetch from '../services/CloudFetch'

interface ICheckImageType {
  value: string
}
/**
 * 校验图片的敏感信息
 * @return
 */
const checkImage = async (objParams?: ICheckImageType) => {
  const params = {
    type: 'IMAGE',
    data: objParams
  }
  const res = await CloudFetch.callFunction('checkContent', params)
  console.log('checkImage', res)
  return res.data
}

interface ICheckTextType {
  value: string
}
/**
 * 校验文字的敏感信息
 * @return
 */
const checkText = async (objParams?: ICheckTextType) => {
  const params = {
    type: 'TEXT',
    data: objParams
  }
  const res = await CloudFetch.callFunction('checkContent', params)
  console.log('checkText', res)
  return res.data
}

export default {
  checkImage,
  checkText
}
