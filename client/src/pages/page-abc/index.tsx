import React, { Fragment, useEffect, useState } from 'react'
import Taro, { useRouter } from '@tarojs/taro'
import { View } from '@tarojs/components'

import comPulbic from '@/pages/page-abc/components/simple'

import './index.less'

export default function PageAbc() {
	const {
		path,
		params: { id = '' },
	} = useRouter()

	const { PanelApple, PanelBig } = comPulbic

	const [isLoadComplete, setLoadComplete] = useState<boolean>(false) // 是否加载完毕
	const [value, setValue] = useState<number>(0)

	useEffect(() => {
		Taro.hideShareMenu()
		setLoadComplete(true)
	}, [])

	// 点击按钮
	const handleButtonClick = () => {
		setValue(Math.random())
	}

	return (
		<View className='page-abc-wrap'>
			{isLoadComplete && (
				<Fragment>
					<View className='page-abc-name'>{id}</View>
					<View className='page-abc-btn' onClick={handleButtonClick}>
						{value}
					</View>
					<View>aaa</View>
					<View>aaa</View>
					<View>aaa</View>
					<View>aaa</View>
					<PanelApple title='111' />
					<PanelBig title='222' />
				</Fragment>
			)}
		</View>
	)
}
