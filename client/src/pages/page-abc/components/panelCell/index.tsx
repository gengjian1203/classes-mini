import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface IPanelCellParam {
	title?: string
	onTitleClick?: any
}

export default function PanelCell(props: IPanelCellParam) {
	const {
		title = '', // 标题
		onTitleClick = () => {}, // 点击标题回调
	} = props

	const [value, setValue] = useState<number>(0)

	useEffect(() => {
		setValue(Math.random())
	}, [])

	// 点击标题
	const handleTitleClick = () => {
		onTitleClick && onTitleClick()
	}

	// 点击数值
	const handleValueClick = () => {
		setValue(Math.random())
	}

	return (
		<View className='panel-cell-wrap'>
			<View className='panel-cell-title' onClick={handleTitleClick}>
				CCCCCCCCCCCCCCCCCCCCCCCCCC
			</View>
			<View className='panel-cell-content'>
				<View className='panel-cell-value' onClick={handleValueClick}>
					CCCCCC+++++++CCCCCC
				</View>
			</View>
		</View>
	)
}
