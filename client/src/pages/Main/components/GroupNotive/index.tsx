import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";

import "./index.less";

interface IGroupNotiveParam {
  isLoadComplete?: boolean;
  customClass?: string;
}

export default function GroupNotive(props: IGroupNotiveParam) {
  const { isLoadComplete = true, customClass = "" } = props;

  return (
    <View className={`flex-between-h group-notive-wrap ${customClass}`}>
      <View>GroupNotive</View>
    </View>
  );
}
