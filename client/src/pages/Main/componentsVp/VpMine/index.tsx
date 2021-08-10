import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AtList, AtListItem } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import ConfigTag from "@/config/tag";
import ButtonIcon from "@/components/ButtonIcon";
import ModuleCard from "@/components/ModuleCard";
import Permission from "@/components/Permission";
import useActions from "@/hooks/useActions";
import useCheckLogin from "@/hooks/useCheckLogin";
import MineModuleHeader from "@/pages/Main/components/MineModuleHeader";
import shareInfoActions from "@/redux/actions/shareInfo";
import Utils from "@/utils";

import "./index.less";

interface IVpMineParam {
  isLoadComplete?: boolean;
}

export default function VpMine(props: IVpMineParam) {
  const { isLoadComplete = true } = props;

  const memberInfo = useSelector((state) => state.memberInfo);

  const { setShareInfo } = useActions(shareInfoActions);

  useEffect(() => {}, []);

  // 编辑职工
  const handleEditWorkerClick = () => {
    Taro.navigateTo({
      url: "/pages/EditWorker/index",
    });
  };

  // 录入排班
  const handleEditTaskClick = () => {
    Taro.showToast({ title: "暂未开放", icon: "none" });
  };

  // 窜班调整
  const handleUpdateTaskClick = () => {
    Taro.showToast({ title: "暂未开放", icon: "none" });
  };

  // 分享按钮点击事件
  const handleBtnShareClick = useCheckLogin(() => {
    const objShareParam = Utils.processSharePath({
      shareType: Utils.getShareTypeName("POPULARIZE"),
      sharePath: "/pages/Main/index",
    });
    setShareInfo({
      isShowPanelShare: true,
      strShareTitle: "",
      strShareImage: "",
      objShareParam: objShareParam,
    });
  });

  return (
    <View className="vp-mine-wrap">
      <MineModuleHeader memberInfo={memberInfo} />
      <View className="flex-center-v vp-mine-content">
        {/* 简介面板 */}
        <ModuleCard
          customClass="vp-mine-module "
          customContentClass="flex-between-h vp-mine-module-self "
        >
          <View className="flex-center-v vp-mine-module-self-item">
            <View className="vp-mine-module-self-item-up">下次值班</View>
            <View className="vp-mine-module-self-item-down">--</View>
          </View>
          <View className="flex-center-v vp-mine-module-self-item">
            <View className="vp-mine-module-self-item-up">欠班情况</View>
            <View className="vp-mine-module-self-item-down">--</View>
          </View>
          <View className="flex-center-v vp-mine-module-self-item">
            <View className="vp-mine-module-self-item-up">本周代办</View>
            <View className="vp-mine-module-self-item-down">--</View>
          </View>
        </ModuleCard>

        {/* 管理模块 */}
        <Permission strCheckPosition={"LEADER"}>
          <ModuleCard
            title="管理"
            customClass="vp-mine-module vp-mine-module-manager"
          >
            <AtList>
              <AtListItem
                iconInfo={{
                  size: 24,
                  color: "var(--color-primary)",
                  value: "iconfont icongroup",
                }}
                title="编辑职工"
                onClick={handleEditWorkerClick}
                arrow="right"
              />
              <AtListItem
                iconInfo={{
                  size: 24,
                  color: "var(--color-primary)",
                  value: "iconfont iconactivity",
                }}
                title="录入排班"
                onClick={handleEditTaskClick}
                arrow="right"
              />
              <AtListItem
                iconInfo={{
                  size: 24,
                  color: "var(--color-primary)",
                  value: "iconfont iconflip",
                }}
                title="窜班调整"
                onClick={handleUpdateTaskClick}
                arrow="right"
              />
            </AtList>
          </ModuleCard>
        </Permission>
        {/* 分享浮动按钮 */}
        <View className="safe-bottom flex-center-v vp-mine-float-btn-panel">
          <ButtonIcon
            value="iconsend"
            width={100}
            height={100}
            radius={50}
            size={60}
            color="var(--color-primary)"
            onClick={handleBtnShareClick}
          />
        </View>
      </View>
    </View>
  );
}
