import { CANVAS_WIDTH, CANVAS_HEIGHT } from './const'

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
 * 绘制饰品表
 * @param canvas
 * @param arrAvatarJewelry
 */
const drawAvatarJewelry = (canvas, arrAvatarJewelry) => {
	// 绘制
	for (let item of arrAvatarJewelry) {
		const rectJewelryBase = {
			x: item.rect.x,
			y: item.rect.y,
			width: item.rect.width,
			height: item.rect.height,
		}
		switch (item.type) {
			case 'TEXT':
				const size =
					rectJewelryBase.width < rectJewelryBase.height
						? rectJewelryBase.width
						: rectJewelryBase.height
				canvas.setFontSize(size)
				canvas.fillText(item.value, rectJewelryBase.x, rectJewelryBase.y + size)
				break
			case 'IMAGE':
				canvas.drawImage(
					item.value,
					rectJewelryBase.x,
					rectJewelryBase.y,
					rectJewelryBase.width,
					rectJewelryBase.height
				)
				break
			default:
				break
		}
	}
}

/**
 * 绘制canvas保存图主函数
 * @param canvas
 * @param avatarShowInfo
 */
export const drawCanvasSave = (canvas, avatarShowInfo) => {
	console.log('drawCanvasSave.')
	const { strAvatarImage, arrAvatarJewelry } = avatarShowInfo

	if (canvas) {
		// 绘制头像底图
		drawAvatarImage(canvas, strAvatarImage)
		// 绘制饰品表
		drawAvatarJewelry(canvas, arrAvatarJewelry)
	} else {
		console.log('drawCanvasSave canvas is null.')
	}
}

export default {
	drawCanvasSave,
}
