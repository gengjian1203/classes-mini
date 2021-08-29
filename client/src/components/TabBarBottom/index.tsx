import React, { Fragment, useEffect, useState } from "react";
import { AtTabBar } from "taro-ui";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import PanelBottom from "@/components/PanelBottom";

import "./index.less";

interface ITabbarBottomProps {
  arrTabBarList: Array<any>;
  nTabBarCurrent: number;
  onTabBarSelect: (any?: any) => void;
}

export default function TabBarBottom(props: ITabbarBottomProps) {
  const { arrTabBarList = [], nTabBarCurrent = 0, onTabBarSelect } = props;

  const handleTabbarSelect = (current) => {
    if (current === nTabBarCurrent) {
      return;
    }
    onTabBarSelect && onTabBarSelect(current);
  };

  return (
    <PanelBottom fixed isSafeBottom>
      <AtTabBar
        fixed={false}
        tabList={arrTabBarList}
        current={nTabBarCurrent}
        onClick={handleTabbarSelect}
      />
    </PanelBottom>
  );
}
