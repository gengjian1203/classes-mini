import React, { useState, useEffect } from "react";
import { View, ScrollView } from "@tarojs/components";

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
  onDialogClose?: any; // 关闭弹窗回调
  children?: any;
}

export default function Dialog(props: IDialogProps) {
  const {
    title = "提示",
    titleIcon = "iconsystemprompt_fill",
    customClass = "",
    customStyle = "",
    onDialogClose,
    children,
  } = props;

  // 关闭对话框
  const handleDialogMaskClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDialogClose && onDialogClose(e);
  };

  // 阻止点击面板事件冒泡
  const handleDialogPanelClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <View
      className="flex-center-v dialog-mask-wrap"
      onClick={handleDialogMaskClick}
      catchMove
    >
      <View className="dialog-panel-content" onClick={handleDialogPanelClick}>
        <View className="flex-center-v dialog-panel-up">
          <View className="flex-center-v dialog-panel-up-icon">
            <View
              className={`iconfont ${titleIcon} dialog-panel-up-icon-text`}
            />
          </View>
          <View className="dialog-panel-up-title">{title}</View>
        </View>
        <ScrollView
          scrollY
          className={`flex-center-v dialog-panel-down ${customClass}`}
          style={customStyle}
        >
          {children}
        </ScrollView>
        <View className="flex-center-h dialog-panel-footer">
          长按可复制对应信息
        </View>
      </View>
    </View>
  );
}
