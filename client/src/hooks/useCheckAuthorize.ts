/**
 * 校验小程序授权
 * 默认间隔 1000ms
 */
import Taro from '@tarojs/taro'
import { useRef, useEffect, useCallback } from 'react'

interface IThrottleRef {
	funCallback: any
}

export function useCheckAuthorize(
	strScope:
		| 'scope.userInfo' // 是否授权用户信息，对应接口 wx.getUserInfo
		| 'scope.userLocation' // 是否授权地理位置，对应接口 wx.getLocation, wx.chooseLocation
		| 'scope.address' // 是否授权通讯地址，对应接口 wx.chooseAddress
		| 'scope.invoiceTitle' // 是否授权发票抬头，对应接口 wx.chooseInvoiceTitle
		| 'scope.invoice' // 是否授权获取发票，对应接口 wx.chooseInvoice
		| 'scope.werun' // 是否授权微信运动步数，对应接口 wx.getWeRunData
		| 'scope.record' // 是否授权录音功能，对应接口 wx.startRecord
		| 'scope.writePhotosAlbum' // 是否授权保存到相册 wx.saveImageToPhotosAlbum, wx.saveVideoToPhotosAlbum
		| 'scope.camera', // 是否授权摄像头，对应[camera]((camera)) 组件
	funCallback = (any?: any) => any
) {
	const { current } = useRef<IThrottleRef>({
		funCallback: () => true,
	})

	useEffect(() => {
		current.funCallback = funCallback
	}, [funCallback])

	return useCallback(
		(...args) => {
			Taro.getSetting({
				success: resGetSetting => {
					if (resGetSetting.authSetting[strScope] === false) {
						// 拒绝过授权
						Taro.showModal({
							title: '提示',
							content: '请同意小程序授权，否则将无法使用对应功能',
							success: resShowModal => {
								if (resShowModal.confirm) {
									Taro.openSetting()
								}
							},
						})
					} else if (resGetSetting.authSetting[strScope] === true) {
						// 同意过授权
						current.funCallback.call(this, ...args)
					} else {
						// 第一次授权
						Taro.authorize({
							scope: strScope,
							success: resAuthorize => {
								current.funCallback.call(this, ...args)
							},
						})
					}
				},
			})
		},
		[strScope]
	)
}

export default useCheckAuthorize
