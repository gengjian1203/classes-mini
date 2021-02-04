import React, { Fragment, useState, useEffect } from 'react'
import { AtTabs, AtTabsPane } from 'taro-ui'
import { View } from '@tarojs/components'
import ListFeed from '@/components/list-feed'
import Skeleton from '@/components/skeleton'

import './index.less'

interface ITabParam {
	isLoadComplete?: boolean
	isLoadCompleteList?: boolean
	showModuleValView?: Array<any>
	arrList?: any // 帖子列表
	showBottomLoadingTip?: boolean // 是否展示触底加载提示
	onTabChange?: (any?: any) => void // 切换tab
	onDetailClick?: (any?: any) => void // 点击帖子
}

export default function Tab(props: ITabParam) {
	const {
		isLoadComplete = true,
		isLoadCompleteList = true,
		showModuleValView = [],
		arrList = [],
		showBottomLoadingTip = false,
		onTabChange,
		onDetailClick,
	} = props

	const [tabCurrent, setTabCurrent] = useState<number>(0)

	// 切换tab
	const handleTabChange = current => {
		if (tabCurrent === current) {
			return
		}
		setTabCurrent(current)
		onTabChange && onTabChange(showModuleValView[current])
	}

	// 点击帖子
	const handleDetailClick = item => {
		onDetailClick && onDetailClick(item)
	}

	return (
		<Fragment>
			{isLoadComplete ? (
				<AtTabs
					animated
					current={tabCurrent}
					scroll={showModuleValView.length > 5}
					tabList={showModuleValView}
					onClick={handleTabChange}
				>
					{showModuleValView.map((item, index) => (
						<AtTabsPane current={tabCurrent} index={index} key={index}>
							<ListFeed
								isLoadCompleteList={isLoadCompleteList}
								strType={'MOMENTS'}
								arrList={arrList}
								showBottomLoadingTip={showBottomLoadingTip}
								onDetailClick={handleDetailClick}
							/>
						</AtTabsPane>
					))}
				</AtTabs>
			) : (
				<View className='flex-between-h'>
					{[0, 1, 2].map((item, index) => {
						return (
							<Skeleton
								key={index}
								row={1}
								rowProps={{ width: '30%', height: 20 }}
							/>
						)
					})}
				</View>
			)}
		</Fragment>
	)
}
