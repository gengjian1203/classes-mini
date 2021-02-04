import React, { Fragment, useState, useEffect } from 'react'
import Skeleton from '@/components/skeleton'
import Config from '@/config/config'
import { View } from '@tarojs/components'

import './index.less'

interface IVpClassListParam {
	title?: string
	isLoadComplete?: boolean
	onTitleClick?: any
}

export default function VpClassList(props: IVpClassListParam) {
	const {
		title = '', // 标题
		isLoadComplete = true,
		onTitleClick = () => {} // 点击标题回调
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
		<View className='vp-class-list-wrap'>
			<Skeleton loading={!isLoadComplete} title row={3}>
				<Fragment>
					<View className='vp-class-list-title' onClick={handleTitleClick}>
						{title}
					</View>
					<View className='vp-class-list-content'>
						<View className='vp-class-list-value' onClick={handleValueClick}>
							{`${value}-${value}-${value}`}
						</View>
					</View>
				</Fragment>
			</Skeleton>
		</View>
	)
}
