import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Image, Video } from "@tarojs/components";
import Api from "@/api";
import ConfigTag from "@/config/tag";
import useActions from "@/hooks/useActions";
import useQueryPageList from "@/hooks/useQueryPageList";
import useCheckLogin from "@/hooks/useCheckLogin";
import ButtonIcon from "@/components/ButtonIcon";
import PageContent from "@/components/PageContent";
import TabbarBottom from "@/components/TabBarBottom";
import QRCodeManager from "@/services/QRCodeManager";
import appInfoActions from "@/redux/actions/appInfo";
import shareInfoActions from "@/redux/actions/shareInfo";
import PinYin from "@/services/PinYin";
import Utils from "@/utils";

import VpArticleList from "./componentsVp/VpArticleList/index";
import VpGroup from "./componentsVp/VpGroup/index";
import VpGroupList from "./componentsVp/VpGroupList/index";
import VpHome from "./componentsVp/VpHome/index";
import VpHomeNormal from "./componentsVp/VpHomeNormal/index";
import VpMine from "./componentsVp/VpMine/index";
import VpSatellite from "./componentsVp/VpSatellite/index";
import VpStoryMap from "./componentsVp/VpStoryMap/index";
import VpTest from "./componentsVp/VpTest/index";
import VpWave from "./componentsVp/VpWave/index";
import VpWeatherArticle from "./componentsVp/VpWeatherArticle/index";

import "./index.less";

export default function Main() {
  const {} = useRouter();

  const [isLoadComplete, setLoadComplete] = useState<boolean>(false); // 加载完毕
  const [isUpdateList, setUpdateList] = useState<boolean>(false); // 触发主动列表刷新标识
  const [strNavigationTitle, setNavigationTitle] = useState<string>("");
  const [strTestImageUrl, setTestImageUrl] = useState<string>("");

  // 班级列表
  const [paramQueryGroupByKeyTitle, setQueryGroupByKeyTitle] = useState({
    keyTitle: "",
  });
  const [arrGroupList, setGroupList] = useState<Array<any>>([]);
  //
  const [isShowArticleListLoadingTip, setShowArticleListLoadingTip] = useState(
    false
  );
  const [arrArticleList, setArticleList] = useState([]);
  //
  const [
    isShowWeatherArticleListLoadingTip,
    setShowWeatherArticleListLoadingTip,
  ] = useState(false);
  const [arrWeatherArticleList, setWeatherArticleList] = useState([]);
  // GROUP
  const [isTabListLoadComplete, setTabListLoadComplete] = useState<boolean>(
    false
  );
  const [objQueryPostListParams, setQueryPostListParams] = useState({});
  const [arrTabPostList, setTabPostList] = useState<Array<any>>([]);

  // 底部导航
  const {
    configInfo: { tabList, nTabListCurrent },
  } = useSelector((state) => state.appInfo);
  const { setAppTabBarCurrent, setShowLayoutLogin } = useActions(
    appInfoActions
  );
  const { setShareInfo } = useActions(shareInfoActions);

  const onLoad = async () => {};

  // 监听底部导航数据变化
  const watchTabBarCurrent = async () => {
    setLoadComplete(false);
    setNavigationTitle(tabList[nTabListCurrent].title);
    switch (tabList[nTabListCurrent].contentType) {
      case "ARTICLE_LIST": {
        break;
      }
      case "GROUP": {
        break;
      }
      case "GROUP_LIST": {
        break;
      }
      case "HOME": {
        break;
      }
      case "HOME_NORMAL": {
        break;
      }
      case "MINE": {
        break;
      }
      case "SATELLITE": {
        break;
      }
      case "STORY_MAP": {
        break;
      }
      case "TEST": {
        break;
      }
      case "WAVE": {
        break;
      }
      case "WEATHER_ARTICLE": {
        break;
      }
      default: {
        break;
      }
    }
    // setTimeout(() => {
    //   setLoadComplete(true);
    // }, 3000);
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 监听底部导航数据变化
  useEffect(() => {
    watchTabBarCurrent();
  }, [tabList, nTabListCurrent]);

  useQueryPageList(
    {
      ARTICLE_LIST: (res) => {
        const { state, list, totalCount } = res;
        console.log("useQueryPageList ARTICLE_LIST", state, list, totalCount);
        switch (state) {
          case "LOADING":
            setShowArticleListLoadingTip(true);
            break;
          case "RESULT":
            setArticleList(list);
            setLoadComplete(true);
            setShowArticleListLoadingTip(false);
            Taro.hideLoading();
            break;
        }
      },
      GROUP: (res) => {
        const { state, list, totalCount } = res;
        console.log("useQueryPageList GROUP", state, list, totalCount);
        switch (state) {
          case "LOADING":
            break;
          case "RESULT":
            setTabPostList(
              list.map((item) => {
                return {
                  ...item,
                };
              })
            );
            setTabListLoadComplete(true);
            Taro.hideLoading();
            break;
        }
      },
      GROUP_LIST: (res) => {
        const { state, list, totalCount } = res;
        console.log("useQueryPageList GROUP_LIST", state, list, totalCount);
        switch (state) {
          case "LOADING":
            break;
          case "RESULT":
            setGroupList(
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
      HOME: (res) => {
        setLoadComplete(true);
      },
      HOME_NORMAL: (res) => {
        setLoadComplete(true);
      },
      MINE: (res) => {},
      SATELLITE: (res) => {},
      STORY_MAP: (res) => {},
      TEST: (res) => {},
      WAVE: (res) => {},
      WEATHER_ARTICLE: (res) => {
        const { state, list, totalCount } = res;
        console.log("useQueryPageList WEATHER", state, list, totalCount);
        switch (state) {
          case "LOADING":
            setShowWeatherArticleListLoadingTip(true);
            break;
          case "RESULT":
            setWeatherArticleList(list);
            setLoadComplete(true);
            setShowWeatherArticleListLoadingTip(false);
            Taro.hideLoading();
            break;
        }
      },
    }[tabList[nTabListCurrent].contentType],
    {
      ARTICLE_LIST: Api.cloud.fetchArticleInfo.queryArticleList,
      GROUP: Api.cloud.fetchPostInfo.queryPostList,
      GROUP_LIST: Api.cloud.fetchGroupInfo.queryGroupByKeyTitle,
      HOME: null,
      HOME_NORMAL: null,
      MINE: null,
      SATELLITE: null,
      STORY_MAP: null,
      TEST: null,
      WAVE: null,
      WEATHER_ARTICLE: Api.cloud.fetchArticleInfo.queryWeatherArticleListInfo,
    }[tabList[nTabListCurrent].contentType],
    {
      ARTICLE_LIST: {},
      GROUP: objQueryPostListParams,
      GROUP_LIST: paramQueryGroupByKeyTitle,
      HOME: {},
      HOME_NORMAL: {},
      MINE: {},
      SATELLITE: {},
      STORY_MAP: {},
      TEST: {},
      WAVE: {},
      WEATHER_ARTICLE: {},
    }[tabList[nTabListCurrent].contentType],
    isUpdateList
  );

  // 主动触发列表更新
  const handleQueryPageListUpdate = () => {
    setUpdateList(!isUpdateList);
  };

  // GROUP切换tab切
  const handleGroupTabChange = (objTab) => {
    console.log("handleTabChange", objTab);
    const params = { tabId: objTab?.id };
    setTabListLoadComplete(false);
    setQueryPostListParams(params);
  };

  // 切换底部导航
  const handleTabbarBottomSelect = (current) => {
    if (nTabListCurrent === current) {
      return;
    }
    // setLoadComplete(false);
    setAppTabBarCurrent(current);
  };

  const handleGroupListSearch = (param) => {
    setQueryGroupByKeyTitle(param);
  };

  // 测试按钮
  const handleBtnSpiderClick = useCheckLogin(async () => {
    const res = await Api.cloud.fetchAppInfo.spiderWeatherInfo({});
    console.log("handleBtnSpiderClick", res);
  });

  // 测试按钮
  const handleBtnTestClick = async () => {
    Taro.navigateTo({
      url: "/pages/ArticleDetail/index",
    });
    // 新增员工
    // const name = "孙尚香";
    // const params = {
    //   name: name,
    //   nameSimple: name.substr(-2),
    //   nameFirstLetter: PinYin.getCamelChars(name).substr(0, 1),
    //   nameLetter: PinYin.getCamelChars(name),
    //   gender: 2,
    //   cellphone: "9292922929",
    //   tag: ConfigTag["WEATHER_TIME"]?.code || "",
    // };
    // const res = await Api.cloud.fetchWorkerInfo.addWorker(params);
    // console.log("handleBtnTestClick", res);
    // 新增任务
    // const params = {
    //   fxDate: "2021-07-05",
    //   keyName: ConfigTag["WEATHER_TIME"]?.code || "",
    //   arrData: [
    //     { workerId: "cd045e75610be6a9032ec76a26cd74c9" },
    //     // { workerId: "2d44d6c2610be7c202dce06648a918af" },
    //     // { workerId: "cd045e75610be7ec032f337975d96b19" },
    //     { workerId: "cd045e75610be882032f6b456dbb3b0a" },
    //   ],
    // };
    // const res = await Api.cloud.fetchTaskInfo.addTask(params);
    // console.log("handleBtnTestClick", res);
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
      // 资讯列表
      ARTICLE_LIST: (
        <VpArticleList
          isLoadComplete={isLoadComplete}
          isShowArticleListLoadingTip={isShowArticleListLoadingTip}
          arrArticleList={arrArticleList}
          onArticleListUpdate={handleQueryPageListUpdate}
        />
      ),
      // 社群详情
      GROUP: (
        <VpGroup
          isLoadComplete={isLoadComplete}
          isTabListLoadComplete={isTabListLoadComplete}
          arrTabPostList={arrTabPostList}
          onTabChange={handleGroupTabChange}
        />
      ),
      // 社群列表
      GROUP_LIST: (
        <VpGroupList
          isLoadComplete={isLoadComplete}
          arrGroupList={arrGroupList}
          onGroupListSearch={handleGroupListSearch}
        />
      ),
      // 首页
      HOME: <VpHome isLoadComplete={isLoadComplete} />,
      // 首页常规
      HOME_NORMAL: <VpHomeNormal isLoadComplete={isLoadComplete} />,
      // 我的
      MINE: <VpMine isLoadComplete={isLoadComplete} />,
      // 星站
      SATELLITE: (
        <VpSatellite
          isLoadComplete={isLoadComplete}
          title={tabList[nTabListCurrent].title}
        />
      ),
      // 故事墙
      STORY_MAP: <VpStoryMap isLoadComplete={isLoadComplete} />,
      // 测试
      TEST: <VpTest />,
      // 中波
      WAVE: (
        <VpWave
          isLoadComplete={isLoadComplete}
          title={tabList[nTabListCurrent].title}
        />
      ),
      // 气象资讯
      WEATHER_ARTICLE: (
        <VpWeatherArticle
          isLoadComplete={isLoadComplete}
          isShowWeatherArticleListLoadingTip={
            isShowWeatherArticleListLoadingTip
          }
          arrWeatherArticleList={arrWeatherArticleList}
          title={tabList[nTabListCurrent].title}
          onWeatherArticleListUpdate={handleQueryPageListUpdate}
        />
      ),
    }[tabList[nTabListCurrent].contentType];
  };

  return (
    <PageContent
      isShowLeftIcon={false}
      isTransparent={false}
      strNavigationTitle={strNavigationTitle}
      colorBackgroud={
        ["MINE"].includes(tabList[nTabListCurrent].contentType)
          ? "transparent"
          : "var(--color-gray-9)"
      }
      colorTitle={
        ["MINE"].includes(tabList[nTabListCurrent].contentType)
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
      {/* <View>测试</View>
      <ButtonIcon
        value="iconselect"
        color="var(--color-primary)"
        onClick={handleBtnTestClick}
      /> */}
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
        arrTabBarList={tabList}
        nTabBarCurrent={nTabListCurrent}
        onTabBarSelect={handleTabbarBottomSelect}
      />
    </PageContent>
  );
}
