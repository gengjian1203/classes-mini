import React, { Fragment, useEffect, useRef, useState } from "react";
import { AtForm, AtList, AtListItem, AtInput, AtButton } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View } from "@tarojs/components";
import Api from "@/api";
import PageContent from "@/components/PageContent";
import ModuleCard from "@/components/ModuleCard";
import useDebounce from "@/hooks/useDebounce";

import "./index.less";

export default function ECharts() {
  const { params } = useRouter();

  const [urlServceWeiXin, setUrlServceWeiXin] = useState<string>("");

  // 输入微信公众号文章链接
  const handleUrlServceWeiXinChange = useDebounce((value) => {
    setUrlServceWeiXin(value);
  }, 500);

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

  return (
    <PageContent
      strNavigationTitle="彩蛋管理页面"
      colorBackgroud="transparent"
      isShowLeftIcon
      isTransparent={false}
      isSafeBottom
      customClass="flex-center-v easter-egg-wrap"
    >
      <ModuleCard title="爬取微信公众号文章" customClass="flex-center-h">
        <AtInput
          name="weixin_urlServce"
          title="文章链接"
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
      </ModuleCard>
    </PageContent>
  );
}
