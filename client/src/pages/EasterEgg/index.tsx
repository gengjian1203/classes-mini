import React, { Fragment, useEffect, useRef, useState } from "react";
import PageContent from "@/components/PageContent";
import useDecodeRouter from "@/hooks/useDecodeRouter";
import ModuleEasterEgg from "@/pages/EasterEgg/components/ModuleEasterEgg";

import "./index.less";

export default function EasterEgg() {
  const { params } = useDecodeRouter();

  return (
    <PageContent
      strNavigationTitle="彩蛋管理页面"
      colorBackgroud="transparent"
      isShowLeftIcon
      isTransparent={false}
      isSafeBottom
      customClass="flex-start-v easter-egg-wrap"
    >
      {/* 彩蛋模块 */}
      <ModuleEasterEgg />
    </PageContent>
  );
}
