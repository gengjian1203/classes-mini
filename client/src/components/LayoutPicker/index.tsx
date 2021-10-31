import React, { Fragment, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { AtFloatLayout, AtButton } from "taro-ui";
import { View, Button } from "@tarojs/components";
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
    <View catchMove>
      <AtFloatLayout
        className="layout-picker-wrap"
        isOpened={isShowLayoutPicker}
        onClose={handleLayoutPickerClose}
      >
        <View className="safe-bottom flex-between-v layout-picker-panel">
          {arrPickerList?.map((item, index) => {
            return (
              <AtButton
                className="flex-center-h layout-picker-item"
                key={`picker-item-${index}`}
                onClick={() => {
                  handleLayoutPickerItemClick(item);
                }}
              >
                {item.title}
              </AtButton>
            );
          })}
        </View>
      </AtFloatLayout>
    </View>
  );
}
