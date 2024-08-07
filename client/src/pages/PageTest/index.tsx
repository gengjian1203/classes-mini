import React, { Fragment, useEffect, useRef, useState } from "react";
import { View, Image } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
import PageContent from "@/components/PageContent";
import PanelImageCropper from "@/components/PanelImageCropper";
import useDecodeRouter from "@/hooks/useDecodeRouter";

import "./index.less";

export default function PageTest() {
  const { params } = useDecodeRouter();

  const [isShowPanelImageCropper, setShowPanelImageCropper] = useState(false);
  const [urlImage, setUrlImage] = useState("");

  const handleIconClick = () => {
    console.log("handleIconClick");
    setShowPanelImageCropper(true);
  };

  const handleImageCropperClose = () => {
    setShowPanelImageCropper(false);
  };

  const handleImageCropperSave = (url) => {
    setUrlImage(url);
  };

  return (
    <PageContent
      strNavigationTitle="测试页面"
      colorBackgroud="transparent"
      isShowLeftIcon
      isTransparent={false}
      isSafeBottom
      customClass="flex-start-v page-test-wrap"
    >
      <View className="page-test-wrap">Hello, PageTest</View>

      {isShowPanelImageCropper && (
        <PanelImageCropper
          imgSrc="https://thirdwx.qlogo.cn/mmopen/vi_32/DYAIOgq83eok35Mz1icBNA8Zv05mxSvkbGNr8mJLbmLH0qVlCia9COniaKjhZmlnxfWEeUa3dhAJWH9qJydhNhKKA/132"
          width={300}
          height={300}
          disableRatio
          onImageCropperSave={handleImageCropperSave}
          onImageCropperClose={handleImageCropperClose}
        />
      )}

      <ButtonIcon
        width={100}
        height={100}
        radius={100}
        value={"sjsj"}
        isRippling
        onClick={handleIconClick}
      />

      <Image src={urlImage} mode="widthFix" />
    </PageContent>
  );
}
