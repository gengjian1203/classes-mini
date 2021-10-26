import { combineReducers } from "redux";
import appInfo from "./appInfo";
import memberInfo from "./memberInfo";
import shareInfo from "./shareInfo";
import systemInfo from "./systemInfo";
import mediaInfo from "./mediaInfo";

export default combineReducers({
  appInfo,
  memberInfo,
  shareInfo,
  systemInfo,
  mediaInfo,
});
