import Taro, { useRouter } from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import useActions from '@/hooks/useActions'
import api from '@/api'
import appInfoActions from '@/redux/actions/appInfo'
import PageContent from '@/components/page-content'

import './index.less'

export default function Loading() {
	const { params } = useRouter()

	const { setAppConfigInfo, setAppTabBarInfo } = useActions(appInfoActions)

	const jumpPage = () => {
		Taro.navigateTo({
			url: `/pages/main/index`,
		})
	}

	const onLoad = async () => {
		Taro.hideShareMenu()
		console.log('Loading before')
		const res = await api.cloud.app.queryAppTabBar()
		console.log('Loading', res)
		setAppTabBarInfo({
			tabList: [
				{
					id: '0000001',
					title: '首页',
					contentType: 'HOME',
					// iconPrefixClass: 'at-tab-bar__icon iconfont',
					iconType: 'iconfont iconhomepage',
					selectedIconType: 'iconfont iconhomepage_fill',
				},
				{
					id: '0000002',
					title: '班级',
					contentType: 'CLASS_LIST',
					// iconPrefixClass: 'at-tab-bar__icon iconfont',
					iconType: 'iconfont iconactivity',
					selectedIconType: 'iconfont iconactivity_fill',
				},
				{
					id: '0000000',
					title: '我的',
					contentType: 'MINE',
					// iconPrefixClass: 'at-tab-bar__icon iconfont',
					iconType: 'iconfont iconpeople',
					selectedIconType: 'iconfont iconpeople_fill',
				},
			],
			strCurrentId: '',
		})
		setTimeout(() => {
			jumpPage()
		}, 2000)
	}

	useEffect(() => {
		onLoad()
	}, [])

	return (
		<PageContent
			isShowLeftIcon={false}
			strNavigationTitle='Hello World'
			customClass='loading-page-wrap'
		>
			Hello World
		</PageContent>
	)
}
