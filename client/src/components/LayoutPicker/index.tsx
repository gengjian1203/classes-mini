import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtFloatLayout } from "taro-ui";
import { View, Text } from "@tarojs/components";
import Utils from "@/utils";

import "./index.less";

interface ILayoutPickerParam {
  isShowLayoutPicker: boolean;
  arrPickerList?: Array<any>;
  onLayoutPickerClose?: Function;
  onLayoutPickerItemClick?: Function;
}

export default function LayoutPicker(props: ILayoutPickerParam) {
  const {
    isShowLayoutPicker,
    arrPickerList,
    onLayoutPickerClose,
    onLayoutPickerItemClick,
  } = props;

  // 关闭浮动弹层
  const handleLayoutPickerClose = () => {
    onLayoutPickerClose && onLayoutPickerClose();
  };

  // 点击选择项
  const handleLayoutPickerItemClick = (item) => {
    console.log("handleLayoutPickerItemClick", item);
    onLayoutPickerItemClick && onLayoutPickerItemClick(item);
  };

  return (
    <AtFloatLayout
      className="layout-picker-wrap"
      isOpened={isShowLayoutPicker}
      onClose={handleLayoutPickerClose}
    >
      <View className="flex-between-v layout-picker-panel">
        {arrPickerList?.map((item, index) => {
          return (
            <View
              className="flex-center-h layout-picker-item"
              key={`picker-item-${index}`}
              onClick={() => {
                handleLayoutPickerItemClick(item);
              }}
            >
              {item.title}
            </View>
          );
        })}
      </View>
    </AtFloatLayout>
  );
}
