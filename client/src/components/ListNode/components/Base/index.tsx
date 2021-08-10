import React from "react";
import { View, Image } from "@tarojs/components";
import { IInfoType } from "../../index";

import "./index.less";

interface IBaseProps {
  info: IInfoType;
  onDetailClick?: (any?: any) => void;
}

export default function Base(props: IBaseProps) {
  const { info = {}, onDetailClick } = props;

  const handleDetailClick = (info) => {
    onDetailClick && onDetailClick(info);
  };

  return (
    <View
      className="base-item border-bottom-line"
      onClick={() => handleDetailClick(info)}
    >
      {info.title && <View className="item-content">{info.title}</View>}
    </View>
  );
}
