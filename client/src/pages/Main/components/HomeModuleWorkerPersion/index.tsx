import React, { useState, useEffect, Fragment, useRef } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";

import "./index.less";

interface IHomeModuleWorkerPersionParam {
  isShowWorker: boolean;
  isDisablePersion: boolean;
  strLogoBGImage: string;
  workerPersionInfo: any;
  onPersionClick: any;
}

export default function HomeModuleWorkerPersion(
  props: IHomeModuleWorkerPersionParam
) {
  const {
    isShowWorker,
    isDisablePersion,
    strLogoBGImage,
    workerPersionInfo,
    onPersionClick,
  } = props;

  const handlePersionClick = (e) => {
    if (isShowWorker) {
      onPersionClick && onPersionClick(e);
    }
  };

  return (
    <View
      className={
        `flex-center-h ` +
        `worker-item-persion ` +
        `${isDisablePersion ? "worker-item-persion-disable " : ""}`
      }
      onClick={handlePersionClick}
    >
      {isShowWorker && (
        <Fragment>
          <View className="flex-center-h worker-item-persion-left">
            <View
              className="flex-center-h worker-item-persion-left-logo"
              style={{ backgroundImage: strLogoBGImage }}
            >
              {workerPersionInfo?.nameSimple || ""}
            </View>
          </View>
          <View className="flex-center-v worker-item-persion-right">
            <View className="text-ellipsis worker-item-persion-right-name">
              {workerPersionInfo?.name || ""}
            </View>
            <View className="text-ellipsis worker-item-persion-right-cellphone">
              {workerPersionInfo?.cellphone || ""}
            </View>
          </View>
        </Fragment>
      )}
    </View>
  );
}
