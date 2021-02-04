import { SET_SYSTEM_INFO } from '@/redux/constants/systemInfo'

const systemInfoActions = dispatch => {
	const actions = {
		// 设置系统级信息
		setSystemInfo: payload => {
			dispatch({
				type: SET_SYSTEM_INFO,
				payload,
			})
		},
	}
	return actions
}

export default systemInfoActions
