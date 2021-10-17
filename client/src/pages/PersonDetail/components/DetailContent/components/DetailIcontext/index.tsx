import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import "./index.less";

interface IDetailIcontextParam {
  data?: any;
}

export default function DetailIcontext(props: IDetailIcontextParam) {
  const { data } = props;

  return (
    <View className="detail-icontext-wrap">
      <View className="item-left">
        <Image className="item-icon" src={data.icon} mode="scaleToFill" />
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
