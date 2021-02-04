import Taro from '@tarojs/taro'
import React, { Fragment } from 'react'
import { View } from '@tarojs/components'

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
		<View className='panel-bottom-wrap'>
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
				<Fragment>
					<View
						className={`panel-box ` + `${customClass} ` + `hidden-far `}
						style={`background-color: ${backgroundColor}; ` + `${customStyle}`}
					>
						{children}
					</View>
					{isSafeBottom && <View className='safe-bottom'></View>}
				</Fragment>
			)}
		</View>
	)
}
