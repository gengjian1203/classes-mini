import React, { useState, useEffect, Fragment } from "react";
import { View, Text } from "@tarojs/components";

import { IInfoType } from "../../index";

import "./index.less";

interface IWorkerParam {
  info: IInfoType;
  onDetailClick?: (any?: any) => void;
  onEditClick?: (any?: any) => void;
  onDeleteClick?: (any?: any) => void;
}

export default function Worker(props: IWorkerParam) {
  const { info = {}, onDetailClick, onEditClick, onDeleteClick } = props;

  // 点击面板
  const handleDetailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDetailClick && onDetailClick(info);
  };

  // 点击编辑
  const handleEditClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEditClick && onEditClick(info);
  };

  // 点击删除
  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteClick && onDeleteClick(info);
  };

  return (
    <View className="flex-center-h worker-item" onClick={handleDetailClick}>
      <View className="flex-center-h worker-item-left">
        <View
          className="flex-center-h worker-item-left-logo"
          style={{ backgroundImage: info.strLogoBGImage }}
        >
          {info?.nameSimple || ""}
        </View>
      </View>
      <View className="flex-center-v worker-item-mid">
        <View className="text-ellipsis worker-item-mid-name">
          {info?.name || ""}
        </View>
        <View className="text-ellipsis worker-item-mid-cellphone">
          {info?.cellphone || ""}
        </View>
      </View>
      <View className="flex-center-h worker-item-right">
        <View
          className="flex-center-h text-nowrap worker-item-right-edit"
          onClick={handleEditClick}
        >
          编辑
        </View>
        <View
          className="flex-center-h text-nowrap worker-item-right-delete"
          onClick={handleDeleteClick}
        >
          删除
        </View>
      </View>
    </View>
  );
}
