import { produce } from 'immer'
import { SET_SHARE_INFO } from '@/redux/constants/shareInfo'

const INITIAL_STATE = {
	sourceID: '',
	shareType: 'MINIPROGRAM',
	sharePath: '/pages/main/index',
}

export default function shareInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			// 设置溯源信息
			case SET_SHARE_INFO:
				draft = payload
				return draft
			default:
				return draft
		}
	})
}
