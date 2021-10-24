import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";

import "./index.less";

interface IGroupNotiveParam {
  isLoadComplete?: boolean;
}

export default function GroupNotive(props: IGroupNotiveParam) {
  const { isLoadComplete = true } = props;

  return (
    <View className="flex-between-h group-notive-wrap">
      <View>GroupNotive</View>
    </View>
  );
}
