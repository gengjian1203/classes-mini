import { SET_SHARE_INFO } from '@/redux/constants/shareInfo'

const shareInfoActions = dispatch => {
	const actions = {
		// 设置溯源信息
		setShareInfo: payload => {
			dispatch({
				type: SET_SHARE_INFO,
				payload,
			})
		},
	}
	return actions
}

export default shareInfoActions
