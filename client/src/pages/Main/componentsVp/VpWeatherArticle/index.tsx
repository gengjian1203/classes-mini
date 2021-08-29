import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import Banner from "@/components/Banner";
import ListNode from "@/components/ListNode";
import useCheckLogin from "@/hooks/useCheckLogin";

import "./index.less";

interface IVpWeatherArticleParam {
  title?: string;
  arrWeatherArticleList?: Array<any>;
  isShowWeatherArticleListLoadingTip?: boolean;
  isLoadComplete?: boolean;
}

export default function VpWeatherArticle(props: IVpWeatherArticleParam) {
  const {
    title = "", // 标题
    arrWeatherArticleList = [], //
    isShowWeatherArticleListLoadingTip = false,
    isLoadComplete = true,
  } = props;

  useEffect(() => {}, []);

  const handleBannerClick = useCheckLogin((e) => {
    e.preventDefault();
    e.stopPropagation();
    console.log("handleBannerClick");
  });

  const handleDetailClick = useCheckLogin((info) => {
    // e.preventDefault();
    // e.stopPropagation();
    console.log("handleDetailClick", info);
    Taro.navigateTo({
      url: `/pages/ArticleDetail/index` + `?articleId=${info?._id}`,
    });
  });

  return (
    <View className="vp-weather-article-wrap">
      <View className="vp-weather-article-content">
        {/*  */}
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
        {/* 气象文章列表 */}
        <ListNode
          isLoadCompleteList={isLoadComplete}
          strType={"MOMENT"}
          arrList={arrWeatherArticleList}
          showBottomLoadingTip={isShowWeatherArticleListLoadingTip}
          customClass="vp-weather-article-list"
          onDetailClick={handleDetailClick}
        />
      </View>
    </View>
  );
}
