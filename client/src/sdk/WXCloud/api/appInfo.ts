import CloudFetch from '../services/CloudFetch'

/**
 * 查询小程序信息以及用户信息
 * @return 小程序级别配置信息
 */
const queryLoginInfo = async () => {
  const params = {
    type: 'LOGIN'
  }
  const res = await CloudFetch.callFunction('fetchInfo', params)
  console.log('queryLoginInfo', res)
  return res.data
}

/**
 * 更新管理员列表
 * @param arrAdminList
 */
const updateAdminList = async (arrAdminList) => {
  const params = {
    type: 'UPDATE_ADMIN_LIST',
    arrAdminList
  }
  const res = await CloudFetch.callFunction('fetchInfo', params)
  console.log('updateAdminList', res)
  return res.data
}

/**
 * 更新底部导航列表
 * @param arrBottomBarList
 */
const updateBottomBarList = async (arrBottomBarList) => {
  const params = {
    type: 'UPDATE_BOTTOM_BAR_LIST',
    arrBottomBarList
  }
  const res = await CloudFetch.callFunction('fetchInfo', params)
  console.log('updateBottomBarList', res)
  return res.data
}

/**
 * 更新是否是安全模式
 * @param isEnableSafeMode
 */
const updateEnableSafeMode = async (isEnableSafeMode) => {
  const params = {
    type: 'UPDATE_ENABLE_SAFE_MODE',
    isEnableSafeMode
  }
  const res = await CloudFetch.callFunction('fetchInfo', params)
  console.log('updateEnableSafeMode', res)
  return res.data
}

export default {
  queryLoginInfo,
  updateAdminList,
  updateBottomBarList,
  updateEnableSafeMode
}
