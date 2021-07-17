import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import api from "@/api";
import useActions from "@/hooks/useActions";
import useQueryPageList from "@/hooks/useQueryPageList";
import useCheckLogin from "@/hooks/useCheckLogin";
import ButtonIcon from "@/components/ButtonIcon";
import PageContent from "@/components/PageContent";
import TabbarBottom from "@/components/TabBarBottom";
import VpClasses from "@/componentsVp/VpClasses/index";
import VpHome from "@/componentsVp/VpHome/index";
import VpMine from "@/componentsVp/VpMine/index";

import appInfoActions from "@/redux/actions/appInfo";

import "./index.less";

export default function Main() {
  const {} = useRouter();

  const [isLoadComplete, setLoadComplete] = useState<boolean>(false); // 加载完毕
  const [strNavigationTitle, setNavigationTitle] = useState<string>("");
  const [nTabBarCurrent, setTabBarCurrent] = useState<number>(0);

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

  const onLoad = async () => {
    Taro.hideShareMenu();
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
    }[tabBarInfo?.tabList[nTabBarCurrent].contentType],
    {
      GROUP: api.cloud.fetchGroupInfo.queryGroupByKeyTitle,
      HOME: null,
      MINE: null,
    }[tabBarInfo?.tabList[nTabBarCurrent].contentType],
    {
      GROUP: paramQueryClassByKeyTitle,
      HOME: {},
      MINE: {},
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
  const handleBtnTestClick = useCheckLogin(() => {
    // setLoadComplete(!isLoadComplete)
    Taro.navigateTo({
      url: "/pages/ECharts/index",
    });
  });

  // 测试按钮
  const handleBtnLoginClick = async () => {
    // setShowLayoutLogin(true)
    const res = await api.cloud.fetchGroupInfo.addGroup({
      logo:
        "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3221441550,2057240005&fm=26&gp=0.jpg",
      title: `测试${Math.random()}班`,
      describe:
        "汉皇重色思倾国，御宇多年求不得。杨家有女初长成，养在深闺人未识。天生丽质难自弃，一朝选在君王侧。回眸一笑百媚生，六宫粉黛无颜色。",
      address: "洛水畔",
    });
    console.log("handleBtnLoginClick", res);
    Taro.showToast({
      title: "创建社区",
      icon: "none",
    });
  };

  //
  const handleBtnEChartsClick = () => {
    Taro.navigateTo({
      url: "/pages/ECharts/index",
    });
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
    }[tabBarInfo?.tabList[nTabBarCurrent].contentType];
  };

  return (
    <PageContent
      isShowLeftIcon={false}
      isTransparent={false}
      strNavigationTitle={strNavigationTitle}
    >
      {/* 渲染对应内容 */}
      {renderVPage()}
      {/* 测试内容 */}
      <View>测试</View>
      <ButtonIcon
        value="http://pic.51yuansu.com/pic3/cover/01/66/10/5957f0b51c503_610.jpg"
        color="var(--color-primary)"
        onClick={handleBtnTestClick}
      />
      <View>登录</View>
      <ButtonIcon
        value="iconselect"
        color="var(--color-primary)"
        onClick={handleBtnLoginClick}
      />
      <View>图表</View>
      <ButtonIcon
        value="iconselect"
        color="var(--color-primary)"
        onClick={handleBtnEChartsClick}
      />
      {/* 底部导航 */}
      <TabbarBottom
        arrTabBarList={tabBarInfo.tabList}
        nTabBarCurrent={nTabBarCurrent}
        onTabBarSelect={handleTabbarBottomSelect}
      />
    </PageContent>
  );
}
