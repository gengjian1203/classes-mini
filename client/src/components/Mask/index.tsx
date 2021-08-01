import React from "react";
import { View } from "@tarojs/components";

import "./index.less";

interface IMaskParam {
  customClass?: string;
  onMaskClose?: any;
  children?: any;
}

export default function Mask(props: IMaskParam) {
  const { customClass = "", onMaskClose, children } = props;

  // 关闭对话框
  const handleMaskClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onMaskClose && onMaskClose(e);
  };

  // 阻止点击面板事件冒泡
  const handleContentClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <View
      className="flex-center-v dialog-mask-wrap"
      onClick={handleMaskClick}
      catchMove
    >
      <View className={customClass} onClick={handleContentClick}>
        {children}
      </View>
    </View>
  );
}
