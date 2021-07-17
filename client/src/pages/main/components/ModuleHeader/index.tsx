import React, { useState, useEffect, Fragment } from "react";
import { View, Image } from "@tarojs/components";
import Skeleton from "@/components/skeleton";

import "./index.less";

interface IModuleHeaderParam {
  isLoadComplete?: boolean;
  logoUrl?: string;
  title?: string;
}

export default function ModuleHeader(props: IModuleHeaderParam) {
  const {
    isLoadComplete = false,
    logoUrl = "",
    title = "", // 标题
  } = props;

  return (
    <Skeleton
      loading={!isLoadComplete}
      row={1}
      rowProps={{ width: "100%", height: 300 }}
      customClass="flex-center-h module-header-wrap"
    >
      <Fragment>
        <View className="flex-center-v module-header-left">
          <View className="module-header-left-up">{title}</View>
          <View className="module-header-left-down">{title}</View>
        </View>
        <View className="flex-center-v module-header-right">
          <Image
            src={logoUrl}
            mode="scaleToFill"
            className="module-header-right-logo"
          />
        </View>
        <View className="flex-center-h module-header-absolute">
          <View className="iconfont iconscan icon-absolute"></View>
        </View>
      </Fragment>
    </Skeleton>
  );
}
