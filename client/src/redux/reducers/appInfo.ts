import { produce } from "immer";
import {
  SET_APP_CONFIG_INFO,
  SET_APP_HOME_PAGE,
  SET_APP_TAB_BAR_INFO,
  SET_APP_TAB_BAR_CURRENT,
  SET_APP_EASTER_EGG,
  SET_SHOW_LAYOUT_LOGIN,
} from "@/redux/constants/appInfo";

const INITIAL_STATE = {
  configInfo: {
    tabList: [
      {
        id: "0000000",
        contentType: "MINE",
        iconType: "iconfont iconpeople",
        selectedIconType: "iconfont iconpeople_fill",
        title: "我的",
      },
    ],
    tabListSource: [],
    nTabListCurrent: 0,
    colorPrimary: "",
  }, // 小程序配置信息
  strMainPath: "", // 小程序首页
  tabBarInfo: {}, // 底部导航状态
  isEasterEgg: false, // 是否为彩蛋模式
  isShowLayoutLogin: false, // 登录弹窗状态
};

export default function appInfoReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case SET_APP_CONFIG_INFO:
        draft.configInfo = payload;
        return draft;
      case SET_APP_HOME_PAGE:
        draft.strMainPath = payload;
        return draft;
      case SET_APP_TAB_BAR_INFO:
        draft.tabBarInfo = payload;
        return draft;
      case SET_APP_TAB_BAR_CURRENT:
        draft.configInfo.nTabListCurrent = payload;
        return draft;
      case SET_APP_EASTER_EGG:
        draft.isEasterEgg = payload;
        return draft;
      case SET_SHOW_LAYOUT_LOGIN:
        draft.isShowLayoutLogin = payload;
        return draft;
      default:
        return draft;
    }
  });
}
