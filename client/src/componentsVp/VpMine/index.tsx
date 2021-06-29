import React, { Fragment, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import Skeleton from '@/components/skeleton'
import Config from '@/config/config'
import { View, Image } from '@tarojs/components'

import './index.less'

interface IVpMineParam {
	title?: string
	isLoadComplete?: boolean
	onTitleClick?: any
}

export default function VpMine(props: IVpMineParam) {
	const {
		title = '', // 标题
		isLoadComplete = true,
		onTitleClick = () => {}, // 点击标题回调
	} = props

	const memberInfo = useSelector(state => state.memberInfo)

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
		<Skeleton
			loading={!isLoadComplete}
			type='column'
			avatar
			title
			customClass='flex-start-v vp-mine-wrap'
		>
			<Fragment>
				<Image
					src={memberInfo?.user_avatarUrl}
					mode='scaleToFill'
					className='mine-logo'
				/>
				<View className='vp-mine-title' onClick={handleTitleClick}>
					{memberInfo?.user_nickName}
				</View>
			</Fragment>
		</Skeleton>
	)
}
