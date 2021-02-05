import { SET_MEMBER_INFO } from '@/redux/constants/memberInfo'

const memberInfoActions = dispatch => {
	const actions = {
		// 设置成员信息
		setMemberInfo: payload => {
			dispatch({
				type: SET_MEMBER_INFO,
				payload,
			})
		},
	}
	return actions
}

export default memberInfoActions
