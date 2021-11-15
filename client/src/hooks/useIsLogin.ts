/**
 * 是否登录
 */

import { useSelector } from "react-redux";
import StorageManager from "@/services/StorageManager";

export function useIsLogin(): boolean {
  // const memberInfo = useSelector((state) => state.memberInfo);
  const memberInfo = StorageManager.getStorageSync("memberInfo");
  const result = Boolean(memberInfo?._id);
  // console.log("useIsLogin", memberInfo);

  return result;
}

export default useIsLogin;
