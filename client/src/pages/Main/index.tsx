import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Api from "@/api";
import useActions from "@/hooks/useActions";
import useQueryPageList from "@/hooks/useQueryPageList";
import useCheckLogin from "@/hooks/useCheckLogin";
import ButtonIcon from "@/components/ButtonIcon";
import PageContent from "@/components/PageContent";
import TabbarBottom from "@/components/TabBarBottom";
import QRCodeManager from "@/services/QRCodeManager";
import appInfoActions from "@/redux/actions/appInfo";
import shareInfoActions from "@/redux/actions/shareInfo";
import Utils from "@/utils";

import VpClasses from "./componentsVp/VpClasses/index";
import VpHome from "./componentsVp/VpHome/index";
import VpMine from "./componentsVp/VpMine/index";
import VpSatellite from "./componentsVp/VpSatellite/index";
import VpTest from "./componentsVp/VpTest/index";
import VpWave from "./componentsVp/VpWave/index";

import "./index.less";

export default function Main() {
  const {} = useRouter();

  const [isLoadComplete, setLoadComplete] = useState<boolean>(false); // 加载完毕
  const [strNavigationTitle, setNavigationTitle] = useState<string>("");
  const [nTabBarCurrent, setTabBarCurrent] = useState<number>(0);
  const [strTestImageUrl, setTestImageUrl] = useState<string>("");

  // 班级列表
  const [paramQueryClassByKeyTitle, setQueryClassByKeyTitle] = useState({
    keyTitle: "",
  });
  const [arrClassList, setClassList] = useState<Array<any>>([]);

  // 底部导航
  const { tabBarInfo } = useSelector((state) => state.appInfo);
  const { setAppTabBarCurrentId, setShowLayoutLogin } = useActions(
    appInfoActions
  );
  const { setShareInfo } = useActions(shareInfoActions);

  const onLoad = async () => {
    const params = {
      nPageNum: 0,
      nPageSize: 10,
    };
    // const res = await WXCloud.articleInfo.queryArticleList(params)
    // console.log('onLoad', res)
  };

  // 监听底部导航数据变化
  const watchTabBarCurrent = async () => {
    setNavigationTitle(tabBarInfo?.tabList[nTabBarCurrent].title);
    setAppTabBarCurrentId(tabBarInfo?.tabList[nTabBarCurrent].id);
    switch (tabBarInfo?.tabList[nTabBarCurrent].contentType) {
      case "GROUP":
        return;
        break;
      case "HOME":
        break;
      case "MINE":
        break;
      default:
        break;
    }
    setTimeout(() => {
      setLoadComplete(true);
    }, 3000);
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 监听底部导航数据变化
  useEffect(() => {
    watchTabBarCurrent();
  }, [tabBarInfo?.tabList, nTabBarCurrent]);

  useQueryPageList(
    {
      GROUP: (res) => {
        const { state, list, totalCount } = res;
        console.log("Main useQueryPageList", state, list, totalCount);
        switch (state) {
          case "LOADING":
            break;
          case "RESULT":
            setClassList(
              list.map((item) => {
                return {
                  ...item,
                  logo: item.dataLogo,
                  title: item.dataTitle,
                  desc: item.dataDescribe,
                  owner: "张三",
                };
              })
            );
            setLoadComplete(true);
            Taro.hideLoading();
            break;
        }
      },
      HOME: (res) => {},
      MINE: (res) => {},
      WAVE: (res) => {},
      SATELLITE: (res) => {},
    }[tabBarInfo?.tabList[nTabBarCurrent].contentType],
    {
      GROUP: Api.cloud.fetchGroupInfo.queryGroupByKeyTitle,
      HOME: null,
      MINE: null,
      WAVE: null,
      SATELLITE: null,
    }[tabBarInfo?.tabList[nTabBarCurrent].contentType],
    {
      GROUP: paramQueryClassByKeyTitle,
      HOME: {},
      MINE: {},
      WAVE: {},
      SATELLITE: {},
    }[tabBarInfo?.tabList[nTabBarCurrent].contentType]
  );

  // 切换底部导航
  const handleTabbarBottomSelect = (current) => {
    if (nTabBarCurrent === current) {
      return;
    }
    setTabBarCurrent(current);
    setLoadComplete(false);
  };

  const handleClassListSearch = (param) => {
    setQueryClassByKeyTitle(param);
  };

  // 测试按钮
  const handleBtnSpiderClick = useCheckLogin(async () => {
    const res = await Api.cloud.fetchAppInfo.spiderWeatherInfo({});
    console.log("handleBtnSpiderClick", res);
  });

  // 测试按钮
  const handleBtnTestClick = async () => {
    // 新增员工
    // const params = {
    //   name: "孙尚香",
    //   nameSimple: "尚香",
    //   gender: 2,
    //   cellphone: "9292922929",
    //   tag: "WEATHER_TIME",
    // };
    // const res = await Api.cloud.fetchWorkerInfo.addWorker(params);
    // console.log("handleBtnTestClick", res);
    // 新增任务
    const params = {
      fxDate: "2021-08-05",
      keyName: "WEATHER_TIME",
      arrData: [
        { workId: "cd045e75610be6a9032ec76a26cd74c9" },
        { workId: "2d44d6c2610be7c202dce06648a918af" },
        { workId: "cd045e75610be7ec032f337975d96b19" },
        { workId: "cd045e75610be882032f6b456dbb3b0a" },
      ],
    };
    const res = await Api.cloud.fetchTaskInfo.addTask(params);
    console.log("handleBtnTestClick", res);
  };

  //
  const handleBtnEChartsClick = () => {
    Taro.navigateTo({
      url: "/pages/EChartsDemo/index",
    });
  };

  const handleBtnShareClick = () => {
    const objShareParam = Utils.processSharePath({
      shareType: Utils.getShareTypeName("POPULARIZE"),
      sharePath: "/pages/EChartsDemo/index",
      aaa: 111,
      bbb: 22,
      zxc: "abab",
    });
    setShareInfo({
      isShowPanelShare: true,
      strShareTitle: "",
      strShareImage: "",
      objShareParam: objShareParam,
    });
  };

  const handleBtnQRCodeClick = async () => {
    // const objParam = {
    //   sourceID: "aaabbbcccc",
    //   shareType: "MINIPROGRAM_1212",
    //   shareRouter: "/pages/EChartsDemo/index",
    //   sharePath:
    //     "/pages/Loading/index?jumpPage=/pages/EChartsDemo/index&aa=111&bb=222&zxc=abab",
    // };
    const objShareInfo = Utils.processSharePath({
      sharePath: "/pages/EChartsDemo/index",
      aaa: 111,
      bbb: 22,
      zxc: "abab",
    });
    const srcQRCode = await QRCodeManager.getQRCode(objShareInfo);
    setTestImageUrl(srcQRCode);
  };

  const renderVPage = () => {
    return {
      // 班级
      GROUP: (
        <VpClasses
          isLoadComplete={isLoadComplete}
          arrClassList={arrClassList}
          onClassListSearch={handleClassListSearch}
        />
      ),
      // 我的
      HOME: <VpHome isLoadComplete={isLoadComplete} />,
      // 我的
      MINE: (
        <VpMine
          isLoadComplete={isLoadComplete}
          title={tabBarInfo?.tabList[nTabBarCurrent].title}
        />
      ),
      WAVE: (
        <VpWave
          isLoadComplete={isLoadComplete}
          title={tabBarInfo?.tabList[nTabBarCurrent].title}
        />
      ),
      SATELLITE: (
        <VpSatellite
          isLoadComplete={isLoadComplete}
          title={tabBarInfo?.tabList[nTabBarCurrent].title}
        />
      ),
    }[tabBarInfo?.tabList[nTabBarCurrent].contentType];
  };

  return (
    <PageContent
      isShowLeftIcon={false}
      isTransparent={false}
      strNavigationTitle={strNavigationTitle}
      colorBackgroud={
        ["MINE"].includes(tabBarInfo?.tabList[nTabBarCurrent].contentType)
          ? "transparent"
          : "var(--color-gray-9)"
      }
      colorTitle={
        ["MINE"].includes(tabBarInfo?.tabList[nTabBarCurrent].contentType)
          ? "transparent"
          : "#000000"
      }
    >
      {/* 渲染对应内容 */}
      {renderVPage()}
      {/* 测试内容 */}
      {/* <View>测试</View>
      <ButtonIcon
        value="http://pic.51yuansu.com/pic3/cover/01/66/10/5957f0b51c503_610.jpg"
        color="var(--color-primary)"
        onClick={handleBtnSpiderClick}
      /> */}
      <View>测试</View>
      <ButtonIcon
        value="iconselect"
        color="var(--color-primary)"
        onClick={handleBtnTestClick}
      />
      {/* <View>跳转多图表</View>
      <ButtonIcon
        value="iconselect"
        color="var(--color-primary)"
        onClick={handleBtnEChartsClick}
      /> */}
      {/* <View>分享按钮</View>
      <ButtonIcon
        value="iconselect"
        color="var(--color-primary)"
        onClick={handleBtnShareClick}
      /> */}
      {/* <View>生成二维码按钮</View>
      <ButtonIcon
        value="iconselect"
        color="var(--color-primary)"
        onClick={handleBtnQRCodeClick}
      />
      <Image src={strTestImageUrl} /> */}
      {/* 底部导航 */}
      <TabbarBottom
        arrTabBarList={tabBarInfo.tabList}
        nTabBarCurrent={nTabBarCurrent}
        onTabBarSelect={handleTabbarBottomSelect}
      />
    </PageContent>
  );
}
