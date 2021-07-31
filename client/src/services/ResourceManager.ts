import ResourceDownLoadAdaptor from '@/services/ResourceDownLoadAdaptor'
import * as imagesLocal from '@/services/ResourceImage'

/**
 * 资源加载器
 */
export default class ResourceManager {
	// 单例对象
	static _instance: ResourceManager
	static _mapResource: Map<any, any>

	constructor() {}

	static getInstance() {
		if (!this._instance) {
			this._instance = new ResourceManager()
			this._mapResource = new Map()
		}
		return this._instance
	}

	static loadingAllResource() {
		for (let item in imagesLocal) {
			this.getStaticUrl(imagesLocal[item])
		}
	}

	static getStaticUrl(strSourceUrl) {
		if (strSourceUrl.startsWith('http://tmp/')) {
			return strSourceUrl
		} else {
			const strUrl = this._mapResource.get(strSourceUrl)
			if (strUrl) {
				return strUrl
			} else {
				setTimeout(async () => {
					const strResult = await ResourceDownLoadAdaptor.apply(strSourceUrl)
					if (strResult !== 'url-unknown') {
						this._mapResource.set(strSourceUrl, strResult)
						// console.log('getStaticUrl', this._mapResource)
					}
				}, 0)
				return ''
			}
		}
	}

	static async getUrl(strSourceUrl) {
		if (strSourceUrl.startsWith('http://tmp/')) {
			return strSourceUrl
		} else {
			const strUrl = this._mapResource.get(strSourceUrl)
			if (strUrl) {
				return strUrl
			} else {
				const strResult = await ResourceDownLoadAdaptor.apply(strSourceUrl)
				if (strResult !== 'url-unknown') {
					this._mapResource.set(strSourceUrl, strResult)
					return strResult
				} else {
					return strSourceUrl
				}
			}
		}
	}
}
