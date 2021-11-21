import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
import PanelBottom from "@/components/PanelBottom";
import Skeleton from "@/components/Skeleton";

import "./index.less";

interface IBottomWidgetParam {
  isLoadComplete?: boolean;
  arrIconList?: Array<any>;
  nCurrentDetail?: number;
  onIconClick?: any;
}

export default function BottomWidget(props: IBottomWidgetParam) {
  const {
    isLoadComplete = true,
    arrIconList = [], // 图标列表
    nCurrentDetail = 0, // 选中图标
    onIconClick, // 点击图标响应事件
  } = props;

  const handleIconClick = (item, index) => {
    onIconClick(index);
  };

  return (
    <PanelBottom
      fixed
      isSafeBottom
      customClass={`flex-around-h ` + `bottom-widget-wrap `}
    >
      {isLoadComplete
        ? arrIconList.map((item, index) => (
            <ButtonIcon
              key={index}
              value={item.icon}
              color={item.color}
              customButtonStyle={{
                filter: `${
                  nCurrentDetail !== index ? "brightness(70%); " : "auto"
                }`,
              }}
              customStyle={{
                padding: "var(--padding-xs)",
              }}
              isRippling
              onClick={() => handleIconClick(item, index)}
            />
          ))
        : [1, 2, 3, 4].map((item, index) => {
            return (
              <Skeleton
                key={index}
                row={1}
                rowProps={{
                  width: 120,
                  height: 120,
                }}
              />
            );
          })}
    </PanelBottom>
  );
}
