import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'
import classnames from 'classnames'
import React, { Fragment } from 'react'
import './index.less'

/**
 * @description 骨架屏组件参数
 * @author lentoo
 * @date 2019-08-16
 * @export
 * @interface SkeletonProps
 */
interface SkeletonProps {
	/**
	 * @description 排列方向  横向 或者 纵向， 默认 row
	 * @type {('row' | 'column')}
	 * @memberof SkeletonProps
	 */
	type?: 'row' | 'column'
	/**
	 * @description 段落占位图行数
	 * @type {number}
	 */
	row?: number
	/**
	 * @description 是否显示占位图，传 `false` 时会展示子组件内容
	 * @type {boolean}
	 */
	loading?: boolean
	/**
	 * @description 是否显示标题占位图
	 * @type {boolean}
	 */
	title?: boolean
	/**
	 * @description 标题占位图宽度
	 * @type {(string | number)}
	 */
	titleWidth?: string | number
	/**
	 * @description 是否显示头像占位图
	 * @type {boolean}
	 */
	avatar?: boolean
	/**
	 * @description avatar-size
	 * @type {number}
	 */
	avatarSize?: number
	/**
	 * @description 头像占位图形状，可选值为 `square` 、`round` 默认值：round
	 * @type {AvatarShapeOptions}
	 */
	avatarShape?: AvatarShapeOptions
	/**
	 * @description 是否显示右边操作按钮占位图
	 * @type {boolean}
	 */
	action?: boolean
	/**
	 * @description 是否开启动画
	 * @type {boolean}
	 */
	animate?: boolean
	/**
	 * @description 动画名称
	 * @type {AnimateName}
	 * @memberof SkeletonProps
	 */
	animateName?: AnimateName
	/**
	 * @description 段落占位图宽度，可传数组来设置每一行的宽度
	 * @type {(number | string | (number | string)[])}
	 */
	rowWidth?: number | string | (number | string)[]
	/**
	 * @description 段落占位图高度，可传数组来设置每一行的高度
	 * @type {(number | string | (number | string)[])}
	 * @memberof SkeletonProps
	 */
	rowHeight?: number | string | (number | string)[]
	/**
	 * @description 用于定制 row 的宽跟高，可传数组来设置每一行的宽跟高，如果配置了该属性，则 rowWidth 配置无效
	 * @type {(RowProps | RowProps[])}
	 * @memberof SkeletonProps
	 */
	rowProps?: RowProps | RowProps[]
	/**
	 * @description 子组件内容
	 * @type {JSX.Element}
	 */
	/**
	 * @description skeleton-content的对齐方式，默认center
	 * @type {('left' | 'center' | 'right')}
	 */
	contentAlignStyle?: 'left' | 'center' | 'right'

	/**
	 * @description 自定义类名
	 * @type String
	 */
	customClass?: string

	children?: JSX.Element
}
/**
 * @description Row 属性的宽高
 * @author lentoo
 * @date 2019-08-16
 * @export
 * @interface RowProps
 */
export interface RowProps {
	width: string | number
	height: string | number
}
export type AnimateName = 'blink' | 'elastic'
export type AvatarShapeOptions = 'round' | 'square'
const DEFAULT_ROW_WIDTH = '100%'

export default function Skeleton(props: SkeletonProps) {
	const {
		loading = true,
		avatar = false,
		avatarSize = 90,
		type = 'row',
		row = 0,
		rowWidth = '100%',
		rowHeight = 24,
		rowProps = {
			width: '100%',
			height: 24,
		},
		title = false,
		titleWidth = '40%',
		action = false,
		avatarShape = 'round',
		animate = true,
		animateName = 'blink',
		contentAlignStyle = 'center',
		customClass = '',
		children,
	} = props
	if (!loading) {
		return <View className={customClass}>{children}</View>
	}

	const getRowWidth = (index: number) => {
		if (rowProps) {
			if (Array.isArray(rowProps)) {
				return rowProps[index].width
			}
			return rowProps.width
		}

		if (rowWidth === DEFAULT_ROW_WIDTH) {
			return DEFAULT_ROW_WIDTH
		}
		if (Array.isArray(rowWidth)) {
			return rowWidth[index]
		}
		return rowWidth
	}

	const getRowHeight = (index: number) => {
		if (rowProps) {
			if (Array.isArray(rowProps)) {
				return rowProps[index].height
			}
			return rowProps.height
		}

		if (Array.isArray(rowHeight)) {
			return rowHeight[index]
		}
		return rowHeight
	}

	const addUnit = (value?: string | number) => {
		return typeof value === 'number' ? Taro.pxTransform(value) : value
	}

	const renderAvatar = (): JSX.Element | null => {
		if (avatar) {
			const avatarClass = classnames('skeleton-avatar', {
				'skeleton-avatar-round': avatarShape === 'round',
			})
			return (
				<View
					className={avatarClass}
					style={` width: ${addUnit(avatarSize)};
        height: ${addUnit(avatarSize)} `}
				/>
			)
		}
		return null
	}

	const renderTitle = (): JSX.Element | null => {
		if (title) {
			return (
				<View
					className='skeleton-title'
					style={`width: ${addUnit(titleWidth)};`}
				></View>
			)
		}
		return null
	}
	const renderAction = (): JSX.Element | null => {
		if (action && type !== 'column') {
			return <View className='skeleton-action' />
		}
		return null
	}
	const renderRows = (): JSX.Element | null => {
		if (row) {
			const rowArray = Array.apply(null, Array(row)).map((item, index) => index)
			const Rows = rowArray.map((item, index) => {
				return (
					<View
						key={item}
						className='skeleton-row'
						style={`width: ${addUnit(getRowWidth(index))};height: ${addUnit(
							getRowHeight(index)
						)}`}
					/>
				)
			})
			return <View className='skeleton-rows'>{Rows}</View>
		}
		return null
	}

	return (
		<View
			className={
				`skeleton ` +
				`skeleton-type-${type} ` +
				`${
					loading && animate && animateName === 'blink'
						? 'skeleton-animate-blink '
						: ''
				}` +
				`${
					loading && animate && animateName === 'elastic'
						? 'skeleton-animate-elastic '
						: ''
				}` +
				`${customClass} `
			}
		>
			{renderAvatar()}
			<View
				className='skeleton-content'
				style={{ textAlign: contentAlignStyle }}
			>
				{renderTitle()}
				{renderRows()}
			</View>
			{renderAction()}
		</View>
	)
}
