import React, { Fragment, useState, useEffect } from "react";
import Taro from "@tarojs/taro";
import { View, Text } from "@tarojs/components";
import ModuleCard from "@/components/ModuleCard";
import Skeleton from "@/components/Skeleton";

import HomeModuleWorkerPersion from "../HomeModuleWorkerPersion";

import "./index.less";

interface IHomeModuleWorkerParam {
  isLoadComplete?: boolean;
  strModuleTitle?: string;
  arrWorkerList?: Array<any>;
}

export default function HomeModuleWorker(props: IHomeModuleWorkerParam) {
  const { isLoadComplete, strModuleTitle = "", arrWorkerList = [] } = props;

  useEffect(() => {
    return () => {};
  }, []);

  // 点击当前员工
  const handleWorkerPersionClick = (item) => {
    console.log("handleWorkerPersionClick", item);
    Taro.makePhoneCall({
      phoneNumber: item.cellphone,
    });
  };

  // 点击被替换员工
  const handleWorkerOldPersionClick = (item) => {
    console.log("handleWorkerOldPersionClick", item);
    Taro.makePhoneCall({
      phoneNumber: item.cellphone,
    });
  };

  return (
    <Skeleton
      loading={!isLoadComplete}
      isBorderRadius
      row={1}
      rowProps={{ width: "100%", height: 160 }}
    >
      <ModuleCard
        title={strModuleTitle}
        customClass="module-worker-panel"
        isEnableFold
      >
        {arrWorkerList && arrWorkerList.length > 0 ? (
          <Fragment>
            {arrWorkerList &&
              arrWorkerList.map((item, index) => {
                const {
                  objWorkerInfo = {},
                  objWorkerOldInfo = {},
                  renderLocal = {},
                } = item || {};
                return (
                  <View
                    key={`worker-${index}`}
                    className="flex-center-h worker-item"
                  >
                    <HomeModuleWorkerPersion
                      isShowWorker
                      isDisablePersion={false}
                      strLogoBGImage={renderLocal?.strLogoBGImage}
                      workerPersionInfo={objWorkerInfo}
                      onPersionClick={() => {
                        handleWorkerPersionClick(objWorkerInfo);
                      }}
                    />

                    <View className="flex-center-h worker-item-persion-arrow">
                      {renderLocal?.isShowWorkerOld && (
                        <View className="iconfont iconleft_double worker-item-persion-arrow-icon" />
                      )}
                    </View>

                    <HomeModuleWorkerPersion
                      isShowWorker={renderLocal?.isShowWorkerOld}
                      isDisablePersion
                      strLogoBGImage={renderLocal?.strOldLogoBGImage}
                      workerPersionInfo={objWorkerOldInfo}
                      onPersionClick={() => {
                        handleWorkerOldPersionClick(objWorkerOldInfo);
                      }}
                    />
                  </View>
                );
              })}
          </Fragment>
        ) : (
          <View className="flex-center-v module-worker-empty">
            <Text className="module-worker-empty-text">暂无数据</Text>
          </View>
        )}
      </ModuleCard>
    </Skeleton>
  );
}
