import React, { Fragment, useState, useEffect } from 'react'
import Skeleton from '@/components/skeleton'
import Config from '@/config/config'
import { View } from '@tarojs/components'

import './index.less'

interface IVpHomeParam {
	title?: string
	isLoadComplete?: boolean
	onTitleClick?: any
}

export default function VpHome(props: IVpHomeParam) {
	const {
		title = '', // 标题
		isLoadComplete = true,
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
		<View className='vp-home-wrap'>
			<Skeleton
				loading={!isLoadComplete}
				type='column'
				title
				titleWidth={'80%'}
				avatar
			>
				<Fragment>
					<View className='vp-home-title' onClick={handleTitleClick}>
						{title}
					</View>
					<View className='vp-home-content'>
						<View className='vp-home-value' onClick={handleValueClick}>
							{`${value}-${value}-${value}`}
						</View>
					</View>
				</Fragment>
			</Skeleton>
		</View>
	)
}
