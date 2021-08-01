import { SET_SHARE_INFO, SET_SOURCE_INFO } from "@/redux/constants/shareInfo";

const shareInfoActions = (dispatch) => {
  const actions = {
    // 设置分享弹窗状态
    setShareInfo: (payload) => {
      dispatch({
        type: SET_SHARE_INFO,
        payload,
      });
    },
    // 设置溯源信息
    setSourceInfo: (payload) => {
      dispatch({
        type: SET_SOURCE_INFO,
        payload,
      });
    },
  };
  return actions;
};

export default shareInfoActions;
