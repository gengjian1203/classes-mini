import React from "react";
import { useSelector } from "react-redux";
import { View } from "@tarojs/components";
import NavigationHeader from "@/components/NavigationHeader";
import LayoutLogin from "@/components/LayoutLogin";

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
    children,
  } = props;

  const { configInfo } = useSelector((state) => state.appInfo);

  // console.log('PageContent', configInfo)

  const colorPrimary = "#60b968";

  // 样式规范
  const themeStyle = `--color-primary: ${
    colorPrimary ? colorPrimary : "#60b968"
  }; `;

  return (
    <View className={`flex-center-v page-content-wrap`} style={`${themeStyle}`}>
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
        className={`page-content-children ${customClass}`}
        style={`${customStyle}`}
      >
        {children}
      </View>
      {/* 弹窗 */}
      <LayoutLogin />
    </View>
  );
}
