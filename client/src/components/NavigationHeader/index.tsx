import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro, { usePageScroll } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Config from "@/config";

import Navigation from "@/components/navigation";
import GlobalManager from "@/services/GlobalManager";

import "./index.less";

interface INavigationHeaderProps {
  isShowLeftIcon?: boolean; // 是否展示左上角按钮
  isTransparent?: boolean; // 是否是透明导航样式
  strNavigationTitle?: string; // 导航名称
  colorBackgroud?: string; // 背景颜色
  colorTitle?: string; // 文本颜色
}

export default function NavigationHeader(props: INavigationHeaderProps) {
  const {
    isShowLeftIcon = true,
    isTransparent = false,
    strNavigationTitle = "",
    colorBackgroud = "#ffffff",
    colorTitle = "#000000",
  } = props;

  const systemInfo = Config.SYSTEM_INFO;

  // console.log('NavigationHeader', Config.SYSTEM_INFO)

  return (
    <View className="navigation-header-wrap">
      {/* 置顶 */}
      <View className="navigation-header-fixed">
        <View
          style={
            `width: 100%; ` +
            `height: ${Taro.pxTransform(
              systemInfo.statusBarHeight * 2,
              systemInfo.screenWidth
            )}; ` +
            `background-color: ${
              isTransparent ? "transparent" : colorBackgroud
            };`
          }
        />
        <Navigation
          isShowLeftIcon={isShowLeftIcon}
          strNavigationTitle={strNavigationTitle}
          colorBackgroud={isTransparent ? "transparent" : colorBackgroud}
          colorTitle={colorTitle}
        />
      </View>
      {/* 占位 */}
      {!isTransparent && (
        <View className="hidden-far">
          <View
            style={
              `width: 100%; ` +
              `height: ${Taro.pxTransform(
                systemInfo.statusBarHeight * 2,
                systemInfo.screenWidth
              )}; ` +
              `background-color: ${
                isTransparent ? "transparent" : colorBackgroud
              };`
            }
          />

          <Navigation
            isShowLeftIcon={isShowLeftIcon}
            strNavigationTitle={strNavigationTitle}
            colorBackgroud={colorBackgroud}
            colorTitle={colorTitle}
          />
        </View>
      )}
    </View>
  );
}
