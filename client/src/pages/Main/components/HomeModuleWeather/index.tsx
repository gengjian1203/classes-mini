import React, { useState, useEffect, Fragment, useRef } from "react";
import Taro from "@tarojs/taro";
import { View, Image, Text } from "@tarojs/components";
import Skeleton from "@/components/Skeleton";
import Utils from "@/utils";

import "./index.less";

interface IWeatherInfo {
  _id?: string; // "b00064a760fea7382a8863502478482c";
  cloud?: string; // "16";云量，百分比数值
  fxDate?: string; // "2021-07-26"; 预报日期
  humidity?: string; // "77";相对湿度，百分比数值
  iconDay?: string; // "101";预报白天天气状况的图标代码，图标可通过天气状况和图标下载
  iconNight?: string; // "101";预报夜间天气状况的图标代码，图标可通过天气状况和图标下载
  moonPhase?: string; // "亏凸月";月相名称
  moonrise?: string; // "20:55";月升时间
  moonset?: string; // "07:30";月落时间
  precip?: string; // "0.0";预报当天总降水量，默认单位：毫米
  pressure?: string; // "979";大气压强，默认单位：百帕
  sunrise?: string; // "04:20";日出时间
  sunset?: string; // "19:10";日落时间
  tempMax?: string; // "32";预报当天最高温度
  tempMin?: string; // "24";预报当天最低温度
  textDay?: string; // "多云";预报白天天气状况文字描述，包括阴晴雨雪等天气状态的描述
  textNight?: string; // "多云";预报晚间天气状况文字描述，包括阴晴雨雪等天气状态的描述
  uvIndex?: string; // "7";紫外线强度指数
  vis?: string; // "25";能见度，默认单位：公里
  wind360Day?: string; // "215";预报白天风向360角度
  wind360Night?: string; // "225";预报夜间风向360角度
  windDirDay?: string; // "西南风";预报白天风向
  windDirNight?: string; // "西南风";预报夜间当天风向
  windScaleDay?: string; // "3-4";预报白天风力等级
  windScaleNight?: string; // "1-2";预报夜间风力等级
  windSpeedDay?: string; // "19";预报白天风速，公里/小时
  windSpeedNight?: string; // "3";预报夜间风速，公里/小时
}

interface IHomeModuleWeatherParam {
  isLoadComplete?: boolean;
  DN?: "Day" | "Night";
  strSelectDay?: string;
  weatherInfoDay?: IWeatherInfo;
}

export default function HomeModuleWeather(props: IHomeModuleWeatherParam) {
  const { isLoadComplete, weatherInfoDay, strSelectDay, DN = "Day" } = props;

  const timerBKMove = useRef<NodeJS.Timeout>(null);
  const [isBKMove, setBKMove] = useState(false);

  const strIcon = weatherInfoDay && weatherInfoDay[`icon${DN}`]; //
  const srcIcon = (strIcon && require(`./images/${strIcon}.png`)) || "";
  const strText = weatherInfoDay && weatherInfoDay[`text${DN}`]; //
  const strwindDir = weatherInfoDay && weatherInfoDay[`windDir${DN}`];

  useEffect(() => {
    timerBKMove.current = setInterval(() => {
      setBKMove(false);
      setTimeout(() => {
        setBKMove(true);
      }, 0);
    }, 10000);
    return () => {
      if (timerBKMove.current) {
        clearInterval(timerBKMove.current);
      }
    };
  }, []);

  return (
    <Skeleton
      loading={!isLoadComplete}
      isBorderRadius
      row={1}
      rowProps={{ width: "100%", height: 160 }}
    >
      <View className="flex-start-v module-weather-wrap">
        <View
          className={`module-weather-bk ` + `${isBKMove ? "bk-move " : ""}`}
        />
        <View className="flex-between-h module-weather-title">
          <View className="module-weather-content-location">长春</View>
          <View className="module-weather-content-location">
            {strSelectDay}
          </View>
        </View>
        {weatherInfoDay && weatherInfoDay?._id ? (
          <View className="module-weather-content">
            <View className="flex-between-h module-weather-content-down">
              <Image
                className="module-weather-icon"
                src={srcIcon}
                mode="widthFix"
              />
              <View className="flex-start-v module-weather-item">
                <Text className="module-weather-item-title">气温</Text>
                <Text className="module-weather-item-text">
                  {weatherInfoDay?.tempMax}℃/{weatherInfoDay?.tempMin}℃
                </Text>
              </View>
              <View className="flex-start-v module-weather-item">
                <Text className="module-weather-item-title">天气</Text>
                <Text className="module-weather-item-text">{strText}</Text>
              </View>
              <View className="flex-start-v module-weather-item">
                <Text className="module-weather-item-title">风向</Text>
                <Text className="module-weather-item-text">{strwindDir}</Text>
              </View>
              <View className="flex-start-v module-weather-item">
                <Text className="module-weather-item-title">降水量</Text>
                <Text className="module-weather-item-text">
                  {weatherInfoDay?.precip}mm
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="flex-center-v module-weather-empty">
            <Text className="module-weather-empty-text">暂无数据</Text>
          </View>
        )}
      </View>
    </Skeleton>
  );
}
