import { produce } from 'immer'
import {
	SET_APP_CONFIG_INFO,
	SET_APP_TAB_BAR_INFO,
	SET_APP_TAB_BAR_CURRENT_ID,
} from '@/redux/constants/appInfo'

const INITIAL_STATE = {
	configInfo: {},
	tabBarInfo: {
		tabList: [],
		strCurrentId: '',
	},
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
			default:
				return draft
		}
	})
}
