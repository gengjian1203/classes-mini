import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
import ShowerVideo from "@/components/ShowerVideo";

import "./index.less";

interface IDetailBtntextParam {
  data?: any;
  onBtnClick?: (e?: any) => void; // 按钮点击事件
}

export default function DetailBtntext(props: IDetailBtntextParam) {
  const { data = {}, onBtnClick } = props;
  const {
    icon = "",
    title = "",
    content = [],
    strUrlVideo = "",
    strUrlVideoThumbnail = "",
  } = data;

  const handleIconClick = (e) => {
    onBtnClick && onBtnClick(e);
  };

  const isRippling = ["miniprogram", "webview"].includes(data?.type);

  return (
    <View className="detail-btntext-wrap">
      <View className="item-left">
        <ButtonIcon
          width={100}
          height={100}
          radius={100}
          value={icon}
          isRippling={isRippling}
          onClick={handleIconClick}
        />
      </View>
      <View className="flex-center-v item-right">
        <View className="text-justify item-title">{title}</View>
        {content.map((item, index) => (
          <View className="text-justify item-content" key={index}>
            {item}
          </View>
        ))}
        {strUrlVideo && (
          <ShowerVideo
            height={324}
            strUrlVideo={strUrlVideo}
            strUrlVideoThumbnail={strUrlVideoThumbnail}
          />
        )}
      </View>
    </View>
  );
}
