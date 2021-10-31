import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import Api from "@/api";
import Banner from "@/components/Banner";
import ListNode from "@/components/ListNode";
import Config from "@/config";
import useCheckLogin from "@/hooks/useCheckLogin";

import "./index.less";

interface IVpArticleListParam {
  isLoadComplete?: boolean;
  arrArticleList?: Array<any>;
  isShowArticleListLoadingTip?: boolean;
  onArticleListUpdate?: () => void;
}

export default function VpArticleList(props: IVpArticleListParam) {
  const {
    isLoadComplete = true,
    arrArticleList = [], //
    isShowArticleListLoadingTip = false,
    onArticleListUpdate,
  } = props;

  const { isEasterEgg } = useSelector((state) => state.appInfo);

  useEffect(() => {}, []);

  const handleDetailClick = (info) => {
    console.log("handleDetailClick", info);
    Taro.navigateTo({
      url:
        `/pages/ArticleDetail/index` +
        `?type=ZHIHU` +
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
          const res = await Api.cloud.fetchArticleInfo.deleteWeatherArticle(
            params
          );
          Taro.hideToast({});
          if (res) {
            onArticleListUpdate && onArticleListUpdate();
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

  return (
    <View className="vp-article-list-wrap">
      <View className="vp-article-list-content">
        {/* 资讯文章列表 */}
        <ListNode
          isLoadCompleteList={isLoadComplete}
          isShowDelete={isEasterEgg}
          strType={"MOMENT"}
          arrList={arrArticleList}
          showBottomLoadingTip={isShowArticleListLoadingTip}
          customClass="vp-article-list-list"
          onDetailClick={handleDetailClick}
          onDeleteClick={handleDeleteClick}
        />
      </View>
    </View>
  );
}
