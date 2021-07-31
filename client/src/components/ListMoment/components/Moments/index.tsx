import React, { Fragment } from "react";
import { View, Image } from "@tarojs/components";
import Skeleton from "@/components/Skeleton";

import { IItemType } from "../../index";

import "./index.less";

interface IMomentsProps {
  isLoadCompleteList?: boolean;
  arrList: Array<IItemType>;
  onDetailClick: (any: any) => void;
}

export default function Moments(props: IMomentsProps) {
  const { isLoadCompleteList = true, arrList = [], onDetailClick } = props;

  const handleDetailClick = (item) => {
    onDetailClick(item);
  };

  return (
    <View className="moments-wrap">
      {isLoadCompleteList ? (
        <Fragment>
          {arrList.map((item, index) => {
            return (
              <View
                key={index}
                className="moments-item border-bottom-line"
                onClick={() => handleDetailClick(item)}
              >
                <View className="item-left">
                  <Image
                    className="item-logo"
                    src={item.logo || ""}
                    mode="widthFix"
                  ></Image>
                </View>
                <View className="flex-center-v item-right">
                  <View className="item-author text-ellipsis">
                    {item.author}
                  </View>
                  {item.title && (
                    <View className="item-content">{item.title}</View>
                  )}
                  {item.images?.length && (
                    <View className="item-media">多媒体区域</View>
                  )}
                  {item.address && (
                    <View className="item-adress">{item.address}</View>
                  )}
                  <View className="item-bottom flex-between-h">
                    <View className="item-time">{item.createTime}</View>
                    {/* <View className='flex-center-v iconfont icon19 item-options'></View> */}
                  </View>
                </View>
              </View>
            );
          })}
        </Fragment>
      ) : (
        <Fragment>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => {
            return (
              <Skeleton
                key={index}
                type="row"
                title
                titleWidth="100%"
                row={3}
                rowProps={{ width: "100%", height: 20 }}
                action
                avatar
              />
            );
          })}
        </Fragment>
      )}
    </View>
  );
}
