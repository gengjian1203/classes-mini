import React, { Fragment, useState, useEffect, useRef } from "react";
import { AtSearchBar } from "taro-ui";
import Taro from "@tarojs/taro";
import Api from "@/api";
import { View } from "@tarojs/components";
import ListClass from "../../components/ListClass";

import "./index.less";

interface IVpClassesParam {
  isLoadComplete?: boolean;
  arrClassList?: Array<any>;
  onClassListSearch?: (...arg: any) => any;
}

export default function VpClasses(props: IVpClassesParam) {
  const { isLoadComplete = true, arrClassList = [], onClassListSearch } = props;

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
    onClassListSearch && onClassListSearch(params);
  };
  return (
    <View className="vp-classes-wrap">
      <AtSearchBar
        value=""
        onChange={handleSearchChange}
        onActionClick={handleSearchActionClick}
      />
      <View className="flex-start-v vp-classes-content">
        <ListClass
          isLoadComplete={isLoadComplete}
          arrClassList={arrClassList}
        />
      </View>
    </View>
  );
}
