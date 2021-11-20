import React, { Fragment, useEffect, useRef, useState } from "react";
import Taro from "@tarojs/taro";
import { WebView } from "@tarojs/components";
import PageContent from "@/components/PageContent";
import useDecodeRouter from "@/hooks/useDecodeRouter";

import "./index.less";

export default function WebPage() {
  const { params } = useDecodeRouter();
  const { urlWeb = "" } = params || {};

  const handleWebViewMessage = (e) => {
    console.log("handleWebViewMessage", e);
  };

  return (
    <PageContent
      strNavigationTitle=""
      colorBackgroud=""
      isShowLeftIcon
      isTransparent={false}
      isSafeBottom
    >
      <WebView src={urlWeb} onMessage={handleWebViewMessage} />
    </PageContent>
  );
}