import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";

import "./index.less";

interface IGroupTabParam {
  isLoadComplete?: boolean;
}

export default function GroupTab(props: IGroupTabParam) {
  const { isLoadComplete = true } = props;

  return (
    <View className="flex-between-h group-tab-wrap">
      <View>GroupTab</View>
    </View>
  );
}
