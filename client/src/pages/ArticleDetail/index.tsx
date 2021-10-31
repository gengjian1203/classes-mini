import React, { Fragment, useEffect, useState } from "react";
import { AtButton } from "taro-ui";
import Taro, { useRouter } from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import Api from "@/api";
import PageContent from "@/components/PageContent";
import useThrottle from "@/hooks/useThrottle";
import useCheckLogin from "@/hooks/useCheckLogin";

import "./index.less";

interface IArticleType {
  source?: String; // "WEIXIN"; // 文章来源
  href?: String; // "https://mp.weixin.qq.com/s/JsnvAFe6CNU5c8HbltbqAA"; // 文章Url
  title?: String; // "";
  author?: String; // "吉林省气象局";
  content?: String; // "";
  posterImg?: String; // "";
  createDate?: String; // "";
  createTime?: String; // "";
}

export default function ArticleDetail() {
  const {
    path,
    params: { type = "", articleId = "" },
  } = useRouter();

  const [objArticleInfo, setArticleInfo] = useState<IArticleType>({});

  const onLoad = async () => {
    Taro.showToast({
      title: "加载中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
    const params = {
      articleId: articleId,
    };
    let funFetch: any = (any?: any) => {
      return {};
    };
    switch (type) {
      case "ZHIHU": {
        funFetch = Api.cloud.fetchArticleInfo.queryZhiHuDetail;
        break;
      }
      case "NOTICE": {
        funFetch = Api.cloud.fetchArticleInfo.queryNoticeDetail;
        break;
      }
      default: {
        break;
      }
    }

    const res = await funFetch(params);
    setArticleInfo(res);
    Taro.hideToast();
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <PageContent isShowLeftIcon strNavigationTitle="文章详情" isSafeBottom>
      <View className="article-detail-wrap">
        {/* 标题 */}
        {objArticleInfo && objArticleInfo.title && (
          <View className="article-detail-item">
            <Text className="item-title">{objArticleInfo.title}</Text>
          </View>
        )}
        {/* 作者 */}
        {objArticleInfo && objArticleInfo.author && (
          <View className="article-detail-item">
            <Text className="item-value text-ellipsis">
              作者：{objArticleInfo.author}
            </Text>
          </View>
        )}
        {/* 时间 */}
        {objArticleInfo && objArticleInfo.createTime && (
          <View className="article-detail-item">
            <Text className="item-value text-ellipsis">
              时间：{objArticleInfo.createTime}
            </Text>
          </View>
        )}
        {/* 富文本翻译 */}
        {objArticleInfo && objArticleInfo.content && (
          <View style="overflow: hidden; width: 100%; ">
            <poster
              compress={3}
              html={objArticleInfo.content}
              lazy-load
              selectable
              show-with-animation
            />
          </View>
        )}
      </View>
    </PageContent>
  );
}
