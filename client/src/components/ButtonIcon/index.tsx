import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { View, Image } from "@tarojs/components";
import Config from "@/config";
import "./index.less";

interface IButtonIconParam {
  value: string; // 内容
  width?: number; // 宽度
  height?: number; // 高度
  radius?: number; // 边角
  size?: number; // 字号
  color?: string; // 按钮背景色（仅为iconfont可用）
  openType?: string; // 按钮开发功能类型
  customStyle?: string; // 自定义样式
  onClick?: (e?: any) => void; // 按钮点击事件回调
}

export default function ButtonIcon(props: IButtonIconParam) {
  const {
    value = "",
    width = 120,
    height = 120,
    radius = 20,
    size = 80,
    color = "var(--color-primary)",
    openType = "",
    customStyle = "",
    onClick = () => {},
  } = props;

  const systemInfo = Config.SYSTEM_INFO;

  const handleIconClick = (e) => {
    onClick && onClick(e);
  };

  return (
    <AtButton
      className="button-icon-wrap"
      openType={openType}
      customStyle={
        `width: ${Taro.pxTransform(width, systemInfo.screenWidth)}; ` +
        `height: ${Taro.pxTransform(height, systemInfo.screenWidth)}; ` +
        `border-radius: ${Taro.pxTransform(radius, systemInfo.screenWidth)}; `
      }
      onClick={handleIconClick}
    >
      {value.includes("icon") ? (
        <View
          className={
            `flex-center-v ` +
            `iconfont ` +
            `${value} ` +
            `button-iconfont-content `
          }
          style={
            `background-image: linear-gradient(135deg, ${color}, 80%, var(--color-white, #ffffff)); ` +
            `font-size: ${Taro.pxTransform(size, systemInfo.screenWidth)}; ` +
            `${customStyle}; `
          }
        ></View>
      ) : (
        <Image
          src={value}
          className="button-iconimg-content"
          mode="aspectFill"
        />
      )}
    </AtButton>
  );
}
