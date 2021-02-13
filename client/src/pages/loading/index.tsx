import Taro, { useRouter } from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { Image } from '@tarojs/components'
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
			api.cloud.appInfo.queryAppTabBar(),
			api.cloud.memberInfo.loginMember(),
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
			colorBackgroud='transparent'
			isTransparent
			customClass='flex-center-v loading-page-wrap'
		>
			<Image
				src='https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2045442301,3285918522&fm=26&gp=0.jpg'
				mode='aspectFill'
				style='width: 100%; height: 100%;'
			/>
		</PageContent>
	)
}
