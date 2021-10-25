import React, { Fragment, useEffect, useRef, useState } from "react";
import { AtForm, AtList, AtListItem, AtInput, AtButton } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Api from "@/api";
import PageContent from "@/components/PageContent";
import ModuleCard from "@/components/ModuleCard";
import useDebounce from "@/hooks/useDebounce";
import ModuleEasterEgg from "@/pages/EasterEgg/components/ModuleEasterEgg";

import "./index.less";

export default function EasterEgg() {
  const { params } = useRouter();

  return (
    <PageContent
      strNavigationTitle="彩蛋管理页面"
      colorBackgroud="transparent"
      isShowLeftIcon
      isTransparent={false}
      isSafeBottom
      customClass="flex-center-v easter-egg-wrap"
    >
      {/* 彩蛋模块 */}
      <ModuleEasterEgg />
    </PageContent>
  );
}
