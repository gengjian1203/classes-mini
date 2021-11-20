import React, { Fragment, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtButton } from "taro-ui";
import { View, Image } from "@tarojs/components";
import "./index.less";

interface IButtonIconParam {
  value: string; // 内容
  width?: number; // 宽度
  height?: number; // 高度
  radius?: number; // 边角
  size?: number; // 字号
  color?: string; // 按钮背景色（仅为iconfont可用）
  colorRippling?: string; // 波纹色
  openType?: string; // 按钮开放功能类型
  disabled?: boolean; // 按钮是否禁用
  isRippling?: boolean; // 是否开启波纹特效
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
    colorRippling = "var(--color-shadow)",
    openType = "",
    disabled = false,
    isRippling = false,
    customButtonStyle = {},
    customStyle = {},
    onClick = () => {},
  } = props;

  const [isLoadImageSuccess, setLoadImageSuccess] = useState<boolean>(false);

  const handleIconClick = (e) => {
    onClick && onClick(e);
  };

  const handleImageLoad = (e) => {
    // console.log("handleImageLoad", e, value);
    setLoadImageSuccess(true);
  };

  const handleImageError = (e) => {
    // console.log("handleImageError", e, value);
    setLoadImageSuccess(false);
  };

  const styleContent = {
    width: `${Taro.pxTransform(width)}`,
    height: `${Taro.pxTransform(height)}`,
    borderRadius: `${Taro.pxTransform(radius)}`,
  };

  return (
    <AtButton
      className="flex-center-v button-icon-wrap"
      openType={openType}
      disabled={disabled}
      customStyle={styleContent}
      onClick={handleIconClick}
    >
      {isRippling && (
        <View
          className="rippling-circle"
          style={{ ...styleContent, border: `2px solid ${colorRippling}` }}
        />
      )}
      {isRippling && (
        <View
          className="rippling-circle"
          style={{ ...styleContent, border: `2px solid ${colorRippling}` }}
        />
      )}
      <View
        className={
          `flex-center-v ` +
          `button-content ` +
          `${isRippling ? "rippling-content " : ""}`
        }
        style={{
          // backgroundImage: `linear-gradient(135deg, ${color}, 80%, var(--color-white, #ffffff))`,
          ...styleContent,
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
            style={
              isLoadImageSuccess
                ? {
                    backgroundImage: `linear-gradient(135deg, ${color}, 80%, var(--color-white, #ffffff))`,
                    ...customStyle,
                  }
                : {}
            }
            mode="aspectFill"
            onLoad={handleImageLoad}
            onError={handleImageError}
          />
        )}
      </View>
    </AtButton>
  );
}
