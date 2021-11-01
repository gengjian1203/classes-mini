import React, { Fragment } from "react";
import { View, Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";

import Skeleton from "@/components/Skeleton";
import emptyList from "@/images/emptyList.png";

import Base from "./components/Base";
import Group from "./components/Group";
import Member from "./components/Member";
import Moment from "./components/Moment";
import Story from "./components/Story";
import Worker from "./components/Worker";

import "./index.less";

export interface IInfoType {
  _id?: string;
  author?: string; // 作者
  title?: string; // 标题
  name?: string; // 名称
  arrSign?: Array<any>; // 标记
  nameSimple?: string; // 名称缩写
  desc?: string; // 简介
  cellphone?: string; // 电话
  logo?: string; // 头像
  posterImg?: string; // 缩略图
  strLogoBGImage?: string; // logo背景图颜色
  createTime?: string; // 创建时间
  address?: string; // 地理位置
  source?: string; // 源类型
  images?: Array<string>; // 缩略图
  arrImages?: Array<string>; // 缩略图
}

interface IListNodeProps {
  isLoadCompleteList?: boolean; // 是否列表加载完毕
  isShowDelete?: boolean; // 是否展示删除按钮
  strType:
    | "BASE"
    | "GROUP" // 群组类型
    | "MEMBER" // 成员类型
    | "MOMENT" // 朋友圈类型
    | "STORY" // 故事墙类型
    | "WORKER"; // 职工类型
  arrList: Array<IInfoType>;
  showBottomLoadingTip?: boolean;
  customClass?: string;
  onDetailClick?: (any?: any) => void;
  onEditClick?: (any?: any) => void;
  onDeleteClick?: (any?: any) => void;
}

export default function ListNode(props: IListNodeProps) {
  const {
    isLoadCompleteList = true,
    isShowDelete = false,
    strType = "",
    showBottomLoadingTip = false,
    customClass = "",
    arrList = [],
    onDetailClick,
    onEditClick,
    onDeleteClick,
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
      case "MEMBER": {
        return arrList.map((item, index) => {
          return (
            <Member
              key={`member-${index}`}
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
              isShowDelete={isShowDelete}
              info={item}
              onDetailClick={onDetailClick}
              onDeleteClick={onDeleteClick}
            />
          );
        });
      }
      case "STORY": {
        return arrList.map((item, index) => {
          return (
            <Story
              key={`story-${index}`}
              isShowDelete={isShowDelete}
              info={item}
              onDetailClick={onDetailClick}
              onDeleteClick={onDeleteClick}
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
              onEditClick={onEditClick}
              onDeleteClick={onDeleteClick}
            />
          );
        });
      }
      default: {
        return <View>未知类型</View>;
      }
    }
  };

  // 渲染空列表样式
  const renderEmpty = () => {
    return (
      <View className="flex-center-v list-node-empty">
        <Image
          className="list-node-empty-img"
          mode="widthFix"
          src={emptyList}
        />
        <Text className="list-node-empty-text">暂无数据哦</Text>
      </View>
    );
  };

  // 渲染骨架屏
  const renderSkeleton = () => {
    const arrSkeleton = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

    switch (strType) {
      case "BASE": {
      }
      case "MEMBER": {
        return arrSkeleton.map((item, index) => {
          return (
            <Skeleton
              key={`list-skeleton-${index}`}
              type="row"
              titleWidth="100%"
              row={2}
              rowProps={{ width: "80%", height: 26 }}
              avatar
              customStyle={{
                height: Taro.pxTransform(140),
                borderBottom: "1px solid var(--color-gray-7)",
              }}
            />
          );
        });
      }
      case "MOMENT": {
        return arrSkeleton.map((item, index) => {
          return (
            <Skeleton
              key={`list-skeleton-${index}`}
              type="row"
              title
              titleWidth="60%"
              row={2}
              rowProps={{ width: "100%", height: 24 }}
              avatar
              customClass="skeleton-item"
            />
          );
        });
      }
      case "STORY": {
        return arrSkeleton.map((item, index) => {
          return (
            <Skeleton
              key={`list-skeleton-${index}`}
              type="row"
              title
              titleWidth="100%"
              titleHeight={Taro.pxTransform(260)}
              row={1}
              rowProps={{ width: "100%", height: 100 }}
              customClass="skeleton-item"
            />
          );
        });
      }
      case "WORKER": {
        return arrSkeleton.map((item, index) => {
          return (
            <Skeleton
              key={`list-skeleton-${index}`}
              type="row"
              // title
              titleWidth="100%"
              row={2}
              rowProps={{ width: "50%", height: 26 }}
              action
              avatar
              customStyle={{
                height: Taro.pxTransform(140),
                borderBottom: "1px solid var(--color-gray-7)",
              }}
            />
          );
        });
      }
      default: {
        return arrSkeleton.map((item, index) => {
          return (
            <Skeleton
              key={`list-skeleton-${index}`}
              type="row"
              title
              titleWidth="100%"
              row={3}
              rowProps={{ width: "100%", height: 20 }}
              action
              avatar
              customClass="skeleton-item"
            />
          );
        });
      }
    }
  };

  return (
    <View className={`list-node-wrap ` + `${customClass} `}>
      {isLoadCompleteList
        ? arrList && arrList.length > 0
          ? readerList()
          : renderEmpty()
        : renderSkeleton()}
      {showBottomLoadingTip && (
        <View className="list-node-loading-tip">努力加载中...</View>
      )}
    </View>
  );
}
