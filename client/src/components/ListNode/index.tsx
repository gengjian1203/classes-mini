import React, { Fragment } from "react";
import { View } from "@tarojs/components";

import Skeleton from "@/components/Skeleton";

import Base from "./components/Base";
import Group from "./components/Group";
import Moment from "./components/Moment";
import Worker from "./components/Worker";

import "./index.less";

export interface IInfoType {
  _id?: string;
  author?: string; // 作者
  title?: string; // 标题
  desc?: string; // 简介
  logo?: string; // 头像
  posterImg?: string; // 缩略图
  createTime?: string; // 创建时间
  address?: string; // 地理位置
  source?: string; // 源类型
  images?: Array<string>; // 缩略图
}

interface IListNodeProps {
  isLoadCompleteList?: boolean; // 是否列表加载完毕
  strType:
    | "BASE"
    | "GROUP" // 群组类型
    | "MOMENT" // 朋友圈类型
    | "WORKER"; // 职工类型
  arrList: Array<IInfoType>;
  showBottomLoadingTip?: boolean;
  onDetailClick: (any: any) => void;
}

export default function ListNode(props: IListNodeProps) {
  const {
    isLoadCompleteList = true,
    strType = "",
    showBottomLoadingTip = false,
    arrList = [],
    onDetailClick,
  } = props;

  // 渲染列表
  const readerList = () => {
    switch (strType) {
      case "BASE": {
        return arrList.map((item, index) => {
          return (
            <Base
              key={`base-${index}`}
              info={item}
              onDetailClick={onDetailClick}
            />
          );
        });
      }
      case "GROUP": {
        return arrList.map((item, index) => {
          return (
            <Group
              key={`group-${index}`}
              info={item}
              onDetailClick={onDetailClick}
            />
          );
        });
      }
      case "MOMENT": {
        return arrList.map((item, index) => {
          return (
            <Moment
              key={`monent-${index}`}
              info={item}
              onDetailClick={onDetailClick}
            />
          );
        });
      }
      case "WORKER": {
        return arrList.map((item, index) => {
          return (
            <Worker
              key={`monent-${index}`}
              info={item}
              onDetailClick={onDetailClick}
            />
          );
        });
      }
      default: {
        return <View>未知类型</View>;
      }
    }
  };

  // 渲染骨架屏
  const renderSkeleton = () => {
    const arrSkeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    switch (strType) {
      case "BASE": {
      }
      case "MOMENT": {
      }
      default: {
        return arrSkeleton.map((item, index) => {
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
        });
      }
    }
  };

  console.log("arrList", isLoadCompleteList, arrList);

  return (
    <View className="list-node-wrap">
      {isLoadCompleteList ? arrList && readerList() : renderSkeleton()}
      {showBottomLoadingTip && (
        <View className="list-node-loading-tip">努力加载中...</View>
      )}
    </View>
  );
}
