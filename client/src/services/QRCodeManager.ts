import webApi from '@/api'
import Config from '@/config/index'
import ResourceManager from '@/services/ResourceManager'

// 获取二维码
const createQRCode = async strSharePath => {
	const objParam = {
		strSharePath: strSharePath,
	}
	const res = await webApi.qrcodeInfo.createQRCode(objParam)
	console.log('createQRCode', res)
	const strQRCodeFileId = res.strQRCodeFileId
	const strQRCodeUrl = await ResourceManager.getUrl(
		Config.cloudPathQRCode + strQRCodeFileId
	)
	return strQRCodeUrl
}

/**
 * 二维码管理器器
 */
export default class QRCodeManager {
	// 单例对象
	static _instance: QRCodeManager
	static _mapQRCode: Map<any, any>

	constructor() {}

	static getInstance() {
		if (!this._instance) {
			this._instance = new QRCodeManager()
			this._mapQRCode = new Map()
		}
		return this._instance
	}

	static getStaticQRCode(strSharePath) {
		const strUrl = this._mapQRCode.get(strSharePath)
		// console.log('getStaticUrl', strSourceUrl, this._mapQRCode, strUrl)
		if (strUrl) {
			return strUrl
		} else {
			setTimeout(async () => {
				const strResult = await createQRCode(strSharePath)
				this._mapQRCode.set(strSharePath, strResult)
				// console.log('QRCodeManager getUrl3', this._mapQRCode)
			}, 0)
			return ''
		}
	}

	static async getQRCode(strSharePath) {
		const strUrl = this._mapQRCode.get(strSharePath)
		// console.log('QRCodeManager getUrl', strSourceUrl, strUrl)
		if (strUrl) {
			return strUrl
		} else {
			const strResult = await createQRCode(strSharePath)
			this._mapQRCode.set(strSharePath, strResult)
			// console.log('QRCodeManager getUrl2', strResult)
			// console.log('QRCodeManager getUrl3', this._mapQRCode)
			return strResult
		}
	}
}
