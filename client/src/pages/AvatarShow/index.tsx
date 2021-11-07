import React, { useState } from "react";
import { useSelector } from "react-redux";
import Taro, { useRouter } from "@tarojs/taro";

import { View } from "@tarojs/components";
import PageContent from "@/components/PageContent";
import useActions from "@/hooks/useActions";
import useCheckLogin from "@/hooks/useCheckLogin";
import shareInfoActions from "@/redux/actions/shareInfo";
import Utils from "@/utils";

// import ModuleCanvas from "./components/ModuleCanvas";
// import ModuleJewelry from "./components/ModuleJewelry";
// import ModuleButton from "./components/ModuleButton";
// import ModuleCanvasSave from "./components/ModuleCanvasSave";

import "./index.less";

export default function AvatarShow() {
  const { path } = useRouter();

  const { setShareInfo } = useActions(shareInfoActions);

  // 分享弹窗
  const handleShowPanelShare = useCheckLogin(() => {
    const objShareParam = Utils.processSharePath({
      shareType: Utils.getShareTypeName("POPULARIZE"),
      sharePath: "/pages/Main/index",
    });
    setShareInfo({
      isShowPanelShare: true,
      strShareTitle: "",
      strShareImage: "",
      objShareParam: objShareParam,
    });
  });

  return (
    <PageContent
      customClass="avatar-show-wrap"
      isShowLeftIcon
      strNavigationTitle="我的头像秀"
    >
      {/* 头像主页面 */}
      {/* <ModuleCanvas /> */}
      {/* 底部操作区 */}
      {/* <View className="avatar-show-bottom"> */}
      {/* 饰品栏 */}
      {/* <ModuleJewelry /> */}
      {/* 按钮区 */}
      {/* <ModuleButton onShowPanelShare={handleShowPanelShare} /> */}
      {/* </View> */}

      {/* 屏外绘制保存的图片 */}
      {/* <ModuleCanvasSave /> */}
    </PageContent>
  );
}
