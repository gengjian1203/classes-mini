import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";

import "./index.less";

interface IDetailBtntextParam {
  data?: any;
  onBtnClick?: (e?: any) => void; // 按钮点击事件
}

export default function DetailBtntext(props: IDetailBtntextParam) {
  const { data, onBtnClick } = props;

  const handleIconClick = (e) => {
    onBtnClick && onBtnClick(e);
  };

  return (
    <View className="detail-btntext-wrap">
      <View className="item-left">
        <ButtonIcon
          width={100}
          height={100}
          radius={100}
          value={data.icon}
          onClick={handleIconClick}
        />
      </View>
      <View className="flex-center-v item-right">
        <View className="text-justify item-title">{data.title}</View>
        {data.content.map((item, index) => (
          <View className="text-justify item-content" key={index}>
            {item}
          </View>
        ))}
      </View>
    </View>
  );
}
