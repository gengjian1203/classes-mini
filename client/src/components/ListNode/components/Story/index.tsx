import React, { useState, useEffect, Fragment } from "react";
import { View, Image, Swiper, SwiperItem } from "@tarojs/components";

import { IInfoType } from "../../index";

import "./index.less";

interface IStoryParam {
  info: IInfoType;
  isShowDelete?: boolean;
  onDetailClick?: (any?: any) => void;
  onDeleteClick?: (any?: any) => void;
}

export default function Story(props: IStoryParam) {
  const {
    info = {},
    isShowDelete = false,
    onDetailClick,
    onDeleteClick,
  } = props;

  const handleDetailClick = (info) => {
    onDetailClick && onDetailClick(info);
  };

  return (
    <View
      className="flex-start-v story-item"
      onClick={() => handleDetailClick(info)}
    >
      <View className="flex-center-v item-up">
        <Swiper className="up-swiper">
          {info?.arrImages?.map((item, index) => {
            return (
              <SwiperItem
                className="up-swiper-item"
                key={`story-item-img-${index}`}
              >
                <Image
                  className="up-swiper-item-img"
                  src={item}
                  mode="aspectFill"
                />
              </SwiperItem>
            );
          })}
        </Swiper>
      </View>
      <View className="flex-start-v item-down">
        <View className="down-title">{info.title || ""}</View>
      </View>
    </View>
  );
}
