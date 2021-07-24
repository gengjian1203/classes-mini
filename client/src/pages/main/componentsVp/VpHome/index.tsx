import React, { Fragment, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { View, Image } from "@tarojs/components";

import "./index.less";

interface IVpHomeParam {
  title?: string;
  isLoadComplete?: boolean;
}

export default function VpHome(props: IVpHomeParam) {
  const {
    title = "", // 标题
    isLoadComplete = true,
  } = props;

  const [value, setValue] = useState<number>(0);

  useEffect(() => {
    setValue(Math.random());
  }, []);

  return (
    <View className="vp-home-wrap">
      <View className="flex-start-v vp-home-content">
        <View>首页</View>
      </View>
    </View>
  );
}
