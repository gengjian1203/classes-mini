import React, { Fragment } from "react";
import { View, Image } from "@tarojs/components";

import { IInfoType } from "../../index";

import "./index.less";

interface IMomentProps {
  info: IInfoType;
  onDetailClick?: (any?: any) => void;
}

export default function Moment(props: IMomentProps) {
  const { info = {}, onDetailClick } = props;

  const handleDetailClick = (info) => {
    onDetailClick && onDetailClick(info);
  };

  return (
    <View
      className="flex-center-h moment-item border-bottom-line"
      onClick={() => handleDetailClick(info)}
    >
      <View className="item-left">
        <Image
          className="item-logo"
          src={
            info.logo ||
            info.posterImg ||
            "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/logo-mini.jpg"
          }
          mode="scaleToFill"
        ></Image>
      </View>
      <View className="flex-center-v item-right">
        <View className="item-author text-ellipsis">{info.author}</View>
        {info.title && <View className="item-content">{info.title}</View>}
        {info.images?.length && <View className="item-media">多媒体区域</View>}
        {info.address && <View className="item-adress">{info.address}</View>}
        <View className="item-bottom flex-between-h">
          <View className="item-time">{info.createTime}</View>
          {/* <View className='flex-center-v iconfont icon19 item-options'></View> */}
        </View>
      </View>
    </View>
  );
}
