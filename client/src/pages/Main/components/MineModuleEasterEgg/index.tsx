import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { AtList, AtListItem, AtInput, AtButton } from "taro-ui";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Api from "@/api";
import Config from "@/config";
import ModuleCard from "@/components/ModuleCard";
import useActions from "@/hooks/useActions";
import useDebounce from "@/hooks/useDebounce";
import appInfoActions from "@/redux/actions/appInfo";

import "./index.less";

interface IMineModuleEasterEggParam {}

export default function MineModuleEasterEgg(props: IMineModuleEasterEggParam) {
  const {} = props;

  const { isEasterEgg, configInfo } = useSelector((state) => state.appInfo);

  const { setAppEasterEgg } = useActions(appInfoActions);

  const [urlServceWeiXin, setUrlServceWeiXin] = useState<string>("");

  // 输入微信公众号文章链接
  const handleUrlServceWeiXinChange = useDebounce((value) => {
    setUrlServceWeiXin(value);
  }, 100);

  // 点击爬取微信公众号文章
  const hanldeUrlServceWeiXinClick = async () => {
    Taro.showToast({
      title: "文章爬取中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
    const params = {
      urlServce: urlServceWeiXin,
    };
    const res = await Api.cloud.fetchAppInfo.spiderArticleInfoWeiXin(params);
    console.log("handleUrl", res);
    Taro.hideToast();
    if (res && res.length > 0) {
      Taro.showToast({
        title: "爬取成功",
        icon: "success",
      });
    } else {
      Taro.showToast({
        title: "该文章已被收录，或搜索不到该文章。",
        icon: "none",
      });
    }
  };

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
    Taro.hideToast({});
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
      {isEasterEgg && (
        <ModuleCard title="彩蛋模块" customClass="flex-center-h">
          <AtInput
            name="weixin_urlServce"
            title="爬取公众号"
            type="text"
            placeholder="https://mp.weixin.qq.com/s/JsnvAFe6CNU5c8HbltbqAA"
            value={urlServceWeiXin}
            onChange={handleUrlServceWeiXinChange}
          />
          <AtButton
            className=""
            type="primary"
            circle
            onClick={hanldeUrlServceWeiXinClick}
          >
            爬取
          </AtButton>
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
      )}
    </View>
  );
}
