import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import Api from "@/api";
import Banner from "@/components/Banner";
import ButtonFloat from "@/components/ButtonFloat";
import ListNode from "@/components/ListNode";
import Config from "@/config";
import useCheckLogin from "@/hooks/useCheckLogin";
import CloudFileManager from "@/services/CloudFileManager";

import "./index.less";

interface IVpWeatherArticleParam {
  objVPageInfo?: any;
  arrWeatherArticleList?: Array<any>;
  isShowWeatherArticleListLoadingTip?: boolean;
  isLoadComplete?: boolean;
  onWeatherArticleListUpdate?: () => void;
}

export default function VpWeatherArticle(props: IVpWeatherArticleParam) {
  const {
    objVPageInfo = {},
    arrWeatherArticleList = [], //
    isShowWeatherArticleListLoadingTip = false,
    isLoadComplete = true,
    onWeatherArticleListUpdate,
  } = props;

  const [objDialogSpiderParentInfo, setDialogSpiderParentInfo] = useState<any>(
    {}
  );

  const { isEasterEgg } = useSelector((state) => state.appInfo);

  useEffect(() => {
    setDialogSpiderParentInfo({
      id: objVPageInfo?.contentId,
      title: objVPageInfo?.title,
    });
  }, [objVPageInfo]);

  const handleBannerClick = useCheckLogin((e) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("handleBannerClick");
  });

  const handleDetailClick = (info) => {
    console.log("handleDetailClick", info);
    Taro.navigateTo({
      url:
        `/pages/ArticleDetail/index` +
        `?type=NOTICE` +
        `&articleId=${info?._id}`,
    });
  };

  const handleDeleteClick = (info) => {
    console.log("handleDetailClick", info);
    Taro.showModal({
      title: "提示",
      content: "确认删除该篇文章？",
      cancelText: "取消",
      confirmColor: "#ff0000",
      confirmText: "删除",
      success: async (res) => {
        if (res.confirm) {
          console.log("用户点击确定");
          Taro.showToast({
            title: "删除中",
            icon: "loading",
            mask: true,
            duration: 20000,
          });
          const params = {
            articleId: info._id,
          };
          const res = await Api.cloud.fetchArticleInfo.deleteNotice(params);
          Taro.hideToast({});
          if (res) {
            onWeatherArticleListUpdate && onWeatherArticleListUpdate();
            Taro.showToast({
              title: "删除成功",
              icon: "success",
            });
          } else {
            Taro.showToast({
              title: "删除失败",
              icon: "none",
            });
          }
        }
      },
    });
  };

  // 成功发布文章回调
  const handleDialogSpiderSuccess = () => {
    onWeatherArticleListUpdate && onWeatherArticleListUpdate();
  };

  return (
    <View className="vp-weather-article-wrap">
      <View className="vp-weather-article-content">
        {/*  */}
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
            {
              url: CloudFileManager.getCloudUrl(
                "resource/weather-banner_4.jpg"
              ),
            },
          ]}
          onBannerClick={handleBannerClick}
        />
        {/* 气象文章列表 */}
        <ListNode
          isLoadCompleteList={isLoadComplete}
          isShowDelete={isEasterEgg}
          strType={"MOMENT"}
          arrList={arrWeatherArticleList}
          showBottomLoadingTip={isShowWeatherArticleListLoadingTip}
          customClass="vp-weather-article-list"
          onDetailClick={handleDetailClick}
          onDeleteClick={handleDeleteClick}
        />
        {/* 发布模块 */}
        {isEasterEgg && (
          <ButtonFloat
            objDialogSpiderParentInfo={objDialogSpiderParentInfo}
            onDialogSpiderSuccess={handleDialogSpiderSuccess}
          />
        )}
      </View>
    </View>
  );
}
