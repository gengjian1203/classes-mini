import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface IPanelAppleParam {
	title?: string
	onTitleClick?: any
}

export default function PanelApple(props: IPanelAppleParam) {
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
		<View className='panel-apple-wrap'>
			<View className='panel-apple-title' onClick={handleTitleClick}>
				{title}
			</View>
			<View className='panel-apple-content'>
				<View className='panel-apple-value' onClick={handleValueClick}>
					{`${value}-${value}-${value}`}
				</View>
			</View>
		</View>
	)
}
