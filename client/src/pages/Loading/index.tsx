import React, { Fragment, useEffect, useState, useRef } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { Image } from "@tarojs/components";
import useActions from "@/hooks/useActions";
import Api from "@/api";
import Config from "@/config";
import appInfoActions from "@/redux/actions/appInfo";
import memberInfoActions from "@/redux/actions/memberInfo";
import shareInfoActions from "@/redux/actions/shareInfo";
import PageContent from "@/components/PageContent";
import Utils from "@/utils";

import "./index.less";

export default function Loading() {
  const { params } = useRouter();

  const {
    setAppConfigInfo,
    setAppHomePage,
    setAppTabBarInfo,
    setShowLayoutLogin,
  } = useActions(appInfoActions);
  const timeShowToast = useRef<NodeJS.Timeout>(null);
  const { setMemberInfo } = useActions(memberInfoActions);
  const { setShareInfo, setSourceInfo } = useActions(shareInfoActions);

  const jumpPage = (resQueryQrCode, linkParams) => {
    const { params: sceneParams } = Utils.router2Params(
      resQueryQrCode?.sharePathFull || ""
    );
    console.log("jumpPage", sceneParams, linkParams);
    if (sceneParams?.sharePath) {
      const shareScenePath = decodeURIComponent(sceneParams?.sharePath || "");
      setSourceInfo({
        sourceID: sceneParams?.sourceID || "",
        shareType: `QRCODE_${sceneParams?.shareType || "MINIPROGRAM"}`,
        sharePath: shareScenePath || "/pages/Loading/index",
      });
      Taro.redirectTo({
        url: shareScenePath,
      });
    } else if (linkParams?.sharePath) {
      const shareLinkPath = decodeURIComponent(linkParams?.sharePath || "");
      setSourceInfo({
        sourceID: linkParams?.sourceID || "",
        shareType: `LINK_${linkParams?.shareType || "MINIPROGRAM"}`,
        sharePath: shareLinkPath || "/pages/Loading/index",
      });
      Taro.redirectTo({
        url: shareLinkPath,
      });
    } else {
      Taro.redirectTo({
        url: `/pages/Main/index`,
      });
    }
  };

  const initAppState = () => {
    setShowLayoutLogin(false);
    setShareInfo({ isShowPanelShare: false });
  };

  const delay3000 = async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(true);
      }, 3000);
    });
  };

  const onLoad = async () => {
    if (process.env.TARO_ENV === "weapp") {
      Taro.hideShareMenu();
    }
    initAppState();

    timeShowToast.current = setTimeout(() => {
      Taro.showToast({
        title: "首次加载中，请耐心等待",
        icon: "none",
        duration: 60000,
      });
    }, 1000);

    const arrQueryList = [
      Api.cloud.fetchAppInfo.queryConfig({ appId: Config.appId }),
      // Api.cloud.fetchAppInfo.queryAppTabBar(),
      Api.cloud.fetchMemberInfo.queryMember(),
      // delay3000(),
    ];
    if (params.scene) {
      arrQueryList.push(Api.cloud.fetchQRCodeInfo.queryQRCode(params));
    }
    const [
      resQueryConfig,
      // resQueryAppTabBar,
      resQueryMember,
      resQueryQrCode,
    ] = await Promise.all(arrQueryList);

    clearTimeout(timeShowToast.current);

    setAppHomePage("/pages/Main/index");
    console.log(
      "Loading",
      resQueryConfig,
      // resQueryAppTabBar,
      resQueryMember,
      resQueryQrCode
    );
    if (resQueryConfig) {
      const {
        arrTabbarList = [],
        colorPrimary = "#60b968",
        strGroupId = "",
      } = resQueryConfig;
      const arrTabbarListTmp = arrTabbarList
        .filter((item) => {
          return item.enable;
        })
        .sort((itemA, itemB) => {
          const idA = itemA?.id || "";
          const idB = itemB?.id || "";
          return idA.localeCompare(idB);
        });
      console.log("Loading1", arrTabbarListTmp, arrTabbarList);

      if (arrTabbarListTmp?.length > 0) {
        setAppConfigInfo({
          tabList: arrTabbarListTmp,
          tabListSource: arrTabbarList,
          nTabListCurrent: 0,
          colorPrimary: colorPrimary,
          strGroupId: strGroupId,
        });
        setMemberInfo(resQueryMember);
        jumpPage(resQueryQrCode, params);
      } else {
        Taro.showToast({
          title: "未找到入口页面",
          icon: "none",
        });
      }
    }
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <PageContent
      isShowLeftIcon={false}
      strNavigationTitle=""
      colorBackgroud="transparent"
      isTransparent
      customClass="flex-center-v loading-page-wrap"
    >
      <Image
        src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=2045442301,3285918522&fm=26&gp=0.jpg"
        mode="aspectFill"
        style="width: 100vw; height: 100vh;"
      />
    </PageContent>
  );
}
