import React, { Fragment, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import Calendar from "taro-calendar-customizable";
import { View, Image } from "@tarojs/components";
import Api from "@/api";
import GlobalManager from "@/services/GlobalManager";
import Utils from "@/utils";

import { getMonthFromDayString } from "./utils";

import "./index.less";

interface IVpHomeParam {
  title?: string;
  isLoadComplete?: boolean;
}

const customStyleGenerator = (params) => {
  // console.log("customStyleGenerator", params);
  const isToday = params.fullDateStr === GlobalManager?.nowDate?.todayString;
  return {
    dateStyle: {
      backgroundColor: params.selected ? "var(--color-primary)" : "",
      height: "2.3rem",
    },
    lunarStyle: {
      textDecorationColor: isToday
        ? "var(--color-primary-dark)"
        : "transparent",
      textDecorationLine: isToday ? "underline" : "none",
    },
  };
};

export default function VpHome(props: IVpHomeParam) {
  const {
    title = "", // 标题
    isLoadComplete = true,
  } = props;

  const weatherInfo = useRef({});

  // 以月为单位请求天气数据
  const queryWeatherInfo = async (month = "none") => {
    if (weatherInfo.current[month]) {
      return;
    }
    const res = await Api.cloud.fetchAppInfo.queryWeatherInfo({
      month: month,
    });
    weatherInfo.current[month] = res || [];
    console.log("VpHome queryWeatherInfo", res);
  };

  // 渲染指定日期的天气数据
  const setWeatherInfo = async (dayString = "none") => {
    const month = getMonthFromDayString(dayString);
    const arrInfo = weatherInfo.current[month] || [];
    const info = arrInfo.find((item) => {
      return item.date === dayString;
    });
    console.log("setWeatherInfo", info);
  };

  const onLoad = async () => {
    GlobalManager.nowDate = Utils.getNowDate();
    await queryWeatherInfo(GlobalManager.nowDate.MM);
    setWeatherInfo(GlobalManager.nowDate.todayString);
  };

  useEffect(() => {
    onLoad();
  }, []);

  // 点击日历指定日期
  const handleCalendarDayClick = (value) => {
    console.log("handleCalendarDayClick", value);
    const dayString = value?.value;
    setWeatherInfo(dayString);
  };

  // 日历切换回调事件
  const handleCalendarCurrentViewChange = (value) => {
    console.log("handleCalendarCurrentViewChange", value);
    const month = getMonthFromDayString(value);
    queryWeatherInfo(month);
  };

  return (
    <View className="vp-home-wrap">
      <View className="flex-start-v vp-home-content">
        <View style="width: 100%; ">
          <Calendar
            mode="lunar"
            marks={[
              { value: "2021-08-11", color: "red", markSize: "9px" },
              { value: "2021-08-12", color: "pink", markSize: "9px" },
              { value: "2021-08-13", color: "gray", markSize: "9px" },
              { value: "2021-08-14", color: "yellow", markSize: "9px" },
              { value: "2021-08-15", color: "darkblue", markSize: "9px" },
              { value: "2021-08-16", color: "pink", markSize: "9px" },
              { value: "2021-09-17", color: "green", markSize: "9px" },
            ]}
            extraInfo={[
              { value: "2021-09-21", text: "生日", color: "red" },
              { value: "2021-09-22", text: "休假", color: "darkblue" },
              { value: "2021-09-23", text: "会议", color: "gray" },
            ]}
            customStyleGenerator={customStyleGenerator}
            onDayClick={handleCalendarDayClick}
            onCurrentViewChange={handleCalendarCurrentViewChange}
          />
        </View>
      </View>
    </View>
  );
}
