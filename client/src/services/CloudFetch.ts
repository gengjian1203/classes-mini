import Taro from '@tarojs/taro'

const callFunction: any = async (strCloudName: string, objCloudParams: any) => {
	return new Promise((resolve, reject) => {
		Taro.cloud
			.callFunction({
				name: strCloudName,
				data: objCloudParams,
			})
			.then(res => {
				resolve(res.result)
			})
			.catch(err => {
				reject(err)
			})
	})
}

export default {
	callFunction,
}
