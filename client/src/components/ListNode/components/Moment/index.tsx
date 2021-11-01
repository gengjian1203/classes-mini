import React, { Fragment } from "react";
import { View, Image, Text } from "@tarojs/components";
import ShowerImages from "@/components/ShowerImages";
import Config from "@/config";

import { IInfoType } from "../../index";

import "./index.less";

interface IMomentProps {
  info?: IInfoType;
  isShowDelete?: boolean;
  onDetailClick?: (any?: any) => void;
  onDeleteClick?: (any?: any) => void;
}

export default function Moment(props: IMomentProps) {
  const {
    info = {},
    isShowDelete = false,
    onDetailClick,
    onDeleteClick,
  } = props;

  const handleDetailClick = (info) => {
    onDetailClick && onDetailClick(info);
  };

  const handleDeleteClick = (info, e) => {
    e.preventDefault();
    e.stopPropagation();
    onDeleteClick && onDeleteClick(info);
  };

  return (
    <View
      className="flex-center-h moment-item border-bottom-line"
      onClick={() => handleDetailClick(info)}
    >
      <View className="item-left">
        <Image
          className="item-logo"
          src={
            info?.logo ||
            info?.posterImg ||
            `${Config.cloudPath}resource/logo-mini.jpg`
          }
          mode="scaleToFill"
        ></Image>
      </View>
      <View className="flex-center-v item-right">
        <View className="item-author text-ellipsis">{info?.author}</View>
        {info?.title && <View className="item-content">{info?.title}</View>}
        {info?.arrImages?.length && (
          <ShowerImages arrImages={info?.arrImages} />
        )}
        {info?.address && <View className="item-adress">{info?.address}</View>}
        <View className="item-bottom flex-between-h">
          <View className="item-time">{info?.createTime}</View>
          {/* <View className='flex-center-v iconfont icon19 item-options'></View> */}
        </View>
      </View>
      <View className="item-float">
        {isShowDelete && (
          <View
            className="flex-center-h item-float-btn"
            onClick={(e) => handleDeleteClick(info, e)}
          >
            <View className="iconfont icondelete item-float-delete" />
          </View>
        )}
      </View>
    </View>
  );
}
