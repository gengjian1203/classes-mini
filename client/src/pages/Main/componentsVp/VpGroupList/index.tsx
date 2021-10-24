import React, { Fragment, useState, useEffect, useRef } from "react";
import { AtSearchBar } from "taro-ui";
import Taro from "@tarojs/taro";
import Api from "@/api";
import { View } from "@tarojs/components";
import ListNode from "@/components/ListNode";

import "./index.less";

interface IVpGroupParam {
  isLoadComplete?: boolean;
  arrGroupList?: Array<any>;
  onGroupListSearch?: (...arg: any) => any;
}

export default function VpGroup(props: IVpGroupParam) {
  const { isLoadComplete = true, arrGroupList = [], onGroupListSearch } = props;

  const valueSearch = useRef<string>("");

  // 编辑框变化
  const handleSearchChange = (value) => {
    console.log("handleSearchChange", value);
    valueSearch.current = value;
  };

  // 确认搜索
  const handleSearchActionClick = async (e) => {
    console.log("handleSearchActionClick", e);
    Taro.showLoading();
    const params = {
      keyTitle: valueSearch.current,
    };
    onGroupListSearch && onGroupListSearch(params);
  };

  return (
    <View className="vp-group-wrap">
      <AtSearchBar
        value=""
        onChange={handleSearchChange}
        onActionClick={handleSearchActionClick}
      />
      <View className="flex-start-v vp-group-content">
        <ListNode
          isLoadCompleteList={isLoadComplete}
          strType={"GROUP"}
          arrList={arrGroupList}
          onDetailClick={() => {}}
        />
      </View>
    </View>
  );
}
