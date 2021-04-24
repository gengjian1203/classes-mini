import WXCloudManager from './WXCloudManager'

const callFunction: any = async (strCloudName: string, objCloudParams: any) => {
	return new Promise(async (resolve, reject) => {
		const wxCloud = (await WXCloudManager.getInstance()).wxCloud
		console.log('callFunction', strCloudName, objCloudParams)
		wxCloud
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
