import React from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface IMaskParam {
	className?: string
	children?: any
}

export default function Mask(props: IMaskParam) {
	const { className = '', children } = props

	const handleMaskClick = e => {
		// console.log('handleMaskClick')
		e.stopPropagation()
	}

	return (
		<View className={className} onClick={handleMaskClick}>
			{children}
		</View>
	)
}
