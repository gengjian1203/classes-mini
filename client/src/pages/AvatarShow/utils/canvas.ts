import ResourceManager from '@/services/ResourceManager'
import * as imagesLocal from '@/services/ResourceImage'
import { checkObjectEmpty, mergeObject } from '@/utils/index'

import {
	CANVAS_WIDTH,
	CANVAS_HEIGHT,
	BORDER_COLOR,
	BORDER_BUTTON_SIZE,
} from './const'

/**
 * 绘制头像底图
 * @param canvas
 * @param strAvatarImage
 */
const drawAvatarImage = (canvas, strAvatarImage) => {
	if (strAvatarImage) {
		canvas.drawImage(strAvatarImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
	} else {
		// console.error('drawMainCanvas strAvatarImage is null.')
	}
}

/**
 * 获取图片类型的饰品拓展数据
 * @param strSelectType
 * @param item
 * @param objSelectJewelry
 * @param objTouchPoint
 */
const getRectJewelryExtend = (
	strSelectType,
	item,
	objSelectJewelry,
	objTouchPoint
) => {
	let rectJewelryExtend = { x: 0, y: 0, width: 0, height: 0 }
	if (item.id === objSelectJewelry.id) {
		switch (strSelectType) {
			// 改变选中框尺寸
			case 'BTN_RESIZE': {
				const nMaxOffsett =
					objTouchPoint.nTouchStartX_offset > objTouchPoint.nTouchStartY_offset
						? objTouchPoint.nTouchStartX_offset
						: objTouchPoint.nTouchStartY_offset
				rectJewelryExtend = {
					x: 0,
					y: 0,
					width: nMaxOffsett,
					height: nMaxOffsett,
				}
				break
			}
			// 移动选中框
			case 'MOVE':
				rectJewelryExtend = {
					x: objTouchPoint.nTouchStartX_offset,
					y: objTouchPoint.nTouchStartY_offset,
					width: 0,
					height: 0,
				}
				break
			default:
				rectJewelryExtend = { x: 0, y: 0, width: 0, height: 0 }
				break
		}
	}
	return rectJewelryExtend
}

/**
 * 绘制饰品表
 * @param canvas
 * @param strSelectType
 * @param arrAvatarJewelry
 * @param objSelectJewelry
 * @param objTouchPoint
 */
const drawAvatarJewelry = async (
	canvas,
	strSelectType,
	arrAvatarJewelry,
	objSelectJewelry,
	objTouchPoint
) => {
	// 绘制
	for (let item of arrAvatarJewelry) {
		const rectJewelryBase = {
			x: item.rect.x,
			y: item.rect.y,
			width: item.rect.width,
			height: item.rect.height,
		}
		const rectJewelryExtend = getRectJewelryExtend(
			strSelectType,
			item,
			objSelectJewelry,
			objTouchPoint
		)
		const rectJewelryResult = mergeObject(rectJewelryBase, rectJewelryExtend)
		// console.log('drawAvatarJewelry', rectJewelryResult)

		switch (item.type) {
			case 'TEXT':
				const size =
					rectJewelryResult.width < rectJewelryResult.height
						? rectJewelryResult.width
						: rectJewelryResult.height
				canvas.setFontSize(size)
				canvas.fillText(
					item.value,
					rectJewelryResult.x,
					rectJewelryResult.y + size
				)
				break
			case 'IMAGE':
				canvas.drawImage(
					item.value,
					rectJewelryResult.x,
					rectJewelryResult.y,
					rectJewelryResult.width,
					rectJewelryResult.height
				)
				break
			default:
				break
		}
	}
}

/**
 * 绘制选中栏上的按钮
 * @param canvas
 * @param type
 */
const drawSelectBorderButton = (canvas, rectBorder, type) => {
	const nRadius = Math.floor(BORDER_BUTTON_SIZE / 2)
	// 处理数据
	let ptButtonPosition = {
		x: 10,
		y: 10,
	}
	let strButtonUrl = ''
	switch (type) {
		case 'FLIP':
			ptButtonPosition = {
				x: rectBorder.x - nRadius,
				y: rectBorder.y - nRadius,
			}
			strButtonUrl = imagesLocal.strUrlImageAvatarButtonFlip
			break
		case 'ADD':
			ptButtonPosition = {
				x: rectBorder.x - nRadius,
				y: rectBorder.y + rectBorder.height - nRadius,
			}
			strButtonUrl = imagesLocal.strUrlImageAvatarButtonAdd
			break
		case 'DELETE':
			ptButtonPosition = {
				x: rectBorder.x + rectBorder.width - nRadius,
				y: rectBorder.y - nRadius,
			}
			strButtonUrl = imagesLocal.strUrlImageAvatarButtonDelete
			break
		case 'RESIZE':
			ptButtonPosition = {
				x: rectBorder.x + rectBorder.width - nRadius,
				y: rectBorder.y + rectBorder.height - nRadius,
			}
			strButtonUrl = imagesLocal.strUrlImageAvatarButtonResize
			break
		default:
			return
	}
	strButtonUrl = ResourceManager.getStaticUrl(strButtonUrl)
	// console.log(
	// 	'drawSelectBorderButton',
	// 	strButtonUrl,
	// 	ptButtonPosition,
	// 	BORDER_BUTTON_SIZE
	// )
	canvas.drawImage(
		strButtonUrl,
		ptButtonPosition.x,
		ptButtonPosition.y,
		BORDER_BUTTON_SIZE,
		BORDER_BUTTON_SIZE
	)
}

const getRectBorderExtend = (strSelectType, objTouchPoint) => {
	// 边框拓展属性
	let rectBorderExtend = { x: 0, y: 0, width: 0, height: 0 }
	switch (strSelectType) {
		// 改变选中框尺寸
		case 'BTN_RESIZE': {
			const nMaxOffsett =
				objTouchPoint.nTouchStartX_offset > objTouchPoint.nTouchStartY_offset
					? objTouchPoint.nTouchStartX_offset
					: objTouchPoint.nTouchStartY_offset
			rectBorderExtend = {
				x: 0,
				y: 0,
				width: nMaxOffsett,
				height: nMaxOffsett,
			}
			break
		}
		// 移动选中框
		case 'MOVE':
			rectBorderExtend = {
				x: objTouchPoint.nTouchStartX_offset,
				y: objTouchPoint.nTouchStartY_offset,
				width: 0,
				height: 0,
			}
			break
		default:
			rectBorderExtend = { x: 0, y: 0, width: 0, height: 0 }
			break
	}
	// console.log('drawSelectBorder', strSelectType, objTouchPoint)
	return rectBorderExtend
}
/**
 * 绘制选中栏
 * @param canvas
 * @param strSelectType
 * @param objSelectJewelry
 * @param objTouchPoint
 */
const drawSelectBorder = (
	canvas,
	strSelectType,
	objSelectJewelry,
	objTouchPoint
) => {
	const arrButtonList = [
		// 'FLIP',
		'ADD',
		'DELETE',
		'RESIZE',
	]
	// 边框基础属性
	const rectBorderBase = {
		x: objSelectJewelry.rect.x,
		y: objSelectJewelry.rect.y,
		width: objSelectJewelry.rect.width,
		height: objSelectJewelry.rect.height,
	}
	const rectBorderExtend = getRectBorderExtend(strSelectType, objTouchPoint)
	// 边框最终属性
	const rectBorderResult = mergeObject(rectBorderBase, rectBorderExtend)

	// 绘制
	canvas.strokeStyle = BORDER_COLOR
	canvas.strokeRect(
		rectBorderResult.x,
		rectBorderResult.y,
		rectBorderResult.width,
		rectBorderResult.height
	)
	// 绘制按钮
	for (let item of arrButtonList) {
		drawSelectBorderButton(canvas, rectBorderResult, item)
	}
}

/**
 * 绘制canvas主函数
 * @param canvas
 * @param avatarShowInfo
 * @param objTouchPoint
 */
export const drawMainCanvas = (canvas, avatarShowInfo, objTouchPoint) => {
	// console.log('drawMainCanvas.')
	const {
		strAvatarImage,
		arrAvatarJewelry,
		objSelectJewelry,
		strSelectType,
	} = avatarShowInfo

	if (canvas) {
		// 绘制头像底图
		drawAvatarImage(canvas, strAvatarImage)
		// 绘制饰品表
		drawAvatarJewelry(
			canvas,
			strSelectType,
			arrAvatarJewelry,
			objSelectJewelry,
			objTouchPoint
		)
		// 绘制选中栏
		if (!checkObjectEmpty(objSelectJewelry)) {
			drawSelectBorder(canvas, strSelectType, objSelectJewelry, objTouchPoint)
		}

		// 绘制
		canvas.draw()
	} else {
		// console.error('drawMainCanvas canvas is null.')
	}
}

export default {
	drawMainCanvas,
}
