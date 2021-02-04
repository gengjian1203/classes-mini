import Taro from '@tarojs/taro'
import { UUID } from '@/utils/index'
import webApi from '@/api'

// 将图片上传到云存储中
const upload = (strImageUrl, strCloudPath) => {
	const strFileName = UUID()
	const strSecurityCloudPath = `${strCloudPath}${strFileName}.png`
	return new Promise((resolve, reject) => {
		Taro.cloud.uploadFile({
			cloudPath: strSecurityCloudPath,
			filePath: strImageUrl, // 文件路径
			success: res => {
				console.log('checkSecurityImage uploadFile', res)
				resolve(res.fileID)
			},
			fail: err => {
				console.error('checkSecurityImage uploadFile', err)
				resolve('')
			},
		})
	})
}

// 调用接口校验图片
const checkImage = strImageId => {
	return new Promise(async (resolve, reject) => {
		const objParam = {
			value: strImageId,
		}
		const resCheck = await webApi.checkContent.checkImage(objParam)
		// console.log('checkSecurityImage checkImage', resCheck)
		if (resCheck && resCheck.errCode === 0) {
			resolve(strImageId)
		} else {
			resolve('DANGER IMAGE')
		}
	})
}

/**
 * 上传图片
 * @param strImageUrl 图片Url
 * @param strCloudPath 存储云端路径
 * @return 返回ID即为上传成功，返回空即为上传失败，返回'DANGER IMAGE'即为敏感图片
 */
export const uploadImage = async (strImageUrl, strCloudPath) => {
	let strResult = ''
	// 上传图片
	strResult = await upload(strImageUrl, strCloudPath)
	if (strResult) {
		// 校验图片
		strResult = await checkImage(strResult)
	}
	return strResult
}

export default uploadImage
