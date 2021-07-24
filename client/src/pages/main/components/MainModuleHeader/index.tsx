import React, { useState, useEffect, Fragment } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import Config from "@/config";
import useCheckLogin from "@/hooks/useCheckLogin";

import "./index.less";

interface IMainModuleHeaderParam {
  isLoadComplete?: boolean;
  memberId?: string;
  logoUrl?: string;
  title?: string;
}

export default function MainModuleHeader(props: IMainModuleHeaderParam) {
  const {
    memberId = "",
    logoUrl = "",
    title = "", // 标题
  } = props;

  const systemInfo = Config.SYSTEM_INFO;

  const handleLoginClick = useCheckLogin((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleLoginClick");
  });

  return (
    <View
      className="module-header-panel"
      style={
        `height: ${Taro.pxTransform(
          (systemInfo.statusBarHeight + 40 + 150) * 2,
          systemInfo.screenWidth
        )}; ` +
        `top: -${Taro.pxTransform(
          (systemInfo.statusBarHeight + 40) * 2,
          systemInfo.screenWidth
        )}; ` +
        `margin-bottom: -${Taro.pxTransform(
          (systemInfo.statusBarHeight + 40 + 20) * 2,
          systemInfo.screenWidth
        )}; `
      }
    >
      <View className="module-header-mask-circle1" />
      <View className="module-header-mask-circle2" />
      <View className="module-header-mask-circle3" />
      <View className="module-header-mask-circle4" />
      {memberId ? (
        <View className="flex-center-h module-header-content">
          <View className="flex-center-v module-header-left">
            <Image
              src={logoUrl}
              mode="scaleToFill"
              className="module-header-left-logo"
              onClick={handleLoginClick}
            />
          </View>
          <View className="flex-center-v module-header-right">
            <View className="flex-start-h module-header-right-up">
              <Text className="text-nowrap module-header-right-up-name">
                {title}
              </Text>
              <Text className="text-nowrap module-header-right-up-level">
                Lv.1
              </Text>
            </View>
            <View className="module-header-right-down">
              {["Leader", "Worker", "Tester"].map((item, index) => {
                return (
                  <Text
                    className="text-nowrap module-header-right-down-tag"
                    key={`tag-${index}`}
                  >
                    {item}
                  </Text>
                );
              })}
            </View>
          </View>
        </View>
      ) : (
        <View
          className="flex-center-h module-header-content"
          onClick={handleLoginClick}
        >
          <Text className="module-header-login">登录即可享受更多服务</Text>
        </View>
      )}
    </View>
  );
}
