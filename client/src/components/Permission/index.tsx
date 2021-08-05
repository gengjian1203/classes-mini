import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "@tarojs/components";

import "./index.less";

interface IPermissionParam {
  customClass?: string;
  strCheckTag?: string;
  children?: any;
}

export default function Permission(props: IPermissionParam) {
  const { customClass = "", strCheckTag = "", children } = props;

  const [isShowComponents, setShowComponents] = useState<boolean>(false);

  const memberInfo = useSelector((state) => state.memberInfo);

  useEffect(() => {
    let result = false;
    const appSelfTag = memberInfo?.appTag || "";
    if (appSelfTag === "GM") {
      result = true; // GM身份全部通过
    } else {
      const arrSelfTag = appSelfTag.split("_");
      const strSelfCompany = arrSelfTag[0];
      const strSelfPosition = arrSelfTag[1];

      const arrCheckTag = strCheckTag.split("_");
      const strCheckCompany = arrCheckTag[0];
      const strCheckPosition = arrCheckTag[1];
      if (
        strSelfCompany &&
        strSelfPosition &&
        strCheckCompany &&
        strCheckPosition
      ) {
        // 为合法数据开始判断
        if (
          appSelfTag === strCheckTag || // 严格符合条件
          (strSelfCompany === strSelfCompany && strSelfPosition === "LEADER") // 为该公司领导
        ) {
          result = true;
        }
      }
    }

    setShowComponents(result);
  }, [strCheckTag]);

  return (
    <View className={`${customClass}`}>{isShowComponents && children}</View>
  );
}
