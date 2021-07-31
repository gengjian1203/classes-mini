import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";
import Skeleton from "@/components/Skeleton";

import "./index.less";

interface IMenuParam {
  isLoadComplete?: boolean;
  showModuleValView?: Array<any>;
}

export default function Menu(props: IMenuParam) {
  const { isLoadComplete = true, showModuleValView = [1, 2, 3, 4] } = props;

  return (
    <View className="flex-between-h menu-wrap">
      {showModuleValView.map((item, index) => {
        return (
          <Skeleton
            key={index}
            loading={!isLoadComplete}
            type="column"
            avatar
            title
            titleWidth="80%"
            customClass="menu-item"
          >
            {item}
          </Skeleton>
        );
      })}
    </View>
  );
}
