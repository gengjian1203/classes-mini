import Taro from '@tarojs/taro'
import React, { Fragment } from 'react'
import { View } from '@tarojs/components'
import Mask from '@/components/Mask'

import './index.less'

interface IPanelBottomProps {
	fixed?: boolean
	isSafeBottom?: boolean
	backgroundColor?: string
	customClass?: string
	customStyle?: string
	children?: any
}

// 该组件使用要放在页面最后一个元素
// 以便去垫高面板的高度
export default function PanelBottom(props: IPanelBottomProps) {
	const {
		fixed = true, // 是否绝对定位
		isSafeBottom = true, // 是否开启X机型的底部保护
		backgroundColor = '#ffffff', // 面板背景色
		customClass = '',
		customStyle = '',
		children,
	} = props

	return (
		// {/* 面板 */}
		<Mask className='panel-bottom-wrap'>
			{/* 实际内容 */}
			{true && (
				<View
					className={`${fixed ? 'fixed-panel ' : ''}`}
					style={`background-color: ${backgroundColor}; ` + `${customStyle}`}
				>
					<View className={`panel-box ` + `${customClass} `}>{children}</View>
					{isSafeBottom && <View className='safe-bottom'></View>}
				</View>
			)}
			{/* 占位内容 */}
			{fixed && (
				<View
					className={``}
					style={`background-color: ${backgroundColor}; ` + `${customStyle}`}
				>
					<View className={`panel-box ` + `${customClass} ` + `hidden-far `}>
						{children}
					</View>
					{isSafeBottom && <View className='safe-bottom'></View>}
				</View>
			)}
		</Mask>
	)
}
