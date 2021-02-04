import { produce } from 'immer'
import { SET_SYSTEM_INFO } from '@/redux/constants/systemInfo'

const INITIAL_STATE = {}

export default function systemInfoReducer(state = INITIAL_STATE, action) {
	const { type, payload } = action

	return produce(state, draft => {
		switch (type) {
			case SET_SYSTEM_INFO:
				draft = payload
				return draft
			default:
				return draft
		}
	})
}
