import Taro from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import api from '@/api'
import useQueryPageList from '@/hooks/useQueryPageList'
import { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ButtonIcon from '@/components/button-icon'
import PageContent from '@/components/page-content'
import TabbarBottom from '@/components/tab-bar-bottom'

import VpClassList from '@/components-vp/vp-class-list/index'
import VpHome from '@/components-vp/vp-home/index'
import VpMine from '@/components-vp/vp-mine/index'

import './index.less'

export default function Main() {
	const {} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 加载完毕
	const [strNavigationTitle, setNavigationTitle] = useState<string>('')
	const [nTabBarCurrent, setTabBarCurrent] = useState<number>(0)

	// 底部导航
	const { tabBarInfo } = useSelector(state => state.appInfo)
	const { setAppTabBarCurrentId } = useActions(appInfoActions)

	const onLoad = async () => {
		Taro.hideShareMenu()
	}

	// 监听底部导航数据变化
	const watchTabBarCurrent = async () => {
		setNavigationTitle(tabBarInfo?.tabList[nTabBarCurrent].title)
		setAppTabBarCurrentId(tabBarInfo?.tabList[nTabBarCurrent].id)
		switch (tabBarInfo?.tabList[nTabBarCurrent].contentType) {
			case 'MINE':
				break
			case 'CLASS_LIST':
			default:
				break
		}
		setTimeout(() => {
			setLoadComplete(true)
		}, 3000)
	}

	useEffect(() => {
		onLoad()
	}, [])

	// 监听底部导航数据变化
	useEffect(() => {
		watchTabBarCurrent()
	}, [tabBarInfo?.tabList, nTabBarCurrent])

	useQueryPageList(res => {}, null, {})

	// 测试按钮
	const handleBtnTestClick = () => {
		setLoadComplete(!isLoadComplete)
	}

	// 切换底部导航
	const handleTabbarBottomSelect = current => {
		if (nTabBarCurrent === current) {
			return
		}
		setTabBarCurrent(current)
		setLoadComplete(false)
	}

	const renderVPage = () => {
		return {
			// 班级
			CLASS_LIST: (
				<VpClassList
					isLoadComplete={isLoadComplete}
					title={tabBarInfo?.tabList[nTabBarCurrent].title}
				/>
			),
			// 我的
			HOME: (
				<VpHome
					isLoadComplete={isLoadComplete}
					title={tabBarInfo?.tabList[nTabBarCurrent].title}
				/>
			),
			// 我的
			MINE: (
				<VpMine
					isLoadComplete={isLoadComplete}
					title={tabBarInfo?.tabList[nTabBarCurrent].title}
				/>
			),
		}[tabBarInfo?.tabList[nTabBarCurrent].contentType]
	}

	return (
		<PageContent
			isShowLeftIcon={false}
			isTransparent={false}
			strNavigationTitle={strNavigationTitle}
		>
			{/* 渲染对应内容 */}
			{renderVPage()}
			{/* 测试内容 */}
			<ButtonIcon
				value='http://pic.51yuansu.com/pic3/cover/01/66/10/5957f0b51c503_610.jpg'
				color='var(--color-primary)'
				onClick={handleBtnTestClick}
			/>
			<ButtonIcon
				value='iconselect'
				color='var(--color-primary)'
				onClick={handleBtnTestClick}
			/>
			{/* 底部导航 */}
			<TabbarBottom
				arrTabBarList={tabBarInfo.tabList}
				nTabBarCurrent={nTabBarCurrent}
				onTabBarSelect={handleTabbarBottomSelect}
			/>
		</PageContent>
	)
}
