import { produce } from "immer";
import { SET_SHARE_INFO, SET_SOURCE_INFO } from "@/redux/constants/shareInfo";

const INITIAL_STATE = {
  isShowPanelShare: false,
  strShareCardTitle: "", // 卡片分享标题
  strShareCardImage: "", // 卡片分享图
  strSharePosterText: "", // 海报分享标题
  strSharePosterImage: "", // 海报分享大图
  objShareParam: {}, // 分享参数
  objSourceInfo: {
    sourceID: "",
    shareType: "MINIPROGRAM",
    sharePath: "/pages/Loading/index",
  }, // 溯源参数
};

export default function shareInfoReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      // 设置分享弹窗状态
      case SET_SHARE_INFO:
        const objShareParamTmp = payload.isShowPanelShare
          ? payload.objShareParam
            ? payload.objShareParam
            : {}
          : {};
        draft = {
          ...draft,
          isShowPanelShare: false,
          strShareCardTitle: "",
          strShareCardImage: "",
          strSharePosterText: "",
          strSharePosterImage: "",
          objShareParam: objShareParamTmp,
          ...payload,
        };
        return draft;
      // 设置溯源信息
      case SET_SOURCE_INFO:
        draft.objSourceInfo = { ...draft.objSourceInfo, ...payload };
        return draft;
      default:
        return draft;
    }
  });
}
