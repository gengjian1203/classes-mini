import React from "react";
import Taro from "@tarojs/taro";
import { View, Image } from "@tarojs/components";

import "./index.less";

interface IDetailFormParam {
  data?: any;
}

export default function DetailForm(props: IDetailFormParam) {
  const { data } = props;

  const arrEnableType = ["cellphone", "webview"];

  const handleFormItemClick = (item) => {
    // console.log('handleFormItemClick', item)
    switch (item.type) {
      case "cellphone": {
        Taro.makePhoneCall({
          phoneNumber: item.value,
        });
        break;
      }
      case "webview": {
        Taro.navigateTo({
          url: `/pages/WebPage/index` + `?urlWeb=${item.url}`,
        });
      }
      default:
        break;
    }
  };

  return (
    <View className="flex-center-v detail-form-wrap">
      {data.map((item, index) => (
        <View
          className="flex-start-h form-item"
          key={index}
          onClick={() => handleFormItemClick(item)}
        >
          <Image className="item-icon" src={item.icon} mode="scaleToFill" />
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
      ))}
    </View>
  );
}
