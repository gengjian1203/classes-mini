import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Image } from "@tarojs/components";

import ModuleHeader from "../../components/ModuleHeader";

import "./index.less";

interface IVpStoryMapParam {
  title?: string;
  isLoadComplete?: boolean;
  onTitleClick?: any;
}

export default function VpStoryMap(props: IVpStoryMapParam) {
  const {
    title = "", // 标题
    isLoadComplete = true,
    onTitleClick = () => {}, // 点击标题回调
  } = props;

  const memberInfo = useSelector((state) => state.memberInfo);

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(Math.random());
  }, []);

  return (
    <View className="vp-story-map-wrap">
      <View className="flex-start-v vp-story-map-content">
        <View>故事墙内容</View>
      </View>
    </View>
  );
}
