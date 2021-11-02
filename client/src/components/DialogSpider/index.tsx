import React, { useState, useEffect, Fragment } from "react";
import { AtButton, AtInput } from "taro-ui";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Api from "@/api";
import Dialog from "@/components/Dialog";
import useDebounce from "@/hooks/useDebounce";

import "./index.less";

interface IDialogSpiderParam {
  customClass?: string;
  objParentInfo?: any;
  onDialogSpiderSuccess?: (any?: any) => any;
  onDialogSpiderClose?: (any?: any) => any;
}

export default function DialogSpider(props: IDialogSpiderParam) {
  const {
    customClass = "",
    objParentInfo = {},
    onDialogSpiderSuccess = () => {},
    onDialogSpiderClose = () => {},
  } = props;

  const [urlServceSpider, setUrlServceSpider] = useState<string>("");

  // 关闭弹窗
  const handleDialogClose = () => {
    onDialogSpiderClose && onDialogSpiderClose();
  };

  // 输入微信公众号文章链接
  const handleUrlServceSpiderChange = useDebounce((value) => {
    setUrlServceSpider(value);
  }, 100);

  // 点击爬取微信公众号文章
  const hanldeUrlServceSpiderClick = async () => {
    Taro.showToast({
      title: "文章爬取中",
      icon: "loading",
      mask: true,
      duration: 20000,
    });
    const params = {
      urlServce: urlServceSpider,
      tabId: objParentInfo?.id, // showModuleValView[tabCurrent]?.id,
    };
    const res = await Api.cloud.fetchSpiderInfo.spiderArticleWeiXin(params);
    console.log("handleUrl", res);
    Taro.hideToast();
    if (res && res.length > 0) {
      Taro.showToast({
        title: "爬取成功",
        icon: "success",
      });
      onDialogSpiderSuccess && onDialogSpiderSuccess();
      // onTabListUpdate && onTabListUpdate();
    } else {
      Taro.showToast({
        title: "该文章已被收录，或搜索不到该文章。",
        icon: "none",
      });
    }
  };

  return (
    <Dialog
      title={`发布位置-${objParentInfo?.title}`}
      titleIcon="iconweixin"
      onDialogClose={handleDialogClose}
    >
      <View className={`flex-center-h ` + `dialog-worker-wrap `}>
        <View className="dialog-worker-content">
          <AtInput
            border={false}
            disabled
            name="tabId"
            title="挂载tabId"
            type="text"
            value={objParentInfo?.id}
            onChange={() => {}}
          />
          <AtInput
            border={false}
            name="urlServceSpider"
            title="公众号链接"
            type="text"
            placeholder="https://mp.weixin.qq.com/s/JsnvAFe6CNU5c8HbltbqAA"
            value={urlServceSpider}
            onChange={handleUrlServceSpiderChange}
          />
          <AtButton
            className=""
            type="primary"
            circle
            onClick={hanldeUrlServceSpiderClick}
          >
            爬取
          </AtButton>
        </View>
      </View>
    </Dialog>
  );
}
