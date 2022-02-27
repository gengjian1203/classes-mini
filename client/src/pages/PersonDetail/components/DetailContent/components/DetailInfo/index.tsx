import React, { useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";
import Utils from "@/utils";

import "./index.less";

interface IDetailInfoParam {
  data?: any;
}

export default function DetailInfo(props: IDetailInfoParam) {
  const { data } = props;

  const arrEnableType = ["cellphone", "webview"];

  const handleInfoItemClick = (item) => {
    // console.log('handleInfoItemClick', item)
    switch (item.type) {
      case "cellphone": {
        Taro.makePhoneCall({
          phoneNumber: item.value,
        });
        break;
      }
      case "webview": {
        const url = Utils.routerAppendParams("/pages/WebPage/index", {
          urlWeb: item.url,
        });
        Taro.navigateTo({
          url: url,
        });
      }
      default:
        break;
    }
  };

  const renderInfoItem = (item, index) => {
    switch (item?.type) {
      case "avatar": {
        return (
          <Image
            className="info-item info-avatar"
            src={item?.value}
            mode="widthFix"
          />
        );
      }
      case "name": {
        return <View className="info-item info-name">{item?.value}</View>;
      }
      case "job": {
        return <View className="info-item info-job">{item?.value}</View>;
      }
      default: {
        return (
          <View
            className="flex-start-h info-form-item"
            key={index}
            onClick={() => handleInfoItemClick(item)}
          >
            {item.icon && (
              <Image className="item-icon" src={item.icon} mode="scaleToFill" />
            )}
            {item.name && (
              <View className="text-nowrap item-name ">{item.name}：</View>
            )}
            <View
              className={
                // `text-nowrap ` +
                `item-value ` +
                `${arrEnableType.includes(item.type) ? "item-enable " : ""}`
              }
            >
              {item.value}
            </View>
          </View>
        );
      }
    }
  };

  return (
    <View className="flex-center-v detail-info-wrap">
      {data.map((item, index) => {
        return renderInfoItem(item, index);
      })}
    </View>
  );
}
