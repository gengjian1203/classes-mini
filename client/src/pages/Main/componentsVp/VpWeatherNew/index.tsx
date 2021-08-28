import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Image } from "@tarojs/components";

import Banner from "@/components/banner";
import useCheckLogin from "@/hooks/useCheckLogin";

import "./index.less";

interface IVpWeatherNewParam {
  title?: string;
  isLoadComplete?: boolean;
}

export default function VpWeatherNew(props: IVpWeatherNewParam) {
  const {
    title = "", // 标题
    isLoadComplete = true,
  } = props;

  useEffect(() => {}, []);

  const handleBannerClick = useCheckLogin((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleBannerClick");
  });

  return (
    <View className="vp-weather-new-wrap">
      <View className="vp-weather-new-content">
        <Banner
          isLoadComplete={isLoadComplete}
          arrBannerList={[
            {
              url:
                "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/weather-banner_0.jpg",
            },
            {
              url:
                "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/weather-banner_1.jpg",
            },
            {
              url:
                "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/weather-banner_2.jpg",
            },
            {
              url:
                "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/weather-banner_3.jpg",
            },
            {
              url:
                "cloud://dev-8panu.6465-dev-8panu-1300943416/resource/weather-banner_4.jpg",
            },
          ]}
          onBannerClick={handleBannerClick}
        />
      </View>
    </View>
  );
}
