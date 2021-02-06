import Taro from '@tarojs/taro'
import React, { Fragment, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import useActions from '@/hooks/useActions'
import appInfoActions from '@/redux/actions/appInfo'
import api from '@/api'
import useQueryPageList from '@/hooks/useQueryPageList'
import useCheckLogin from '@/hooks/useCheckLogin'
import { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'
import ButtonIcon from '@/components/button-icon'
import PageContent from '@/components/page-content'
import TabbarBottom from '@/components/tab-bar-bottom'

import VpClasses from '@/components-vp/vp-classes/index'
import VpHome from '@/components-vp/vp-home/index'
import VpMine from '@/components-vp/vp-mine/index'

import './index.less'

export default function Main() {
	const {} = useRouter()

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 加载完毕
	const [strNavigationTitle, setNavigationTitle] = useState<string>('')
	const [nTabBarCurrent, setTabBarCurrent] = useState<number>(0)

	// 班级列表
	const [arrClassList, setClassList] = useState<Array<any>>([])

	// 底部导航
	const { tabBarInfo } = useSelector(state => state.appInfo)
	const { setAppTabBarCurrentId, setShowLayoutLogin } = useActions(
		appInfoActions
	)

	const onLoad = async () => {
		Taro.hideShareMenu()
	}

	// 监听底部导航数据变化
	const watchTabBarCurrent = async () => {
		setNavigationTitle(tabBarInfo?.tabList[nTabBarCurrent].title)
		setAppTabBarCurrentId(tabBarInfo?.tabList[nTabBarCurrent].id)
		switch (tabBarInfo?.tabList[nTabBarCurrent].contentType) {
			case 'CLASSES':
				return
				break
			case 'HOME':
				break
			case 'MINE':
				break
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

	useQueryPageList(
		{
			CLASSES: res => {
				const { state, list, totalCount } = res
				console.log('Main useQueryPageList', state, list, totalCount)
				switch (state) {
					case 'LOADING':
						break
					case 'RESULT':
						setClassList(
							list.map(item => {
								return {
									...item,
									logo: item.data_logo,
									title: item.data_title,
									desc: item.data_describe,
									owner: '张三',
								}
							})
						)
						setLoadComplete(true)
						break
				}
			},
			HOME: res => {},
			MINE: res => {},
		}[tabBarInfo?.tabList[nTabBarCurrent].contentType],
		{
			CLASSES: api.cloud.classInfo.queryClassByMemberId,
			HOME: null,
			MINE: null,
		}[tabBarInfo?.tabList[nTabBarCurrent].contentType],
		{
			CLASSES: {},
			HOME: {},
			MINE: {},
		}[tabBarInfo?.tabList[nTabBarCurrent].contentType]
	)

	// 切换底部导航
	const handleTabbarBottomSelect = current => {
		if (nTabBarCurrent === current) {
			return
		}
		setTabBarCurrent(current)
		setLoadComplete(false)
	}

	const handleClassListSearch = list => {
		console.log('handleClassListSearch', list)
		setClassList(
			list.map(item => {
				return {
					...item,
					logo: item.data_logo,
					title: item.data_title,
					desc: item.data_describe,
					owner: '张三',
				}
			})
		)
	}

	// 测试按钮
	const handleBtnTestClick = useCheckLogin(() => {
		setLoadComplete(!isLoadComplete)
	})

	// 测试按钮
	const handleBtnLoginClick = async () => {
		// setShowLayoutLogin(true)
		const res = await api.cloud.classInfo.addClass({
			logo:
				'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3221441550,2057240005&fm=26&gp=0.jpg',
			title: `测试${Math.random()}班`,
			describe:
				'汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。',
			address: '洛水畔',
		})
		console.log('handleBtnLoginClick', res)
		Taro.showToast({
			title: '创建社区',
			icon: 'none',
		})
	}

	// 查询社区列表按钮
	const handleBtnTest2Click = async () => {
		const res = await api.cloud.classInfo.queryClassByKeyTitle({
			keyTitle: '测试0',
		})
		console.log('handleBtnTest2Click', res)
		Taro.showToast({
			title: '查询社区',
			icon: 'none',
		})
	}

	// 查询社区列表按钮
	const handleBtnTest3Click = async () => {
		const res = await api.cloud.classInfo.queryClassByMemberId({})
		console.log('handleBtnTest3Click', res)
		Taro.showToast({
			title: '查询社区',
			icon: 'none',
		})
	}

	const renderVPage = () => {
		return {
			// 班级
			CLASSES: (
				<VpClasses
					isLoadComplete={isLoadComplete}
					arrClassList={arrClassList}
					onClassListSearch={handleClassListSearch}
				/>
			),
			// 我的
			HOME: <VpHome isLoadComplete={isLoadComplete} />,
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
				onClick={handleBtnLoginClick}
			/>
			{/* <ButtonIcon
				value='iconselect'
				color='var(--color-primary)'
				onClick={handleBtnTest2Click}
			/>
			<ButtonIcon
				value='iconservice'
				color='var(--color-primary)'
				onClick={handleBtnTest3Click}
			/> */}
			{/* 底部导航 */}
			<TabbarBottom
				arrTabBarList={tabBarInfo.tabList}
				nTabBarCurrent={nTabBarCurrent}
				onTabBarSelect={handleTabbarBottomSelect}
			/>
		</PageContent>
	)
}
