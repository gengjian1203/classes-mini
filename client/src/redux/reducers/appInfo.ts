import { produce } from 'immer'
import {
	SET_APP_CONFIG_INFO,
	SET_APP_TAB_BAR_INFO,
	SET_APP_TAB_BAR_CURRENT_ID,
	SET_SHOW_LAYOUT_LOGIN,
} from '@/redux/constants/appInfo'

const INITIAL_STATE = {
	configInfo: {}, // 小程序配置信息
	tabBarInfo: {
		tabList: [],
		strCurrentId: '',
	}, // 底部导航状态
	isShowLayoutLogin: false, // 登录弹窗状态
}

export default function appInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			case SET_APP_CONFIG_INFO:
				draft.configInfo = payload
				return draft
			case SET_APP_TAB_BAR_INFO:
				draft.tabBarInfo = payload
				return draft
			case SET_APP_TAB_BAR_CURRENT_ID:
				draft.tabBarInfo.strCurrentId = payload
				return draft
			case SET_SHOW_LAYOUT_LOGIN:
				draft.isShowLayoutLogin = payload
				return draft
			default:
				return draft
		}
	})
}
