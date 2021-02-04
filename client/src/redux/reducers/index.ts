import { combineReducers } from 'redux'
import appInfo from './appInfo'
import shareInfo from './shareInfo'
import systemInfo from './systemInfo'

export default combineReducers({
	appInfo,
	shareInfo,
	systemInfo,
})
