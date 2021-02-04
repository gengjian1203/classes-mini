import Taro from '@tarojs/taro'
import React, { Fragment } from 'react'
import Skeleton from '@/components/skeleton'

import { View, Image, Swiper, SwiperItem } from '@tarojs/components'

import './index.less'

interface IBannerProps {
	isLoadComplete?: boolean
	showModuleValView?: Array<any>
	onBannerClick?: (any?: any) => void
}

export default function Banner(props: IBannerProps) {
	const { isLoadComplete = true, showModuleValView = [], onBannerClick } = props

	const handleBannerClick = item => {
		console.log('handleBannerClick', item)
		onBannerClick && onBannerClick(item)
	}

	console.log('Banner', showModuleValView)

	return (
		<Skeleton
			loading={!isLoadComplete}
			row={1}
			rowProps={{ width: '100%', height: 300 }}
		>
			<Swiper
				className='banner-wrap'
				indicatorColor='var(--color-gray-2)'
				indicatorActiveColor='var(--color-primary)'
				circular
				indicatorDots={showModuleValView.length > 1}
				autoplay
			>
				{showModuleValView.map((item, index) => {
					return (
						<SwiperItem key={index}>
							<View
								className='flex-center-v banner-item'
								onClick={() => handleBannerClick(item)}
							>
								<Image
									className='banner-image'
									src={item.url}
									mode='aspectFit'
								/>
							</View>
						</SwiperItem>
					)
				})}
			</Swiper>
		</Skeleton>
	)
}
