import React, { useState, useEffect, Fragment } from "react";
import { View, Image } from "@tarojs/components";

import { IInfoType } from "../../index";

import "./index.less";

interface IGroupParam {
  info: IInfoType;
  onDetailClick?: (any?: any) => void;
}

export default function Group(props: IGroupParam) {
  const { info = {}, onDetailClick } = props;

  const handleDetailClick = (info) => {
    onDetailClick && onDetailClick(info);
  };

  return (
    <View
      className="flex-start-h list-item"
      onClick={() => handleDetailClick(info)}
    >
      <View className="flex-center-v item-left">
        <Image src={info.logo || ""} mode="scaleToFill" className="left-logo" />
      </View>
      <View className="flex-start-v item-mid">
        <View className="text-ellipsis mid-title">{info.title || ""}</View>
        <View className="text-ellipsis mid-desc">{info.desc || ""}</View>
      </View>
      <View className="flex-start-v item-right">
        <View className="right-owner">{info.author || ""}</View>
      </View>
    </View>
  );
}