import React, { useState, useEffect, Fragment } from "react";
import { View, Image } from "@tarojs/components";
import Taro from "@tarojs/taro";

import "./index.less";

interface IShowerImagesParam {
  isLoadComplete?: boolean;
  arrImages?: Array<string>; // 缩略图
}

export default function ShowerImages(props: IShowerImagesParam) {
  const { isLoadComplete = true, arrImages = [] } = props;

  const hanldeImagesClick = (e, nCurrent) => {
    e.preventDefault();
    e.stopPropagation();

    Taro.previewImage({
      urls: arrImages,
      current: arrImages[nCurrent] || "",
    });
  };

  const renderImages = () => {
    const nLength = (arrImages && arrImages.length) || 0;

    switch (nLength) {
      case 0:
        return null;
      case 1:
        return (
          <View className="image-wrap image-single-wrap">
            <Image
              src={arrImages[0]}
              mode="widthFix"
              className="image-single-item"
              onClick={(e) => hanldeImagesClick(e, 0)}
            />
          </View>
        );
      default:
        return (
          <View
            className={
              `image-wrap ` +
              `image-multiple-wrap ` +
              `${
                nLength <= 2
                  ? "image-multiple-two"
                  : nLength <= 4
                  ? "image-multiple-four"
                  : "image-multiple-nine"
              }`
            }
          >
            {arrImages.map((item, index) => {
              return (
                index <= 8 && (
                  <Image
                    src={item}
                    mode="aspectFill"
                    className="image-multiple-item"
                    onClick={(e) => hanldeImagesClick(e, index)}
                  >
                    {index === 8 && nLength > 8 && (
                      <View className="flex-center-v image-multiple-item-more">
                        +{nLength}
                      </View>
                    )}
                  </Image>
                )
              );
            })}
          </View>
        );
    }
    return null;
  };

  return renderImages();
}
