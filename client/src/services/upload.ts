import Taro from '@tarojs/taro'
import Config from '../kit-base/config'
import EnvConfig from '../kit-base/env-config'

const { miniProgram } = Taro.getAccountInfoSync()

function uploadFile(filePath: string, success: Function, fail: Function) {
	const loginInfo = wx.getStorageSync('loginInfo')
	const { session, token, cellphone } = loginInfo
	let url = EnvConfig.COMMON_HOST + '/image/upload'
	let Authorization = session
	if (!cellphone && token) {
		Authorization = ''
		url = EnvConfig.COMMON_HOST + '/image/uploadExcludeLogin'
	}
	console.log('upload.....', url, filePath, Authorization, token)
	const header = {
		Origin: 'wxapp://i.miniapp.qianmi.com',
		Platform: 'wechat',
		'WX-APPID': Config.EXT_CONFIG.wechatAppId,
		APPID: Config.EXT_CONFIG.appId,
		Version: miniProgram.envVersion,
		'Publish-Version': Config.ACCOUNT_INFO.miniProgram.version,
		'Version-Type': Config.ACCOUNT_INFO.miniProgram.envVersion,
		'Access-Control-Allow-Origin': '*',
		token: token,
		Authorization: Authorization, //SSO登录信息校验，必传
	}

	return Taro.uploadFile({
		url,
		filePath,
		name: 'file',
		header: header,
		success: res => success(res),
		fail: err => fail(err),
	})
}

const Upload = { uploadFile }

export type UploadType = typeof Upload

export default Upload
