import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Skeleton from "@/components/skeleton";
import { View, Image } from "@tarojs/components";

import ModuleHeader from "../../components/ModuleHeader";

import "./index.less";

interface IVpWaveParam {
  title?: string;
  isLoadComplete?: boolean;
  onTitleClick?: any;
}

export default function VpWave(props: IVpWaveParam) {
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
    <View className="vp-wave-wrap">
      <View className="flex-start-v vp-wave-content">
        <View>中波页面</View>
      </View>
    </View>
  );
}
