import { produce } from "immer";
import { SET_PLAYING_MEDIA_ID } from "@/redux/constants/mediaInfo";

const INITIAL_STATE = {
  strPlayingMediaId: "",
};

export default function mediaInfoReducer(state = INITIAL_STATE, action) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      case SET_PLAYING_MEDIA_ID:
        draft.strPlayingMediaId = payload;
        return draft;
      default:
        return draft;
    }
  });
}
