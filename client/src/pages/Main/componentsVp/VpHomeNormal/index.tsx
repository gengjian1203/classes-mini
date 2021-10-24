import React, { Fragment, useState, useEffect } from "react";
import { AtCalendar } from "taro-ui";
import { View } from "@tarojs/components";
import Banner from "@/components/Banner";
import CloudFileManager from "@/services/CloudFileManager";

import "./index.less";

interface IVpHomeNormalParam {
  isLoadComplete?: boolean;
}

export default function VpHomeNormal(props: IVpHomeNormalParam) {
  const { isLoadComplete = true } = props;

  const [currentDate, setCurrentDate] = useState<Date>();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const handleBannerClick = (e) => {
    console.log("handleBannerClick", e);
  };

  return (
    <View className="vp-home-normal-wrap">
      <View className="flex-start-v vp-home-normal-content">
        {/* Banner */}
        <Banner
          isLoadComplete={isLoadComplete}
          arrBannerList={[
            {
              url: CloudFileManager.getCloudUrl(
                "resource/weather-banner_0.jpg"
              ),
            },
            {
              url: CloudFileManager.getCloudUrl(
                "resource/weather-banner_1.jpg"
              ),
            },
            {
              url: CloudFileManager.getCloudUrl(
                "resource/weather-banner_2.jpg"
              ),
            },
            {
              url: CloudFileManager.getCloudUrl(
                "resource/weather-banner_3.jpg"
              ),
            },
          ]}
          onBannerClick={handleBannerClick}
        />
        {/* 日历 */}
        <View className="block-line"></View>
      </View>
    </View>
  );
}
