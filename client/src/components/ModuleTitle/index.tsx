import React from 'react'
import { View } from '@tarojs/components'

import './index.less'

interface IModuleTitleProps {
	strTitle?: string
	renderExtend?: any
}

export default function ModuleTitle(props: IModuleTitleProps) {
	const { strTitle = '', renderExtend = () => true } = props

	return (
		<View className='module-title-wrap flex-between-h'>
			<View className='module-title-content'>{strTitle}</View>
			{renderExtend()}
		</View>
	)
}
