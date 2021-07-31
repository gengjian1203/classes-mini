import Taro from "@tarojs/taro";
import React, { Fragment } from "react";
import Skeleton from "@/components/Skeleton";

import { View, Image, Swiper, SwiperItem } from "@tarojs/components";

import "./index.less";

interface IBannerProps {
  isLoadComplete?: boolean;
  arrBannerList?: Array<any>;
  onBannerClick?: (...arg: any) => any;
}

export default function Banner(props: IBannerProps) {
  const { isLoadComplete = true, arrBannerList = [], onBannerClick } = props;

  const handleBannerClick = (item) => {
    console.log("handleBannerClick", item);
    onBannerClick && onBannerClick(item);
  };

  return (
    <Skeleton
      loading={!isLoadComplete}
      row={1}
      rowProps={{ width: "100%", height: 300 }}
      customClass="banner-wrap"
    >
      <Swiper
        indicatorColor="var(--color-gray-2)"
        indicatorActiveColor="var(--color-primary)"
        circular
        indicatorDots={arrBannerList.length > 1}
        autoplay
      >
        {arrBannerList.map((item, index) => {
          return (
            <SwiperItem key={index}>
              <View
                className="flex-center-v banner-item"
                onClick={() => handleBannerClick(item)}
              >
                <Image
                  className="banner-image"
                  src={item.url}
                  mode="aspectFill"
                />
              </View>
            </SwiperItem>
          );
        })}
      </Swiper>
    </Skeleton>
  );
}
