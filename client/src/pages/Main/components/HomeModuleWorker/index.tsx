import React, { useState, useEffect, Fragment, useRef } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import ModuleCard from "@/components/ModuleCard";
import Skeleton from "@/components/Skeleton";
import Utils from "@/utils";

import "./index.less";

interface IHomeModuleWorkerParam {
  isLoadComplete?: boolean;
  arrWorkerList?: Array<any>;
}

export default function HomeModuleWeather(props: IHomeModuleWorkerParam) {
  const { isLoadComplete, arrWorkerList = [] } = props;

  useEffect(() => {
    return () => {};
  }, []);

  return (
    <Skeleton
      loading={!isLoadComplete}
      row={1}
      rowProps={{ width: "100%", height: 160 }}
    >
      <ModuleCard
        title="值班人员"
        customClass="module-worder-panel"
        isEnableFold
      >
        {arrWorkerList.map((item, index) => {
          return (
            <View key={`worker-${index}`} className="worker-item">
              {item.name}
            </View>
          );
        })}
      </ModuleCard>
    </Skeleton>
  );
}
