import React, { useState, useEffect, Fragment } from "react";
import { View } from "@tarojs/components";
import ButtonIcon from "@/components/ButtonIcon";

import "./index.less";

interface IGroupInfoParam {
  isLoadComplete?: boolean;
  customClass?: string;
  dataAddress?: string;
  dataDescribe?: string;
  dataLogo?: string;
  dataTitle?: string;
  dataCellphone?: string;
}

export default function GroupInfo(props: IGroupInfoParam) {
  const {
    isLoadComplete = true,
    customClass = "",
    dataAddress = "",
    dataDescribe = "",
    dataLogo = "",
    dataTitle = "",
    dataCellphone = "",
  } = props;

  return (
    <View className={`flex-between-h group-info-wrap ${customClass}`}>
      <View className="flex-center-v group-info-left">
        <ButtonIcon value={dataLogo} width={120} height={120} radius={20} />
      </View>
      <View className="flex-between-v group-info-right">
        {dataTitle && (
          <View className="group-info-item group-info-title">
            <View className="group-info-title-text">{dataTitle}</View>
          </View>
        )}
        {dataDescribe && (
          <View className="flex-start-h group-info-item group-info-desc">
            <View className="iconfont iconbarrage group-info-icon" />
            <View className="text-justify group-info-desc-text">
              {dataDescribe}
            </View>
          </View>
        )}
        {dataAddress && (
          <View className="flex-start-h group-info-item group-info-address">
            <View className="iconfont iconcoordinates group-info-icon" />
            <View className="text-justify group-info-address-text">
              {dataAddress}
            </View>
          </View>
        )}
        {dataCellphone && (
          <View className="flex-start-h group-info-item group-info-cellphone">
            <View className="iconfont iconmobilephone group-info-icon" />
            <View className="group-info-cellphone-text">{dataCellphone}</View>
          </View>
        )}
      </View>
    </View>
  );
}
