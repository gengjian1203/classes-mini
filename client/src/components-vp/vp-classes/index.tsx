import React, { Fragment, useState, useEffect, useRef } from 'react'
import { AtSearchBar } from 'taro-ui'
import Taro from '@tarojs/taro'
import api from '@/api'
import { View } from '@tarojs/components'
import ListClass from './components/list-class'

import './index.less'

interface IVpClassesParam {
	isLoadComplete?: boolean
	arrClassList?: Array<any>
	onClassListSearch?: (...arg: any) => any
}

export default function VpClasses(props: IVpClassesParam) {
	const { isLoadComplete = true, arrClassList = [], onClassListSearch } = props

	const valueSearch = useRef<string>('')

	// 编辑框变化
	const handleSearchChange = value => {
		console.log('handleSearchChange', value)
		valueSearch.current = value
	}

	// 确认搜索
	const handleSearchActionClick = async e => {
		console.log('handleSearchActionClick', e)
		Taro.showLoading()
		const params = {
			pageName: 0,
			pageSize: 20,
			keyTitle: valueSearch.current,
		}
		const res = await api.cloud.classInfo.queryClassByKeyTitle(params)
		Taro.hideLoading()
		onClassListSearch && onClassListSearch(res.dataList)
	}
	return (
		<View className='vp-classes-wrap'>
			<AtSearchBar
				onChange={handleSearchChange}
				onActionClick={handleSearchActionClick}
			/>
			<ListClass isLoadComplete={isLoadComplete} arrClassList={arrClassList} />
		</View>
	)
}
