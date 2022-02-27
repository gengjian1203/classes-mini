import React, { Fragment, useEffect, useState } from "react";
import Taro from "@tarojs/taro";
import { ScrollView, View, Swiper, SwiperItem } from "@tarojs/components";
import Api from "@/api";
import Config from "@/config";
import PageContent from "@/components/PageContent";
import useActions from "@/hooks/useActions";
import useDecodeRouter from "@/hooks/useDecodeRouter";
import shareInfoActions from "@/redux/actions/shareInfo";
import Utils from "@/utils";

import BottomWidget from "./components/BottomWidget";
import DetailContent from "./components/DetailContent";
import SkeletonContent from "./components/SkeletonContent";

import "./index.less";

export default function PersonDetail() {
  const { path, params } = useDecodeRouter();

  const { persionId } = params;

  const [isLoadComplete, setLoadComplete] = useState<boolean>(false); // 是否加载完毕
  const [strNavigationTitle, setNavigationTitle] = useState<string>("");
  const [arrSwiperList, setSwiperList] = useState<Array<any>>([]);
  const [arrIconList, setIconList] = useState<Array<any>>([]);
  const [nCurrentDetail, setCurrentDetail] = useState<number>(0);

  const { setShareInfo } = useActions(shareInfoActions);

  const onLoad = async () => {
    Taro.showToast({
      title: "加载中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
    setLoadComplete(false);
    let strShareCardTitle = "";
    let strShareCardImage = "";
    const jsonUrl =
      `${Config.cloudDownLoad}person/${persionId}.json` +
      `?t=${new Date().getTime()}`;
    const res: any = await Api.file.getUrl(jsonUrl);
    Taro.hideToast();
    console.log("PersonDetail onLoad", jsonUrl, res);
    if (res) {
      const arrIconListTmp = res?.map((item) => {
        if (item?.type === "base") {
          strShareCardTitle = item?.strShareCardTitle;
          strShareCardImage = item?.strShareCardImage;
        }
        return {
          icon: item.icon,
          color: item.color,
          title: item.title,
        };
      });
      // console.log("arrIconListTmp", arrIconListTmp);
      setSwiperList(res);
      setIconList(arrIconListTmp);
      // 设置分享信息
      const objShareParam = Utils.processSharePath({
        shareType: Utils.getShareTypeName("POPULARIZE"),
        sharePath: path,
        ...params,
      });
      setShareInfo({
        isShowPanelShare: false,
        strShareCardTitle: strShareCardTitle,
        strShareCardImage: strShareCardImage,
        objShareParam: objShareParam,
      });
    } else {
      Taro.showToast({
        title: "未找到相关信息",
        icon: "none",
      });
    }
    setLoadComplete(true);
  };

  const handleDetailChange = (e) => {
    setCurrentDetail(e.detail.current);
  };

  const handleIconClick = (e) => {
    setCurrentDetail(e);
  };

  useEffect(() => {
    // Taro.hideShareMenu();
    onLoad();
  }, []);

  useEffect(() => {
    if (arrIconList && arrIconList.length > 0) {
      setNavigationTitle(arrIconList[nCurrentDetail]?.title);
      Taro.pageScrollTo({ scrollTop: 0, duration: 100 });
    }
  }, [nCurrentDetail, arrIconList]);

  const renderDetailContent = () => {
    return (
      <Fragment>
        {isLoadComplete ? (
          <Swiper
            className="detail-swiper-wrap"
            current={nCurrentDetail}
            onChange={handleDetailChange}
          >
            {arrSwiperList.map((item, index) => (
              <SwiperItem key={index}>
                <ScrollView
                  className="flex-center-v detail-swiper-item"
                  enableBackToTop
                  scrollY
                  scrollWithAnimation
                >
                  <DetailContent content={item.content} />
                </ScrollView>
              </SwiperItem>
            ))}
          </Swiper>
        ) : (
          <SkeletonContent />
        )}
      </Fragment>
    );
  };

  return (
    <PageContent
      isShowLeftIcon
      strNavigationTitle={strNavigationTitle}
      customClass="flex-start-v personality-detail-wrap"
    >
      {/* 渲染内容 */}
      {/* {renderDetailContent()} */}
      <View className="detail-swiper-wrap">
        <View className="flex-center-v detail-swiper-item">
          {arrSwiperList[nCurrentDetail]?.content && (
            <DetailContent content={arrSwiperList[nCurrentDetail]?.content} />
          )}
        </View>
      </View>
      {/* 底部小组件面板 */}
      <BottomWidget
        isLoadComplete={isLoadComplete}
        arrIconList={arrIconList}
        nCurrentDetail={nCurrentDetail}
        onIconClick={handleIconClick}
      />
    </PageContent>
  );
}
