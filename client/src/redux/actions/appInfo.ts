import {
  SET_APP_CONFIG_INFO,
  SET_APP_HOME_PAGE,
  SET_APP_TAB_BAR_CURRENT,
  SET_APP_EASTER_EGG,
  SET_SHOW_LAYOUT_LOGIN,
} from "@/redux/constants/appInfo";

const appInfoActions = (dispatch) => {
  const actions = {
    // 设置小程序配置
    setAppConfigInfo: (payload) => {
      dispatch({
        type: SET_APP_CONFIG_INFO,
        payload,
      });
    },
    // 设置小程序首页
    setAppHomePage: (payload) => {
      dispatch({
        type: SET_APP_HOME_PAGE,
        payload,
      });
    },
    // 设置底部导航选中项
    setAppTabBarCurrent: (payload) => {
      dispatch({
        type: SET_APP_TAB_BAR_CURRENT,
        payload,
      });
    },
    // 设置彩蛋模式
    setAppEasterEgg: (payload) => {
      dispatch({
        type: SET_APP_EASTER_EGG,
        payload,
      });
    },
    // 设置登录弹窗状态
    setShowLayoutLogin: (payload) => {
      dispatch({
        type: SET_SHOW_LAYOUT_LOGIN,
        payload,
      });
    },
  };
  return actions;
};

export default appInfoActions;
