import React, { useState, useEffect, Fragment } from "react";
import { View, Image, Text } from "@tarojs/components";

import { IInfoType } from "../../index";

import "./index.less";

interface IMemberParam {
  info: IInfoType;
  onDetailClick?: (any?: any) => void;
  onEditClick?: (any?: any) => void;
  onDeleteClick?: (any?: any) => void;
}

export default function Member(props: IMemberParam) {
  const { info = {}, onDetailClick, onEditClick, onDeleteClick } = props;

  // 点击面板
  const handleDetailClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDetailClick && onDetailClick(info);
  };

  return (
    <View className="flex-center-h member-item" onClick={handleDetailClick}>
      <View className="flex-center-h member-item-left">
        <Image
          className="flex-center-h member-item-left-logo"
          src={info?.logo || ""}
          mode="scaleToFill"
        />
      </View>
      <View className="flex-center-v member-item-mid">
        <View className="flex-start-h member-item-mid-name">
          <Text className="text-ellipsis member-item-mid-name-text">
            {info?.name || ""}
          </Text>
          {info?.arrSign &&
            info?.arrSign.map((itemSign, indexSign) => {
              return (
                <Text
                  className="text-ellipsis member-item-mid-name-sign"
                  key={`sign-${indexSign}`}
                  style={itemSign?.style || {}}
                >
                  {itemSign?.text || ""}
                </Text>
              );
            })}
        </View>
        <View className="text-ellipsis member-item-mid-cellphone">
          {info?.cellphone || ""}
        </View>
      </View>
      <View className="flex-center-h member-item-right"></View>
    </View>
  );
}
