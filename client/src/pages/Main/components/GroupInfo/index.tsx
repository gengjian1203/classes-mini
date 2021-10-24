import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";

import "./index.less";

interface IGroupInfoParam {
  isLoadComplete?: boolean;
}

export default function GroupInfo(props: IGroupInfoParam) {
  const { isLoadComplete = true } = props;

  return (
    <View className="flex-between-h group-info-wrap">
      <View>GroupInfo</View>
    </View>
  );
}
