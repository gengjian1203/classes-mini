import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Skeleton from "@/components/skeleton";
import { View, Image } from "@tarojs/components";

import ModuleHeader from "../../components/ModuleHeader";

import "./index.less";

interface IVpMineParam {
  title?: string;
  isLoadComplete?: boolean;
  onTitleClick?: any;
}

export default function VpMine(props: IVpMineParam) {
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

  // 点击标题
  const handleTitleClick = () => {
    onTitleClick && onTitleClick();
  };

  // 点击数值
  const handleValueClick = () => {
    setValue(Math.random());
  };

  return (
    <View className="flex-start-v vp-mine-wrap">
      <ModuleHeader
        isLoadComplete={isLoadComplete}
        logoUrl={memberInfo?.userAvatarUrl}
        title={memberInfo?.userNickName}
      />
    </View>
  );
}
