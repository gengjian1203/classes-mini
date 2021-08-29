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
    params: { articleId = "" },
  } = useRouter();

  const [objArticleInfo, setArticleInfo] = useState<IArticleType>({});

  const onLoad = async () => {
    const params = {
      articleId: articleId,
    };
    const res = await Api.cloud.fetchArticleInfo.queryWeatherArticleDetailInfo(
      params
    );
    setArticleInfo(res);
  };

  useEffect(() => {
    onLoad();
  }, []);

  return (
    <PageContent isShowLeftIcon strNavigationTitle="文章详情" isSafeBottom>
      <View className="article-detail-wrap">
        {/* 标题 */}
        <View className="article-detail-item">
          <Text className="item-title">{objArticleInfo.title}</Text>
        </View>
        {/* 作者 */}
        <View className="article-detail-item">
          <Text className="item-value text-ellipsis">
            作者：{objArticleInfo.author}
          </Text>
        </View>
        {/* 时间 */}
        <View className="article-detail-item">
          <Text className="item-value text-ellipsis">
            时间：{objArticleInfo.createTime}
          </Text>
        </View>
        {/* 富文本翻译 */}
        <View style="overflow: hidden; width: 100%; ">
          <poster
            compress={3}
            html={objArticleInfo.content}
            lazy-load
            selectable
            show-with-animation
          />
        </View>
      </View>
    </PageContent>
  );
}
