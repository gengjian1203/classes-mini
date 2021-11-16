import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Utils from "@/utils";

import DetailBtntext from "./components/DetailBtntext";
import DetailIcontext from "./components/DetailIcontext";
import DetailInfo from "./components/DetailInfo";
import DetailForm from "./components/DetailForm";
import DetailTimeline from "./components/DetailTimeline";

import "./index.less";

interface IDetailContentParam {
  content?: Array<any>;
}

export default function DetailContent(props: IDetailContentParam) {
  const { content = [] } = props;

  const [arrContentList, setContentList] = useState<Array<any>>([]);

  useEffect(() => {
    setContentList(content);
  }, [content]);

  const handleBtntextBtnClick = (data) => {
    console.log("handleBtntextBtnClick", data);
    switch (data.type) {
      case "miniprogram": {
        Taro.navigateToMiniProgram({
          appId: data.appId,
          success: (res) => {
            if (
              data.appId === "wx821aadcd431646f9" &&
              res?.errMsg.includes("ok")
            ) {
              Taro.reLaunch({
                url: "/pages/Loading/index",
              });
            }
          },
          fail: (err) => {
            if (
              data.appId === "wx821aadcd431646f9" &&
              err?.errMsg.includes("myself")
            ) {
              Taro.reLaunch({
                url: "/pages/Loading/index",
              });
            }
          },
        });
        break;
      }
      case "webview": {
        const url = Utils.routerAppendParams("/pages/WebPage/index", {
          urlWeb: data.url,
        });
        Taro.navigateTo({
          url: url,
        });
        break;
      }
      default:
        break;
    }
  };

  return (
    <View className="detail-content-wrap">
      {arrContentList.map((item, index) => (
        <View key={index} className="detail-content-item">
          {
            {
              btntext: (
                <DetailBtntext
                  data={item.data}
                  onBtnClick={() => handleBtntextBtnClick(item.data)}
                />
              ),
              icontext: <DetailIcontext data={item.data} />,
              info: <DetailInfo data={item.data} />,
              form: <DetailForm data={item.data} />,
              timeline: <DetailTimeline data={item.data} />,
            }[item.type]
          }
        </View>
      ))}
    </View>
  );
}
