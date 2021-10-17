import React, { Fragment, useEffect, useState } from "react";
import Taro, { useRouter } from "@tarojs/taro";
import { ScrollView, View, Swiper, SwiperItem } from "@tarojs/components";
import Api from "@/api";
import Config from "@/config";
import PageContent from "@/components/PageContent";
import useThrottle from "@/hooks/useThrottle";
import useCheckLogin from "@/hooks/useCheckLogin";

import BottomWidget from "./components/BottomWidget";
import DetailContent from "./components/DetailContent";
import SkeletonContent from "./components/SkeletonContent";

import "./index.less";

export default function PersonDetail() {
  const {
    path,
    params: { persionId },
  } = useRouter();

  const [isLoadComplete, setLoadComplete] = useState<boolean>(false); // 是否加载完毕
  const [strNavigationTitle, setNavigationTitle] = useState<string>("");
  const [arrSwiperList, setSwiperList] = useState<Array<any>>([]);
  const [arrIconList, setIconList] = useState<Array<any>>([]);
  const [nCurrentDetail, setCurrentDetail] = useState<number>(0);

  const onLoad = async () => {
    Taro.showToast({
      title: "加载中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
    setLoadComplete(false);
    const jsonUrl =
      `${Config.cloudDownLoad}person/list/${persionId}.json` +
      `?t=${new Date().getTime()}`;
    const res: any = await Api.file.getUrl(jsonUrl);
    Taro.hideToast();
    console.log("PersonDetail onLoad", jsonUrl, res);
    if (res) {
      const arrIconListTmp = res?.map((item) => {
        return {
          icon: item.icon,
          color: item.color,
          title: item.title,
        };
      });
      // console.log("arrIconListTmp", arrIconListTmp);
      setSwiperList(res);
      setIconList(arrIconListTmp);
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
    Taro.hideShareMenu();
    onLoad();
  }, []);

  useEffect(() => {
    if (arrIconList && arrIconList.length > 0) {
      setNavigationTitle(arrIconList[nCurrentDetail]?.title);
    }
  }, [nCurrentDetail, arrIconList]);

  const renderDetailContent = () => {
    return (
      <Fragment>
        {isLoadComplete ? (
          <Swiper
            className="detail-swiper-wrap"
            current={nCurrentDetail}
            // indicatorColor="var(--color-shadow)"
            // indicatorActiveColor="var(--color-primary)"
            // circular
            // indicatorDots
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
      isSafeBottom
      customClass="personality-detail-wrap flex-center-v"
    >
      {/* 渲染内容 */}
      {renderDetailContent()}
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
