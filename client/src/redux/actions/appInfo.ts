import {
	SET_APP_CONFIG_INFO,
	SET_APP_TAB_BAR_INFO,
	SET_APP_TAB_BAR_CURRENT_ID,
} from '@/redux/constants/appInfo'

const appInfoActions = dispatch => {
	const actions = {
		// 设置小程序配置
		setAppConfigInfo: payload => {
			dispatch({
				type: SET_APP_CONFIG_INFO,
				payload,
			})
		},
		// 设置底部导航信息
		setAppTabBarInfo: payload => {
			dispatch({
				type: SET_APP_TAB_BAR_INFO,
				payload,
			})
		},
		// 设置底部导航选中项
		setAppTabBarCurrentId: payload => {
			dispatch({
				type: SET_APP_TAB_BAR_CURRENT_ID,
				payload,
			})
		},
	}
	return actions
}

export default appInfoActions
