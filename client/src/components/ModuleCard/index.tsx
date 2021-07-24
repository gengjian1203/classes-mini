import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";

import "./index.less";

/**
 * 模块卡片
 * @param title: string 标题
 * @param isEnableFold: boolean 是否开启折叠/展示功能
 * @param isLockHiddenContent: boolean 是否锁定不展示内容(应对内容为空时场景，内容区会有多出来的margin-bottom)
 * @param customStyle: object 自定义面板样式
 * @param renderTitleExtend: function 标题后面的拓展渲染
 */
interface IModuleCardProps {
  title?: string;
  isEnableFold?: boolean;
  isLockHiddenContent?: boolean;
  customClass?: string;
  customStyle?: any;
  renderTitleExtend?: any;
  children?: any;
}

export default function ModuleCard(props: IModuleCardProps) {
  const {
    title = "",
    isEnableFold = false,
    isLockHiddenContent = false,
    customClass = "",
    customStyle = {},
    renderTitleExtend = null,
    children,
  } = props;

  const [isShowContent, setShowContent] = useState<boolean>(true);

  // 点击展示/收起
  const handleFoldClick = () => {
    if (!isEnableFold) {
      return;
    }
    setShowContent(!isShowContent);
  };

  return (
    <View className={`module-card-wrap ${customClass} `} style={customStyle}>
      {/* 标题区域 */}
      {(title || isEnableFold) && (
        <View
          className="flex-between-h module-card-title"
          onClick={handleFoldClick}
        >
          <View className="module-card-title-text">{title}</View>
          <View className="module-card-title-extend">{renderTitleExtend}</View>
          {isEnableFold && (
            <View
              className={`module-card-title-fold ${
                isShowContent ? "" : "rotate-90"
              } `}
            >
              <View className="down-arrow" />
            </View>
          )}
        </View>
      )}
      {/* 内容区域 */}
      {!isLockHiddenContent && isShowContent && (
        <View className="module-card-content">{children}</View>
      )}
    </View>
  );
}
