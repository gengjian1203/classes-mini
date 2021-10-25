import Taro from "@tarojs/taro";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { View } from "@tarojs/components";

import "./index.less";

interface INavigationProps {
  isShowLeftIcon?: boolean;
  strNavigationTitle?: string;
  colorBackgroud?: string; // 背景颜色
  colorTitle?: string; // 文本颜色
}

export default function Navigation(props: INavigationProps) {
  const {
    isShowLeftIcon = false,
    strNavigationTitle = "",
    colorBackgroud = "#ffffff",
    colorTitle = "#000000",
  } = props;

  const [strLeftIcon, setLeftIcon] = useState<string>("");

  const appInfo = useSelector((state) => state.appInfo);

  const onLoad = async () => {
    const arrPageInfo = Taro.getCurrentPages(); // 路由信息
    if (isShowLeftIcon) {
      if (arrPageInfo.length === 1) {
        // 首页
        setLeftIcon("left-icon iconfont iconhomepage");
      } else {
        // 返回
        setLeftIcon("left-icon iconfont iconreturn");
      }
    }
  };

  useEffect(() => {
    onLoad();
    return () => {};
  }, []);

  const handleLeftIconClick = (e) => {
    const arrPageInfo = Taro.getCurrentPages(); // 路由信息
    console.log("handleLeftIconClick", arrPageInfo);

    if (!isShowLeftIcon) {
      return;
    }
    if (arrPageInfo.length === 1) {
      // 首页
      Taro.reLaunch({
        url: "/pages/Loading/index",
        // url: appInfo.strMainPath || "/pages/Main/index",
      });
    } else {
      // 返回
      Taro.navigateBack();
    }
  };

  return (
    <View
      className="navigation-wrap"
      style={`background-color: ${colorBackgroud}; ` + `color: ${colorTitle}; `}
    >
      <View className="navigation-left" onClick={handleLeftIconClick}>
        <View className={strLeftIcon}></View>
      </View>
      <View className="navigation-mid">
        <View className="mid-title">{strNavigationTitle}</View>
      </View>
      <View className="navigation-right"></View>
    </View>
  );
}
