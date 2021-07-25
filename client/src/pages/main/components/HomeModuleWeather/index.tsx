import React, { useState, useEffect, Fragment } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import Skeleton from "@/components/skeleton";

import "./index.less";

interface IWeatherInfo {
  _id?: string; // "79550af260fd10462969709944ded384"
  date?: string; // "2021-07-25"
  direct?: string; // "西南风"
  temperature?: string; // "24/32℃"
  weather?: string; // "多云"
  wid?: any; // {day: "02", night: "01"}
}

interface IHomeModuleWeatherParam {
  isLoadComplete?: boolean;
  weatherInfoDay?: IWeatherInfo;
}

export default function HomeModuleWeather(props: IHomeModuleWeatherParam) {
  const { isLoadComplete, weatherInfoDay } = props;

  return (
    <Skeleton
      loading={!isLoadComplete}
      row={1}
      rowProps={{ width: "100%", height: 160 }}
      customClass="flex-start-h module-weather-wrap"
    >
      {weatherInfoDay && weatherInfoDay._id ? (
        <View className="module-weather-content">{weatherInfoDay.weather}</View>
      ) : (
        <View className="module-weather-empty">
          <Text className="module-weather-empty-text">暂无数据</Text>
        </View>
      )}
    </Skeleton>
  );
}
