import Taro from '@tarojs/taro'

// 缓存内容管理器
export default class StorageManager {
	// 单例对象
	static _instance: StorageManager

	// 缓存数据
	// objUserInfo

	static getInstance() {
		if (!this._instance) {
			this._instance = new StorageManager()
		}
		return this._instance
	}

	// 同步存缓存
	setStorageSync(key: string, data: any) {
		const strKey = `SM-${key}`
		Taro.setStorageSync(strKey, data)
		return true
	}

	// 异步存缓存
	getStorageSync(key: string) {
		const strKey = `SM-${key}`
		return Taro.getStorageSync(strKey)
	}
}
