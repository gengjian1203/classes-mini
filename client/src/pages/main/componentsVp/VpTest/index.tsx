import React, { Fragment, useState, useEffect } from "react";
import { AtCalendar } from "taro-ui";
import { View } from "@tarojs/components";

import Banner from "@/components/banner";

import "./index.less";

interface IVpTestParam {
  isLoadComplete?: boolean;
}

export default function VpTest(props: IVpTestParam) {
  const { isLoadComplete = true } = props;

  const [currentDate, setCurrentDate] = useState<Date>();

  useEffect(() => {
    setCurrentDate(new Date());
  }, []);

  const handleBannerClick = (e) => {
    console.log("handleBannerClick", e);
  };

  return (
    <View className="vp-test-wrap">
      <View className="flex-start-v vp-test-content">
        {/* Banner */}
        <Banner
          isLoadComplete={isLoadComplete}
          arrBannerList={[
            {
              url:
                "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=286001186,4224766682&fm=26&gp=0.jpg",
            },
            {
              url:
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fpic.51yuansu.com%2Fbackgd%2Fcover%2F00%2F46%2F24%2F5bfe5ed55c592.jpg%21%2Ffw%2F780%2Fquality%2F90%2Funsharp%2Ftrue%2Fcompress%2Ftrue&refer=http%3A%2F%2Fpic.51yuansu.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
            },
            {
              url:
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F11%2F58%2F2459931d5988c17.jpg%21r850%2Ffw%2F800&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
            },
            {
              url:
                "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fbpic.588ku.com%2Fback_pic%2F05%2F64%2F84%2F555b6a4513d156d.jpg&refer=http%3A%2F%2Fbpic.588ku.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg",
            },
          ]}
          onBannerClick={handleBannerClick}
        />
        {/* 日历 */}
        <View className="block-line"></View>
        <AtCalendar isMultiSelect mark={[{ value: currentDate }]} />
      </View>
    </View>
  );
}
