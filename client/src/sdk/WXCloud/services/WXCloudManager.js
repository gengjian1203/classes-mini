import config from '../config'

export default class WXCloudManager {
	static instance = null

	constructor() {}

	static async getInstance() {
		if (!this.instance) {
			console.log('init WXCloudManager')
			wx.showToast({
				title: '成功',
				icon: 'success',
			})
			this.instance = new WXCloudManager()
			// 声明新的 cloud 实例
			const wxCloud = new wx.cloud.Cloud(config)
			// 跨账号调用，必须等待 init 完成
			// init 过程中，资源方小程序对应环境下的 cloudbase_auth 函数会被调用，并需返回协议字段（见下）来确认允许访问、并可自定义安全规则
			await wxCloud.init()
			this.instance = {
				...this.instance,
				wxCloud,
			}
		}
		return this.instance
	}
}
