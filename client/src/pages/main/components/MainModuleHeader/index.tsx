import React, { useState, useEffect, Fragment } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Config from "@/config";

import "./index.less";

interface IMainModuleHeaderParam {
  isLoadComplete?: boolean;
  logoUrl?: string;
  title?: string;
}

export default function MainModuleHeader(props: IMainModuleHeaderParam) {
  const {
    logoUrl = "",
    title = "", // 标题
  } = props;

  const systemInfo = Config.SYSTEM_INFO;

  return (
    <View className="module-header-wrap">
      {/* <View className="module-header-bg" /> */}
      <View
        className="module-header-panel"
        style={`height: ${Taro.pxTransform(
          (systemInfo.statusBarHeight + 40 + 150) * 2,
          systemInfo.screenWidth
        )}; `}
      >
        <View className="module-header-mask-circle1" />
        <View className="module-header-mask-circle2" />
        <View className="module-header-mask-circle3" />
        <View className="module-header-mask-circle4" />
        <View className="flex-center-h module-header-content">
          <View className="flex-center-v module-header-left">
            <Image
              src={logoUrl}
              mode="scaleToFill"
              className="module-header-left-logo"
            />
          </View>
          <View className="flex-center-v module-header-right">
            <View className="module-header-rigt-up">{title}</View>
            <View className="module-header-rigt-down">{title}</View>
          </View>
        </View>
      </View>
      <View className="module-header-block" />
    </View>
  );
}
