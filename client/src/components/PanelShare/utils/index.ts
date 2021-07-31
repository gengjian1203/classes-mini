import Taro from '@tarojs/taro'
import StorageManager from '@/services/StorageManager'
import ResourceManager from '@/services/ResourceManager'
import { ellipsisString } from '@/utils/index'

import {
	PANEL_SHARE_WIDTH,
	PANEL_SHARE_HEIGHT,
	IConfigType,
	CanvasShareConfig,
} from './config'

const m_managerStorage = StorageManager.getInstance()

/**
 * 绘制海报主题内容
 * @param canvas
 * @param config
 */
const drawShareBackground = (
	canvas: Taro.CanvasContext,
	config: IConfigType
) => {
	const objConfigBackground = config.objBackground

	if (objConfigBackground.strBackgroundUrl) {
		canvas.drawImage(
			ResourceManager.getStaticUrl(objConfigBackground.strBackgroundUrl),
			objConfigBackground.nBackgroundX,
			objConfigBackground.nBackgroundY,
			objConfigBackground.nBackgroundWidth,
			objConfigBackground.nBackgroundHeight
		)
	} else {
		console.error('drawCanvasShare strBackgroundUrl is null.')
	}
}

/**
 * 绘制海报主题内容
 * @param canvas
 * @param config
 * @param strContentUrl
 */
const drawShareContent = (
	canvas: Taro.CanvasContext,
	config: IConfigType,
	strContentUrl: string
) => {
	const objConfigContent = config.objContent

	if (strContentUrl) {
		canvas.drawImage(
			ResourceManager.getStaticUrl(strContentUrl),
			objConfigContent.nContentX,
			objConfigContent.nContentY,
			objConfigContent.nContentWidth,
			objConfigContent.nContentHeight
		)
	} else {
		console.error('drawCanvasShare strContentUrl is null.')
	}
}

/**
 * 绘制分享人身份
 * @param canvas
 * @param config
 */
const drawShareSource = (canvas: Taro.CanvasContext, config: IConfigType) => {
	const objMemberInfo = m_managerStorage.getStorageSync('memberInfo')
	const objConfigSource = config.objSource

	if (objMemberInfo && objMemberInfo.user_avatarUrl) {
		const nRadius = Math.floor(objConfigSource.nSourceAvatarWidth / 2)
		// 绘制头像
		canvas.save()
		canvas.beginPath()
		canvas.arc(
			objConfigSource.nSourceAvatarX + nRadius,
			objConfigSource.nSourceAvatarY + nRadius,
			nRadius,
			0,
			Math.PI * 2
		)
		canvas.clip()
		canvas.drawImage(
			ResourceManager.getStaticUrl(objMemberInfo.user_avatarUrl),
			objConfigSource.nSourceAvatarX,
			objConfigSource.nSourceAvatarY,
			objConfigSource.nSourceAvatarWidth,
			objConfigSource.nSourceAvatarHeight
		)
		canvas.restore()
		// 绘制昵称
		canvas.strokeStyle = objConfigSource.strSourceNameColor
		canvas.setFontSize(objConfigSource.nSourceNameFontSize)
		canvas.fillText(
			ellipsisString(objMemberInfo.user_nickName, 18),
			objConfigSource.nSourceNameX,
			objConfigSource.nSourceNameY
		)
	} else {
		console.error('drawCanvasShare user_avatarUrl is null.')
	}
}

/**
 * 绘制二维码
 * @param canvas
 * @param config
 */
const drawShareQRCode = (
	canvas: Taro.CanvasContext,
	config: IConfigType,
	strQRCodeUrl: string
) => {
	const objConfigQRCode = config.objQRCode

	if (strQRCodeUrl) {
		canvas.drawImage(
			ResourceManager.getStaticUrl(strQRCodeUrl),
			objConfigQRCode.nQRCodeX,
			objConfigQRCode.nQRCodeY,
			objConfigQRCode.nQRCodeWidth,
			objConfigQRCode.nQRCodeHeight
		)
	} else {
		console.error('drawCanvasShare drawQRCode is null.')
	}
}

/**
 * 绘制附属内容
 * @param canvas
 * @param config
 */
const drawShareExtend = (canvas: Taro.CanvasContext, config: IConfigType) => {
	const objConfigExtend = config.objExtend

	if (objConfigExtend) {
		// 绘制昵称
		canvas.strokeStyle = objConfigExtend.strExtendColor
		canvas.setFontSize(objConfigExtend.nExtendFontSize)
		canvas.fillText(
			objConfigExtend.strExtendText,
			objConfigExtend.nExtendX,
			objConfigExtend.nExtendY
		)
	} else {
		console.error('drawCanvasShare drawQRCode is null.')
	}
}

/**
 * 绘制canvas分享图主函数
 * @param canvas
 * @param strContentUrl
 * @param strQRCodeUrl
 * @param index
 */
export const drawCanvasShare = (
	canvas: Taro.CanvasContext,
	strContentUrl: string = '',
	strQRCodeUrl: string = '',
	index: number = 0
) => {
	console.log('drawCanvasShare.')
	const config = CanvasShareConfig[index % CanvasShareConfig.length]

	if (canvas) {
		// 绘制海报背景
		drawShareBackground(canvas, config)
		// 绘制海报主题内容
		drawShareContent(canvas, config, strContentUrl)
		// 绘制分享人身份
		drawShareSource(canvas, config)
		// 绘制二维码
		drawShareQRCode(canvas, config, strQRCodeUrl)
		// 绘制附属内容
		drawShareExtend(canvas, config)
	} else {
		console.error('drawCanvasShare canvas is null.')
	}
}

export default {
	PANEL_SHARE_WIDTH,
	PANEL_SHARE_HEIGHT,
	drawCanvasShare,
}
