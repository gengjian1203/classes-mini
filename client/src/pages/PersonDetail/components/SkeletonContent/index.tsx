import React, { useState, useEffect } from "react";
import { View } from "@tarojs/components";
import Skeleton from "@/components/Skeleton";

import "./index.less";

interface ISkeletonContentParam {}

export default function SkeletonContent(props: ISkeletonContentParam) {
  const {} = props;

  return (
    <View className="flex-start-v skeleton-content-wrap">
      {/* 头像 */}
      <Skeleton
        row={1}
        rowProps={{
          width: 240,
          height: 308,
        }}
        customClass="skeleton-content-item"
      />
      {/* 姓名 */}
      <Skeleton
        row={1}
        rowProps={{
          width: 120,
          height: 50,
        }}
        customClass="skeleton-content-item"
      />
      {/* 职位 */}
      <Skeleton
        row={1}
        rowProps={{
          width: 200,
          height: 40,
        }}
        customClass="skeleton-content-item"
      />
      {/* 详细 */}
      <Skeleton
        row={8}
        rowProps={{
          width: 660,
          height: 40,
        }}
        customClass="skeleton-content-item"
      />
    </View>
  );
}
