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
  openType?: string; // 按钮开放功能类型
  disabled?: boolean; //
  customButtonStyle?: any; // 自定义样式
  customStyle?: any; // 自定义样式
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
    disabled = false,
    customButtonStyle = {},
    customStyle = {},
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
      disabled={disabled}
      customStyle={{
        width: `${Taro.pxTransform(width)}`,
        height: `${Taro.pxTransform(height)}`,
        borderRadius: `${Taro.pxTransform(radius)}`,
      }}
      onClick={handleIconClick}
    >
      <View
        className={`flex-center-v ` + `button-content `}
        style={{
          // backgroundImage: `linear-gradient(135deg, ${color}, 80%, var(--color-white, #ffffff))`,
          ...customButtonStyle,
        }}
      >
        <View
          className={`button-content-bg ` + `iconfont ` + `iconpicture `}
          style={{
            lineHeight: `${Taro.pxTransform(height)}`,
          }}
        />
        {value.includes("icon") ? (
          <View
            className={
              `iconfont ` +
              `${value} ` +
              `button-real ` +
              `button-iconfont-content `
            }
            style={{
              lineHeight: `${Taro.pxTransform(height)}`,
              fontSize: `${Taro.pxTransform(size)}`,
              backgroundImage: `linear-gradient(135deg, ${color}, 80%, var(--color-white, #ffffff))`,
              ...customStyle,
            }}
          />
        ) : (
          <Image
            src={value}
            className={`button-real ` + `button-iconimg-content `}
            style={{
              backgroundImage: `linear-gradient(135deg, ${color}, 80%, var(--color-white, #ffffff))`,
              ...customStyle,
            }}
            mode="aspectFill"
          />
        )}
      </View>
    </AtButton>
  );
}
