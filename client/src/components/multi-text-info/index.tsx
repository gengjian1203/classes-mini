import React, { useState, useEffect } from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface IMultiTextInfoParam {
	title?: string
	onTitleClick?: any
}

export default function MultiTextInfo(props: IMultiTextInfoParam) {
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
		<View className='multi-text-info-wrap'>
			<View className='multi-text-info-title' onClick={handleTitleClick}>
				{title}
			</View>
			<View className='multi-text-info-content'>
				<View className='multi-text-info-value' onClick={handleValueClick}>
					{`${value}-${value}-${value}`}
				</View>
			</View>
		</View>
	)
}
