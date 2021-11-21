import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Api from "@/api";
import ButtonFloat from "@/components/ButtonFloat";
import ListNode from "@/components/ListNode";
import Utils from "@/utils";

import "./index.less";

interface IVpStoryMapParam {
  isLoadComplete?: boolean;
  objVPageInfo?: any;
  arrStoryList?: Array<any>;
  onStoryMapUpdate?: () => void;
}

export default function VpStoryMap(props: IVpStoryMapParam) {
  const {
    isLoadComplete = true,
    objVPageInfo = {},
    arrStoryList = [],
    onStoryMapUpdate,
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

  const handleDetailClick = (info) => {
    console.log("handleDetailClick", info);
    const url = Utils.routerAppendParams("/pages/ArticleDetail/index", {
      type: "NOTICE",
      articleId: info?._id,
    });
    Taro.navigateTo({
      url: url,
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
          Taro.hideToast();
          if (res) {
            onStoryMapUpdate && onStoryMapUpdate();
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
    onStoryMapUpdate && onStoryMapUpdate();
  };

  return (
    <View className="vp-story-map-wrap">
      <View className="flex-start-v vp-story-map-content">
        <ListNode
          isLoadCompleteList={isLoadComplete}
          isShowDelete={isEasterEgg}
          strType={"STORY"}
          arrList={arrStoryList}
          customClass="vp-story-map-list"
          onDetailClick={handleDetailClick}
          onDeleteClick={handleDeleteClick}
        />
      </View>
      {/* 发布模块 */}
      {isEasterEgg && (
        <ButtonFloat
          objDialogSpiderParentInfo={objDialogSpiderParentInfo}
          onDialogSpiderSuccess={handleDialogSpiderSuccess}
        />
      )}
    </View>
  );
}
