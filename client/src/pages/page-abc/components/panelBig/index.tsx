import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface IPanelBigParam {
	title?: string
	onTitleClick?: any
}

export default function PanelBig(props: IPanelBigParam) {
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
		<View className='panel-big-wrap'>
			<View className='panel-big-title' onClick={handleTitleClick}>
				{title}
			</View>
			<View className='panel-big-content'>
				<View className='panel-big-value' onClick={handleValueClick}>
					{`${value}-${value}-${value}`}
				</View>
			</View>
		</View>
	)
}
