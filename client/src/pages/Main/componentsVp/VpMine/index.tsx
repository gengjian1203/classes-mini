import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import ModuleCard from "@/components/ModuleCard";
import { View, Image } from "@tarojs/components";
import MineModuleHeader from "@/pages/Main/components/MineModuleHeader";

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
    <View className="vp-mine-wrap">
      <MineModuleHeader
        memberId={memberInfo?._id}
        logoUrl={memberInfo?.userAvatarUrl}
        title={memberInfo?.userNickName}
      />
      <View className="flex-start-v vp-mine-content">
        <ModuleCard title="提示" customClass="vp-mine-module-card" isEnableFold>
          <View>欢迎使用本小程序</View>
        </ModuleCard>
      </View>
    </View>
  );
}
