import * as imagesLocal from '@/services/ResourceImage'

export const PANEL_SHARE_WIDTH = 300
export const PANEL_SHARE_HEIGHT = 400

interface IBackgroundType {
	strBackgroundUrl: string
	nBackgroundX: number
	nBackgroundY: number
	nBackgroundWidth: number
	nBackgroundHeight: number
}

interface IContentType {
	nContentX: number
	nContentY: number
	nContentWidth: number
	nContentHeight: number
}

interface ISourceType {
	nSourceNameX: number
	nSourceNameY: number
	nSourceNameFontSize: number
	strSourceNameColor: string
	nSourceAvatarX: number
	nSourceAvatarY: number
	nSourceAvatarWidth: number
	nSourceAvatarHeight: number
}

interface IQRCodeType {
	nQRCodeX: number
	nQRCodeY: number
	nQRCodeWidth: number
	nQRCodeHeight: number
}

interface IExtendType {
	nExtendX: number
	nExtendY: number
	nExtendFontSize: number
	strExtendColor: string
	strExtendText: string
}

export interface IConfigType {
	objBackground: IBackgroundType
	objContent: IContentType
	objSource: ISourceType
	objQRCode: IQRCodeType
	objExtend: IExtendType
}

/**
 * 配置文件数值皆为双倍，缩小一倍后再渲染，保证图片质量不虚影
 */
export const CanvasShareConfig: Array<IConfigType> = [
	{
		objBackground: {
			strBackgroundUrl: imagesLocal.strUrlImageShareBg01,
			nBackgroundX: 0,
			nBackgroundY: 0,
			nBackgroundWidth: PANEL_SHARE_WIDTH * 2,
			nBackgroundHeight: PANEL_SHARE_HEIGHT * 2,
		},
		objContent: {
			nContentX: 60,
			nContentY: 60,
			nContentWidth: 480,
			nContentHeight: 480,
		},
		objSource: {
			nSourceNameX: 60,
			nSourceNameY: 680,
			nSourceNameFontSize: 28,
			strSourceNameColor: '#0e0e0e',
			nSourceAvatarX: 60,
			nSourceAvatarY: 560,
			nSourceAvatarWidth: 80,
			nSourceAvatarHeight: 80,
		},
		objQRCode: {
			nQRCodeX: 360,
			nQRCodeY: 560,
			nQRCodeWidth: 200,
			nQRCodeHeight: 200,
		},
		objExtend: {
			nExtendX: 60,
			nExtendY: 740,
			nExtendFontSize: 28,
			strExtendColor: '#0e0e0e',
			strExtendText: '邀请你一起来嗨皮~',
		},
	},
	{
		objBackground: {
			strBackgroundUrl: imagesLocal.strUrlImageShareBg02,
			nBackgroundX: 0,
			nBackgroundY: 0,
			nBackgroundWidth: PANEL_SHARE_WIDTH * 2,
			nBackgroundHeight: PANEL_SHARE_HEIGHT * 2,
		},
		objContent: {
			nContentX: 60,
			nContentY: 60,
			nContentWidth: 480,
			nContentHeight: 480,
		},
		objSource: {
			nSourceNameX: 60,
			nSourceNameY: 680,
			nSourceNameFontSize: 28,
			strSourceNameColor: '#0e0e0e',
			nSourceAvatarX: 60,
			nSourceAvatarY: 560,
			nSourceAvatarWidth: 80,
			nSourceAvatarHeight: 80,
		},
		objQRCode: {
			nQRCodeX: 360,
			nQRCodeY: 560,
			nQRCodeWidth: 200,
			nQRCodeHeight: 200,
		},
		objExtend: {
			nExtendX: 60,
			nExtendY: 740,
			nExtendFontSize: 28,
			strExtendColor: '#0e0e0e',
			strExtendText: '邀请你一起来嗨皮~',
		},
	},
	{
		objBackground: {
			strBackgroundUrl: imagesLocal.strUrlImageShareBg03,
			nBackgroundX: 0,
			nBackgroundY: 0,
			nBackgroundWidth: PANEL_SHARE_WIDTH * 2,
			nBackgroundHeight: PANEL_SHARE_HEIGHT * 2,
		},
		objContent: {
			nContentX: 60,
			nContentY: 60,
			nContentWidth: 480,
			nContentHeight: 480,
		},
		objSource: {
			nSourceNameX: 60,
			nSourceNameY: 680,
			nSourceNameFontSize: 28,
			strSourceNameColor: '#0e0e0e',
			nSourceAvatarX: 60,
			nSourceAvatarY: 560,
			nSourceAvatarWidth: 80,
			nSourceAvatarHeight: 80,
		},
		objQRCode: {
			nQRCodeX: 360,
			nQRCodeY: 560,
			nQRCodeWidth: 200,
			nQRCodeHeight: 200,
		},
		objExtend: {
			nExtendX: 60,
			nExtendY: 740,
			nExtendFontSize: 28,
			strExtendColor: '#0e0e0e',
			strExtendText: '邀请你一起来嗨皮~',
		},
	},
	{
		objBackground: {
			strBackgroundUrl: imagesLocal.strUrlImageShareBg04,
			nBackgroundX: 0,
			nBackgroundY: 0,
			nBackgroundWidth: PANEL_SHARE_WIDTH * 2,
			nBackgroundHeight: PANEL_SHARE_HEIGHT * 2,
		},
		objContent: {
			nContentX: 60,
			nContentY: 60,
			nContentWidth: 480,
			nContentHeight: 480,
		},
		objSource: {
			nSourceNameX: 60,
			nSourceNameY: 680,
			nSourceNameFontSize: 28,
			strSourceNameColor: '#0e0e0e',
			nSourceAvatarX: 60,
			nSourceAvatarY: 560,
			nSourceAvatarWidth: 80,
			nSourceAvatarHeight: 80,
		},
		objQRCode: {
			nQRCodeX: 360,
			nQRCodeY: 560,
			nQRCodeWidth: 200,
			nQRCodeHeight: 200,
		},
		objExtend: {
			nExtendX: 60,
			nExtendY: 740,
			nExtendFontSize: 28,
			strExtendColor: '#0e0e0e',
			strExtendText: '邀请你一起来嗨皮~',
		},
	},
	{
		objBackground: {
			strBackgroundUrl: imagesLocal.strUrlImageShareBg05,
			nBackgroundX: 0,
			nBackgroundY: 0,
			nBackgroundWidth: PANEL_SHARE_WIDTH * 2,
			nBackgroundHeight: PANEL_SHARE_HEIGHT * 2,
		},
		objContent: {
			nContentX: 60,
			nContentY: 60,
			nContentWidth: 480,
			nContentHeight: 480,
		},
		objSource: {
			nSourceNameX: 60,
			nSourceNameY: 680,
			nSourceNameFontSize: 28,
			strSourceNameColor: '#0e0e0e',
			nSourceAvatarX: 60,
			nSourceAvatarY: 560,
			nSourceAvatarWidth: 80,
			nSourceAvatarHeight: 80,
		},
		objQRCode: {
			nQRCodeX: 360,
			nQRCodeY: 560,
			nQRCodeWidth: 200,
			nQRCodeHeight: 200,
		},
		objExtend: {
			nExtendX: 60,
			nExtendY: 740,
			nExtendFontSize: 28,
			strExtendColor: '#0e0e0e',
			strExtendText: '邀请你一起来嗨皮~',
		},
	},
]
