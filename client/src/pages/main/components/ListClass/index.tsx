import React, { useState, useEffect, Fragment } from 'react'
import { View, Image } from '@tarojs/components'
import Skeleton from '@/components/skeleton'

import './index.less'

interface IClassParam {
	logo: string
	title: string
	desc: string
	owner: string
}

interface IListClassParam {
	isLoadComplete?: boolean
	arrClassList?: Array<IClassParam>
}

export default function ListClass(props: IListClassParam) {
	const { isLoadComplete = true, arrClassList = [] } = props

	return (
		<View className='flex-start-v list-class-wrap'>
			{isLoadComplete ? (
				<Fragment>
					{arrClassList.map((item, index) => {
						return (
							<View className='flex-start-h list-item'>
								<View className='flex-center-v item-left'>
									<Image
										src={item.logo}
										mode='scaleToFill'
										className='left-logo'
									/>
								</View>
								<View className='flex-start-v item-mid'>
									<View className='text-ellipsis mid-title'>{item.title}</View>
									<View className='text-ellipsis mid-desc'>{item.desc}</View>
								</View>
								<View className='flex-start-v item-right'>
									<View className='right-owner'>{item.owner}</View>
								</View>
							</View>
						)
					})}
				</Fragment>
			) : (
				<Fragment>
					{[0, 1, 2].map((item, index) => {
						return (
							<Skeleton
								key={index}
								type='row'
								avatar
								title
								titleWidth={'80%'}
								row={1}
								action
								customClass='list-item'
							/>
						)
					})}
				</Fragment>
			)}
		</View>
	)
}
