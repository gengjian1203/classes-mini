import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View } from "@tarojs/components";
import Utils from "@/utils";

import DetailBtntext from "./components/DetailBtntext";
import DetailIcontext from "./components/DetailIcontext";
import DetailInfo from "./components/DetailInfo";
import DetailTimeline from "./components/DetailTimeline";

import "./index.less";

interface IDetailContentParam {
  content?: Array<any>;
}

export default function DetailContent(props: IDetailContentParam) {
  const { content = [] } = props;

  const [nCurrentFlash, setCurrentFlash] = useState(-1);
  const [arrContentList, setContentList] = useState<Array<any>>([]);

  useEffect(() => {
    setContentList(content);
  }, [content]);

  // 闪烁指定项
  const flashItem = (index = -1, count = 0) => {
    setTimeout(() => {
      if (count > 0) {
        setCurrentFlash(index);
        setTimeout(() => {
          setCurrentFlash(-1);
          flashItem(index, count - 1);
        }, 1000);
      }
    }, 0);
  };

  const handleDetailContentItemLongPress = (item, index) => {
    console.log("handleDetailContentItemLongPress", item);
    let strData = "";

    switch (item?.type) {
      case "info": {
        item?.data.forEach((itemData) => {
          // 黑名单列表类型不做复制
          if (!["avatar"].includes(itemData?.type)) {
            strData += `${itemData?.name}：${itemData?.value}\n`;
          }
        });
        break;
      }
      case "icontext": {
        strData += `【${item?.data?.title}】\n`;
        item?.data?.content?.forEach((itemContent) => {
          strData += `${itemContent}\n`;
        });
        break;
      }
      case "timeline": {
        item?.data.forEach((itemData) => {
          strData += `【${itemData?.title}】\n`;
          itemData?.content?.forEach((itemContent) => {
            strData += `${itemContent}\n`;
          });
          strData += "\n";
        });
        break;
      }
      case "btntext": {
        strData += `【${item?.data?.title}】\n`;
        item?.data?.content?.forEach((itemContent) => {
          strData += `${itemContent}\n`;
        });
        break;
      }
      default: {
        break;
      }
    }

    Taro.setClipboardData({
      data: strData,
      success: () => {
        flashItem(index, 2);
      },
    });
  };

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
      {arrContentList &&
        arrContentList.map((item, index) => {
          return (
            item.show && (
              <View
                key={index}
                className={`detail-content-item ${
                  nCurrentFlash === index ? "item-flash " : ""
                }`}
                onLongPress={() =>
                  handleDetailContentItemLongPress(item, index)
                }
              >
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
                    timeline: <DetailTimeline data={item.data} />,
                  }[item.type]
                }
              </View>
            )
          );
        })}
    </View>
  );
}
