import { produce } from "immer";
import StorageManager from "@/services/StorageManager";

import { SET_MEMBER_INFO } from "@/redux/constants/memberInfo";

const m_managerStorage = StorageManager.getInstance();

const INITIAL_STATE = {};

export default function memberInfoReducer(state = INITIAL_STATE, action: any) {
  const { type, payload } = action;

  return produce(state, (draft) => {
    switch (type) {
      // 设置成员信息
      case SET_MEMBER_INFO:
        draft = payload;
        m_managerStorage.setStorageSync("memberInfo", draft);
        return draft;

      default:
        return draft;
    }
  });
}
