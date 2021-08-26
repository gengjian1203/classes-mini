import React, { useState, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";
import Mask from "@/components/Mask";

import "./index.less";

/**
 * 弹窗
 * @param onDialogClose
 */
interface IDialogProps {
  title?: string; // 标题
  titleIcon?: string; // 标题图标
  customClass?: string; // 自定义样式
  customStyle?: string; // 自定义类
  isScrollY?: boolean; // 内容是否可滚动
  strShowBottomTip?: string; // 展示底部提示文案
  onDialogClose?: any; // 关闭弹窗回调
  renderHeader?: any;
  children?: any;
}

export default function Dialog(props: IDialogProps) {
  const {
    title = "提示",
    titleIcon = "iconsystemprompt_fill",
    customClass = "",
    customStyle = "",
    isScrollY = false,
    strShowBottomTip = "",
    onDialogClose,
    renderHeader,
    children,
  } = props;

  // 关闭对话框
  const handleMaskClose = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDialogClose && onDialogClose(e);
  };

  return (
    <Mask customClass="dialog-panel-content" onMaskClose={handleMaskClose}>
      <View className="flex-center-v dialog-panel-up">
        <View className="flex-center-v dialog-panel-up-icon">
          <View className={`iconfont ${titleIcon} dialog-panel-up-icon-text`} />
        </View>
        <View className="dialog-panel-up-title">{title}</View>
        {renderHeader && renderHeader()}
      </View>
      <ScrollView
        scrollY={isScrollY}
        className={
          `flex-center-v ` +
          `dialog-panel-down ` +
          `${strShowBottomTip ? "" : "dialog-panel-down-margin "}` +
          `${customClass}`
        }
        style={customStyle}
      >
        {children}
      </ScrollView>
      {strShowBottomTip && (
        <View className="flex-center-h dialog-panel-footer">
          {strShowBottomTip}
        </View>
      )}
    </Mask>
  );
}
