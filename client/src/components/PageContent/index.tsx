import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { View, MovableArea, MovableView } from "@tarojs/components";
import Config from "@/config";
import PanelShare from "@/components/PanelShare"; // 位置warning
import LayoutLogin from "@/components/LayoutLogin";
import NavigationHeader from "@/components/NavigationHeader";
import useDecodeRouter from "@/hooks/useDecodeRouter";
import GlobalManager from "@/services/GlobalManager";

import "./animation.less";
import "./base.less";
import "./index.less";

interface IPageContentParam {
  customClass?: string;
  customStyle?: string;
  isShowLeftIcon?: boolean; // 顶部导航：是否展示左上角按钮
  isTransparent?: boolean; // 顶部导航：是否是透明导航样式
  strNavigationTitle?: string; // 顶部导航：导航名称
  colorBackgroud?: string; // 顶部导航：背景颜色
  colorTitle?: string; // 顶部导航：文本颜色
  isSafeBottom?: boolean; // 是否留出底部的保护距离
  children?: any;
}

export default function PageContent(props: IPageContentParam) {
  const {
    customClass = "",
    customStyle = "",
    isShowLeftIcon = true,
    isTransparent = false,
    strNavigationTitle = "",
    colorBackgroud = "#ffffff",
    colorTitle = "#000000",
    isSafeBottom = false,
    children,
  } = props;

  const { path } = useDecodeRouter();

  const { isEasterEgg, configInfo } = useSelector((state) => state.appInfo);

  // console.log("PageContent", path);

  const colorPrimary = configInfo.colorPrimary; // "#60b968";
  const colorPrimaryL = "#80d988";
  const colorPrimaryD = "#409948";

  // 样式规范
  const themeStyle =
    `--color-primary: ${colorPrimary ? colorPrimary : "#60b968"}; ` +
    `--color-primary-light: ${colorPrimaryL ? colorPrimaryL : "#80d988"};` +
    `--color-primary-dark: ${colorPrimaryD ? colorPrimaryD : "#409948"};`;

  // 检测更新小程序 如果需要更新，则触发更新
  const updateMiniProgram = () => {
    GlobalManager.updateMiniProgram && GlobalManager.updateMiniProgram();
  };

  useEffect(() => {
    updateMiniProgram();
  }, []);

  const handleBtnTestClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (!["/pages/EasterEgg/index"].includes(path)) {
      Taro.navigateTo({
        url: "/pages/EasterEgg/index",
      });
    }
  };

  return (
    <MovableArea
      className={`flex-center-v page-content-wrap`}
      style={`${themeStyle}`}
    >
      {/* 环境标识 */}
      {(Config.env !== "prod" || isEasterEgg) && (
        <MovableView
          className="flex-center-v page-content-test-btn"
          direction="all"
          x={1000}
          y={80}
          onClick={handleBtnTestClick}
        >
          {Config.env}
        </MovableView>
      )}
      {/* 顶部导航 */}
      <NavigationHeader
        isShowLeftIcon={isShowLeftIcon}
        isTransparent={isTransparent}
        strNavigationTitle={strNavigationTitle}
        colorBackgroud={colorBackgroud}
        colorTitle={colorTitle}
      />
      {/* 渲染对应内容 */}
      <View
        className={
          `page-content-children ` +
          `${isSafeBottom ? "safe-bottom " : ""}` +
          `${customClass} `
        }
        style={`${customStyle}`}
      >
        {children}
      </View>
      {/* 登录弹窗 */}
      <LayoutLogin />
      {/* 分享弹窗 */}
      <PanelShare />
    </MovableArea>
  );
}
