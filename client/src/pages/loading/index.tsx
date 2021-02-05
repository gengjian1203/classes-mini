import Taro, { useRouter } from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import useActions from '@/hooks/useActions'
import api from '@/api'
import appInfoActions from '@/redux/actions/appInfo'
import memberInfoActions from '@/redux/actions/memberInfo'
import PageContent from '@/components/page-content'

import './index.less'

export default function Loading() {
	const { params } = useRouter()

	const { setAppConfigInfo, setAppTabBarInfo } = useActions(appInfoActions)
	const { setMemberInfo } = useActions(memberInfoActions)

	const jumpPage = () => {
		Taro.navigateTo({
			url: `/pages/main/index`,
		})
	}

	const onLoad = async () => {
		Taro.hideShareMenu()

		const [resQueryAppTabBar, resLoginMember] = await Promise.all([
			api.cloud.app.queryAppTabBar(),
			api.cloud.member.loginMember(),
		])

		console.log('Loading', resQueryAppTabBar, resLoginMember)

		setAppTabBarInfo({
			tabList: resQueryAppTabBar,
			strCurrentId: '',
		})
		setMemberInfo(resLoginMember)

		jumpPage()
	}

	useEffect(() => {
		onLoad()
	}, [])

	return (
		<PageContent
			isShowLeftIcon={false}
			strNavigationTitle=''
			customClass='loading-page-wrap'
		>
			Hello World
		</PageContent>
	)
}
