import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Api from "@/api";
import Banner from "@/components/Banner";
import Menu from "@/components/Menu";
import Tab from "@/components/Tab";
import ConfigMenuRouter from "@/config/menuRouter";
import GroupInfo from "@/pages/Main/components/GroupInfo";
import CloudFileManager from "@/services/CloudFileManager";
import Utils from "@/utils";

import "./index.less";

interface IVpGroupParam {
  isLoadComplete?: boolean;
  isTabListLoadComplete?: boolean;
  contentId?: string; // 内容Id
  arrTabNoticeList?: any; // 帖子列表
  onTabChange?: (any?: any) => void; // 切换tab
  onTabListUpdate?: (any?: any) => void;
}

export default function VpGroup(props: IVpGroupParam) {
  const {
    isLoadComplete = true,
    isTabListLoadComplete = true,
    contentId = "",
    arrTabNoticeList = [],
    onTabChange,
    onTabListUpdate,
  } = props;

  const [objGroupDetail, setGroupDetail] = useState<any>({});

  const { isEasterEgg } = useSelector((state) => state.appInfo);

  const dealGroupDetail = (res) => {
    res?.moduleTemplate?.map((itemModule, indexModule) => {
      let objAny: any = null;
      switch (itemModule.type) {
        case "BANNER": {
          objAny = itemModule?.content?.map((item, index) => {
            return {
              url: CloudFileManager.getCloudUrl(item),
            };
          });
          break;
        }
        case "INFO": {
          objAny = {
            dataAddress: res?.dataAddress,
            dataDescribe: res?.dataDescribe,
            dataLatitude: res?.dataLatitude,
            dataLongitude: res?.dataLongitude,
            dataLogo: res?.dataLogo,
            dataTitle: res?.dataTitle,
            dataCellphone: res?.dataCellphone,
          };
          break;
        }
        case "MENU": {
          objAny = itemModule?.content?.map((item, index) => {
            return {
              ...item,
              icon: CloudFileManager.getCloudUrl(item.icon),
            };
          });
          break;
        }
        case "TAB": {
          objAny = itemModule?.content;
          break;
        }
        default: {
          break;
        }
      }
      itemModule.objAny = objAny;
      return itemModule;
    });

    return res;
  };

  const onLoad = async () => {
    const params = {
      groupId: contentId,
    };
    const res = await Api.cloud.fetchGroupInfo.queryGroupDetail(params);
    const resGroupDetail = dealGroupDetail(res);
    console.log("VpGroup", resGroupDetail);
    setGroupDetail(resGroupDetail);

    // 如果有TAB类型，则触发加载第一项tab
    const nIndexTab = res?.moduleTemplate?.findIndex(
      (itemModule, indexModule) => {
        return itemModule.type === "TAB";
      }
    );
    if (nIndexTab >= 0) {
      const itemModule = res?.moduleTemplate[nIndexTab];
      if (itemModule?.content?.length > 0) {
        const itemTab = itemModule?.content[0];
        onTabChange && onTabChange(itemTab);
      }
    }
  };

  useEffect(() => {
    onLoad();
  }, [contentId]);

  const handleBannerClick = (e) => {
    // console.log("handleBannerClick", e);
  };

  // 点击菜单项
  const handleMenuItemClick = (item) => {
    console.log("handleMenuItemClick", item);
    const urlPath =
      item.url ||
      ConfigMenuRouter[item.type]?.url ||
      ConfigMenuRouter["default"]?.url;

    const url = Utils.routerAppendParams(urlPath, {
      title: item.title,
    });
    Taro.navigateTo({
      url: url,
    });
  };

  // 点击tab列表项目
  const handleTabItemDetailClick = (item) => {
    console.log("handleTabItemDetailClick", item);
    const url = Utils.routerAppendParams("/pages/ArticleDetail/index", {
      type: "NOTICE",
      articleId: item?._id,
    });
    Taro.navigateTo({
      url: url,
    });
  };

  // 删除列表项
  const handleTabItemDeleteClick = (info) => {
    console.log("handleDetailClick", info);
    Taro.showModal({
      title: "提示",
      content: "确认删除该篇文章？",
      cancelText: "取消",
      confirmColor: "#ff0000",
      confirmText: "删除",
      success: async (res) => {
        if (res.confirm) {
          console.log("用户点击确定");
          Taro.showToast({
            title: "删除中",
            icon: "loading",
            mask: true,
            duration: 20000,
          });
          const params = {
            articleId: info._id,
          };
          const res = await Api.cloud.fetchArticleInfo.deleteNotice(params);
          Taro.hideToast({});
          if (res) {
            onTabListUpdate && onTabListUpdate();
            Taro.showToast({
              title: "删除成功",
              icon: "success",
            });
          } else {
            Taro.showToast({
              title: "删除失败",
              icon: "none",
            });
          }
        }
      },
    });
  };

  // 切换tab
  const handleTabChange = (objTab) => {
    // console.log("handleTabChange", objTab);
    onTabChange && onTabChange(objTab);
  };

  // 主动触发tab列表的刷新
  const handleTabListUpdate = () => {
    onTabListUpdate && onTabListUpdate();
  };

  const renderGroupModule = () => {
    return objGroupDetail?.moduleTemplate?.map((itemModule, indexModule) => {
      const { objAny } = itemModule || {};
      return {
        BANNER: (
          <Banner
            customClass="group-module-wrap"
            arrBannerList={objAny}
            key={`group-module-${indexModule}`}
            onBannerClick={handleBannerClick}
          />
        ),
        INFO: (
          <GroupInfo
            customClass="group-module-wrap"
            key={`group-module-${indexModule}`}
            dataAddress={objAny?.dataAddress}
            dataDescribe={objAny?.dataDescribe}
            dataLatitude={objAny?.dataLatitude}
            dataLongitude={objAny?.dataLongitude}
            dataLogo={objAny?.dataLogo}
            dataTitle={objAny?.dataTitle}
            dataCellphone={objAny?.dataCellphone}
          />
        ),
        MENU: (
          <Menu
            customClass="group-module-wrap"
            showModuleValView={objAny}
            key={`group-module-${indexModule}`}
            onMenuItemClick={handleMenuItemClick}
          />
        ),
        TAB: (
          <Tab
            isLoadCompleteList={isTabListLoadComplete}
            isShowDelete={isEasterEgg}
            customClass="group-module-wrap"
            key={`group-module-${indexModule}`}
            showModuleValView={objAny}
            arrList={arrTabNoticeList}
            onDetailClick={handleTabItemDetailClick}
            onDeleteClick={handleTabItemDeleteClick}
            onTabChange={handleTabChange}
            onTabListUpdate={handleTabListUpdate}
          />
        ),
      }[itemModule.type];
    });
  };

  return (
    <View className="vp-group-wrap">
      <View className="flex-start-v vp-group-content">
        {renderGroupModule()}
      </View>
    </View>
  );
}
