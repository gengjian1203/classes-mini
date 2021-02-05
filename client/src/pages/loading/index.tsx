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
		const res = await api.cloud.app.queryAppTabBar()
		setAppTabBarInfo({
			tabList: res,
			strCurrentId: '',
		})
		jumpPage()
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
