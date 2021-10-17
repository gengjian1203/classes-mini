import React, { useState, useEffect } from "react";
import { View, Image } from "@tarojs/components";

import "./index.less";

interface IDetailInfoParam {
  data?: any;
}

export default function DetailInfo(props: IDetailInfoParam) {
  const { data } = props;

  return (
    <View className="flex-center-v detail-info-wrap">
      {/* 头像 */}
      {data.url && (
        <Image
          className="info-item info-avatar"
          src={data.url}
          mode="widthFix"
        />
      )}
      {/* 姓名 */}
      {data.name && <View className="info-item info-name">{data.name}</View>}
      {/* 职位 */}
      {data.job && <View className="info-item info-job">{data.job}</View>}
    </View>
  );
}
