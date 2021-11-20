import React, { Fragment, useEffect, useRef, useState } from "react";
import { View } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";
import PageContent from "@/components/PageContent";
import useDecodeRouter from "@/hooks/useDecodeRouter";

import "./index.less";

export default function PageTest() {
  const { params } = useDecodeRouter();

  const handleIconClick = () => {
    console.log("handleIconClick");
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

      <ButtonIcon
        width={100}
        height={100}
        radius={100}
        value={"sjsj"}
        isRippling
        onClick={handleIconClick}
      />
    </PageContent>
  );
}
