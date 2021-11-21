import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AtList, AtListItem } from "taro-ui";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Api from "@/api";
import Config from "@/config";
import ModuleCard from "@/components/ModuleCard";
import useActions from "@/hooks/useActions";
import appInfoActions from "@/redux/actions/appInfo";

import "./index.less";

interface IModuleEasterEggParam {}

export default function ModuleEasterEgg(props: IModuleEasterEggParam) {
  const {} = props;

  const { configInfo } = useSelector((state) => state.appInfo);

  const { setAppEasterEgg } = useActions(appInfoActions);

  // 点击切换
  const handleTabBarEnableChange = async (item, index, e) => {
    const value = e?.detail?.value;
    console.log("handleTabBarEnableChange", item, value);
    Taro.showToast({
      title: "切换中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
    const params = {
      appId: Config.appId,
      tabId: item.id,
      tabIndex: index,
      enable: value,
    };
    const res = await Api.cloud.fetchAppInfo.updateAppTabBar(params);
    Taro.hideToast();
    console.log("handleTabBarEnableChange", res);
    if (res) {
      Taro.showToast({
        title: "切换成功",
        icon: "success",
      });
      setTimeout(() => {
        setAppEasterEgg(false);
        Taro.reLaunch({
          url: "/pages/Loading/index",
        });
      }, 1000);
    } else {
      Taro.showToast({
        title: "切换失败",
        icon: "none",
      });
    }
  };

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <View className="module-easter-egg-wrap">
      <ModuleCard title="彩蛋模块" customClass="flex-center-h">
        <AtList>
          {configInfo?.tabListSource &&
            configInfo?.tabListSource.map((item, index) => {
              return (
                <AtListItem
                  title={item.title}
                  isSwitch={item.contentType !== "MINE"}
                  switchIsCheck={item.enable}
                  onSwitchChange={(e) =>
                    handleTabBarEnableChange(item, index, e)
                  }
                />
              );
            })}
        </AtList>
      </ModuleCard>
    </View>
  );
}
