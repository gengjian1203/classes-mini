import { SET_PLAYING_MEDIA_ID } from "@/redux/constants/mediaInfo";

const mediaInfoActions = (dispatch) => {
  const actions = {
    // 设置正在播放中的mediaId
    setPlayingMediaId: (payload) => {
      dispatch({
        type: SET_PLAYING_MEDIA_ID,
        payload,
      });
    },
  };
  return actions;
};

export default mediaInfoActions;
